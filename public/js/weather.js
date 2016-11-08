var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var hh = document.getElementById('hh');
var mm = document.getElementById('mm');
var ss = document.getElementById('ss');
var offset = new Date().getTimezoneOffset();
var navOverlay = $('#nav-overlay');
var main = $('main');
var todayIcon = document.getElementById('today-icon');
var temperature = document.getElementById('temperature');
var todaySummary = document.getElementById('today-summary');
var extRowItemVal = document.getElementsByClassName('extra-row-item-value');
var date = document.getElementsByClassName('date');
var dayIcon = document.getElementsByClassName('day-icon');
var minValue = document.getElementsByClassName('min-value');
var maxValue = document.getElementsByClassName('max-value');
var daySummary = document.getElementsByClassName('day-summary');
var response;

function toggleNav() {
    if (navOverlay.hasClass('open')) {
        navOverlay.removeClass('open');
        navOverlay.css('height', '0');
    }
    else {
        navOverlay.addClass('open');
        navOverlay.css('height', '100%');
    }
}

function updateTime() {
    var d = new Date();
    var utc = d.getTime() + (offset * 60000);
    var localtime = new Date(utc + (3600000 * 5.5)).toTimeString().split(' ')[0];
    var time = localtime.split(':');
    hh.innerHTML = time[0];
    mm.innerHTML = time[1];
    ss.innerHTML = time[2];
}

function setChart() {
    var tempSeries = [], appTempSeries = [], timeLabels = [];
    var daily = response['hourly']['data'];
    for(var i = 0; i <= daily.length; i+=3) {
        tempSeries.push(Math.round(daily[i]['temperature']));
        appTempSeries.push(Math.round(daily[i]['apparentTemperature']));
        var time = (new Date(daily[i]['time'] * 1000)).getHours();
        var timeStr = time.toString();
        if(time > 11) {
            timeStr = (time-11).toString() + " pm";
        }
        else {
            timeStr += " am";
        }
        timeLabels.push(timeStr);
    }
    console.log(tempSeries);
    console.log(appTempSeries);
    console.log(timeLabels);
    var chart = new Chartist.Line('.ct-chart', {
        labels: timeLabels,
        series: [tempSeries]
    }, {
        low: Math.min(tempSeries) - 1,
        width: 960,
        height: 320,
        axisX: {
            showGrid: false
        },
        axisY: {
            // and also don't show the label
            showLabel: false
        },
        showArea: true,
        plugins: [
            Chartist.plugins.ctPointLabels({
                textAnchor: 'middle'
            })]
    });

// Let's put a sequence number aside so we can use it in the event callbacks
    var seq = 0,
        delays = 35,
        durations = 250;

// Once the chart is fully created we reset the sequence
    chart.on('created', function() {
        seq = 0;
    });

// On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
    chart.on('draw', function(data) {
        seq++;

        if(data.type === 'line') {
            // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
            data.element.animate({
                opacity: {
                    // The delay when we like to start the animation
                    begin: seq * delays + 1000,
                    // Duration of the animation
                    dur: durations,
                    // The value where the animation should start
                    from: 0,
                    // The value where it should end
                    to: 1
                }
            });
        } else if(data.type === 'label' && data.axis === 'x') {
            data.element.animate({
                y: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.y + 100,
                    to: data.y,
                    // We can specify an easing function from Chartist.Svg.Easing
                    easing: 'easeOutQuart'
                }
            });
        } else if(data.type === 'label' && data.axis === 'y') {
            data.element.animate({
                x: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 100,
                    to: data.x,
                    easing: 'easeOutQuart'
                }
            });
        } else if(data.type === 'point') {
            data.element.animate({
                x1: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 10,
                    to: data.x,
                    easing: 'easeOutQuart'
                },
                x2: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 10,
                    to: data.x,
                    easing: 'easeOutQuart'
                },
                opacity: {
                    begin: seq * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: 'easeOutQuart'
                }
            });
        } else if(data.type === 'grid') {
            // Using data.axis we get x or y which we can use to construct our animation definition objects
            var pos1Animation = {
                begin: seq * delays,
                dur: durations,
                from: data[data.axis.units.pos + '1'] - 30,
                to: data[data.axis.units.pos + '1'],
                easing: 'easeOutQuart'
            };

            var pos2Animation = {
                begin: seq * delays,
                dur: durations,
                from: data[data.axis.units.pos + '2'] - 100,
                to: data[data.axis.units.pos + '2'],
                easing: 'easeOutQuart'
            };

            var animations = {};
            animations[data.axis.units.pos + '1'] = pos1Animation;
            animations[data.axis.units.pos + '2'] = pos2Animation;
            animations['opacity'] = {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'easeOutQuart'
            };

            data.element.animate(animations);
        }
    });

//     chart.on('created', function() {
//         if(window.__exampleAnimateTimeout) {
//             clearTimeout(window.__exampleAnimateTimeout);
//             window.__exampleAnimateTimeout = null;
//         }
//         window.__exampleAnimateTimeout = setTimeout(chart.update.bind(chart), 12000);
//     });
}


function setFields() {
    var icToday = new Skycons({"color": "yellow"});
    icToday.set('today-icon', response['currently']['icon']);
    temperature.textContent = Math.round(response['currently']['temperature']);
    todaySummary.textContent = response['currently']['summary'];
    extRowItemVal[0].textContent = Math.round(response['currently']['apparentTemperature']);
    extRowItemVal[1].textContent = Math.round(response['currently']['windSpeed']);
    extRowItemVal[2].textContent = Math.round(response['currently']['visibility']);
    extRowItemVal[3].textContent = Math.round(response['currently']['pressure']);
    extRowItemVal[4].textContent = Math.round(response['currently']['humidity'] * 100);
    extRowItemVal[5].textContent = Math.round(response['currently']['dewPoint']);
    var daily = response['daily']['data'];
    var dayIcons = new Skycons({"color": "pink"});
    for (var i = 0; i < 8; i++) {
        var d = new Date(daily[i]['time'] * 1000);
        date[i].textContent = days[d.getDay()] + " " + d.getDate();
        minValue[i].textContent = Math.round(daily[i]['temperatureMin']);
        maxValue[i].textContent = Math.round(daily[i]['temperatureMax']);
        daySummary[i].textContent = daily[i]['summary'];
        dayIcons.set("day" + (i+1), daily[i]['icon']);
    }
    dayIcons.play();
}

$(document).ready(function () {
    $('html, body').fadeIn(500);
    updateTime();
    setInterval(updateTime, 500);


    // var icons = new Skycons({"color": "white"});
    // icons.set("today-icon", "clear-day");
    // for (var i = 1; i <= 8; i++)
    //     icons.set("day" + i, "rain");
    // icons.play();

    $.ajax({
        url: "https://api.darksky.net/forecast/b8524128ae4aa63cec3cc720b9c73f7a/12.9716,77.5946?units=si"
        // url: "https://gist.githubusercontent.com/RahulMaru1318/5e04eaef10f1d458a62408fb4065f48f/raw/2c1042ab10a6fbf7e1e384492ae2fb92985510a2/data.json"
        // url: "data.json"
        , method: "GET"
        , dataType: "jsonp"
    }).done(function (data) {
        console.log(data);
        response = data;
        setFields();
        setChart();
    });
});