var hh = document.getElementById('hh');
var mm = document.getElementById('mm');
var ss = document.getElementById('ss');
var offset = new Date().getTimezoneOffset();
var directionsService, directionsDisplay;
var mapInitialized = false;
var faces = ['show-front', 'show-left', 'show-back', 'show-right', 'show-top', 'show-bottom'];
var faceIndex = 0;
var faceChangeInterval;

function toggleNav() {
    if ($('#nav-overlay').hasClass('open')) {
        $('#nav-overlay').removeClass('open');
        $('#nav-overlay').css('height', '0');
    }
    else {
        $('#nav-overlay').addClass('open');
        $('#nav-overlay').css('height', '100%');
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

function initialize() {
    mapInitialized = true;
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer
    var mapProp = {
        center: new google.maps.LatLng(12.9716, 77.5946)
        , zoom: 10
        , mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("mapCanvas"), mapProp);
    directionsDisplay.setMap(map);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, originValue) {
    directionsService.route({
        origin: originValue
        , destination: 'Bengaluru'
        , travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {
            console.log('Yo');
            directionsDisplay.setDirections(response);
        }
        else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function calculateDistance(origin) {
    var service = new google.maps.DistanceMatrixService;
    service.getDistanceMatrix({
        origins: [origin]
        , destinations: ['Bengaluru']
        , travelMode: 'DRIVING'
        , unitSystem: google.maps.UnitSystem.METRIC
        , avoidHighways: false
        , avoidTolls: false
    }, function (response, status) {
        if (status !== 'OK') {
            alert('Error was: ' + status);
        }
        else {
            var destinationList = response.destinationAddresses;
            if (destinationList.length > 0) {
                var results = response.rows[0].elements;
                document.getElementById('distance').innerHTML = results[0].distance.text;
            }
        }
    });
}

function openInfoDialog(dialog) {
    if (dialog == 'map' && !mapInitialized) initialize();
    $('div.dimmer').fadeIn(350);
    $('#' + dialog).fadeIn(350);
}

function changeFace() {
    $('#cube').removeClass();
    faceIndex = (faceIndex + 1) % 6;
    $('#cube').addClass(faces[faceIndex]);
}
$(document).ready(function () {
    $('html, body').fadeIn(500);
    //    var shape = document.getElementById('shape');
    //    var stage = document.getElementById('stage');
    //    stage.style.webkitTransform = 'translateZ(-200px)';
    setTimeout(function () {
        changeFace();
        faceChangeInterval = setInterval(changeFace, 7000);
    }, 1000);
});
$('div#currency .more').on('click', function () {
    window.open('https://www.google.co.in/?ion=1#q=inr+conversion', '_blank');
});
updateTime();
setInterval(updateTime, 500);
$('div#theArt').css("margin-top", ($(window).height() - 270) / 2);
//$('section.climate').height($('#climate-info').height());
document.getElementById('origin').onkeypress = function (e) {
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13') {
        var origin = this.value;
        if (this.value) {
            calculateDistance(origin);
            calculateAndDisplayRoute(directionsService, directionsDisplay, origin);
        }
        return false;
    }
}
$('span.close').on('click', function () {
    $(this).parent().fadeOut(350);
    $('div.dimmer').fadeOut(200);
});