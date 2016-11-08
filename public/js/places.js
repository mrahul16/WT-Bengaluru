var offset = new Date().getTimezoneOffset();
var figure = $('#background');
var article = $('article');
var title = $('#title');
var places = ["LAL BAGH", "ISKCON", "ORION MALL", "SKYYE LOUNGE", "BANGALORE PALACE", "VIDYARTHI BHAVAN", "CHINNASWAMY STADIUM", "WONDER LA", "BANNERGHATTA NATIONAL PARK", "FREEDOM PARK"];
var placeFigs = [];
var placesPics = ['ringone', 'ringtwo', 'ringthree', 'ringfour', 'ringfive', 'ringsix', 'ringseven', 'ringeight', 'ringnine', 'ringten'];
var activeIndex = 0;

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

function setPlaceAsActive(i) {
    if (i == 10) {
        i = 0;
    }
    else if (i == -1) {
        i = 9;
    }
    placeFigs[activeIndex].removeClass('active');
    placeFigs[i].addClass('active');
    title.text(places[i]);
    article.text(description[i]);
    figure.css('background-image', 'url(img/carousel/' + placesPics[i] + '.jpg)');
    //    previousIndex = activeIndex;
    activeIndex = i;
}

function loadImages() {
    $('figure.fig').each(function (i) {
        $(this).css('background-image', 'url(img/carousel/' + placesPics[i] + '.jpg)');
        placeFigs.push($(this));
    });
}
$(function () {
    updateTime();
    setInterval(updateTime, 500);
    loadImages();
    setPlaceAsActive(0);
    $(document).keydown(function (e) {
        if (e.which == 37) {
            setPlaceAsActive(activeIndex - 1);
        }
        if (e.which == 39) {
            setPlaceAsActive(activeIndex + 1);
        }
    });
});