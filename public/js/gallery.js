var hh = document.getElementById('hh');
var mm = document.getElementById('mm');
var ss = document.getElementById('ss');
var offset = new Date().getTimezoneOffset();
var navOverlay = $('#nav-overlay');
var main = $('main');
var photo = $('.photo-link');
var photoJS;
var wt = screen.width;
var photoWidth = (wt - 0.05 * wt) / 5;
var photoHTML;
var baseURL = 'img/gallery/';
var prevPage = 0;
var curPage = 1;
var listItem;
var num;

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

function setPhoto(data) {
    main.html("");
    var lastChild;
    var len = data.length;
    for (var i = 0; i < len; i++) {
        main.append(photoHTML);
        lastChild = $('.photo-link:last-child');
        lastChild.attr('id', i + 1);
        lastChild.prop('href', baseURL + data[i]['Photo']);
        lastChild.attr('title', data[i]['Title']);
        lastChild.find('.photo').attr('src', baseURL + data[i]['Photo']);
    }
}

function setPage(len, pageNum) {
    if(num[pageNum - 1].classList.contains("active")) {
        return;
    }
    var curStart = (curPage - 1) * 15 + 1;
    var curEnd = curPage * 15 > len ? len : curPage * 15;
    var nextStart = (pageNum - 1) * 15 + 1;
    var nextEnd = pageNum * 15 > len ? len : pageNum * 15;
    for(var i = curStart - 1; i < curEnd; i++) {
        photoJS[i].style.display = "none";
    }
    for(var i = nextStart - 1; i < nextEnd; i++) {
        photoJS[i].style.display = "inline-block";
    }
    num[curPage - 1].classList.remove("active");
    num[pageNum - 1].classList.add("active");
    curPage = pageNum;
}

function setPrevNext(numPhotos) {
    var mod = Math.ceil(numPhotos / 15);
    var list = document.getElementById('page-num-list');
    var next = document.getElementById('next');
    for (var i = 1; i <= mod; i++) {
        var li = document.createElement('li');
        li.className = "list-item num";
        li.id = i;
        li.textContent = i.toString();
        list.insertBefore(li, next);
    }
}

function initializeScreen(data) {
    photo = $('.photo-link');
    var wth = screen.width;
    $(photo).css('height', (wth - 0.05 * wth) / 5);
    $('.photo').css('height', (wth - 0.05 * wth) / 5 - 4);
    $("a.photo-link").colorbox({rel:'group1',
        'maxWidth' : '90%',
        'maxHeight' : '90%',
        'slideshow' : false,
        'current' : "{current} of {total}"});

    // Mouse move tilt effect
    $($(photo)).on('mouseover', function () {
        var px = 0.025 * wt + ($(this).attr('id') - 1) % 5 * photoWidth;
        var py = $(this).offset().top - $(window).scrollTop();
        $(this).on('mousemove', function (event) {
            var xPos = ((event.clientX - px) / photoWidth) - 0.5;
            var yPos = ((event.clientY - py) / photoWidth) - 0.5;
            TweenLite.to(this, 0.35, {
                rotationY: 10 * xPos,
                rotationX: 10 * yPos,
                ease: Power1.easeOut,
                transformPerspective: 900,
                transformOrigin: "center"
            });
        });
    });

    $(photo).on('mouseout', function () {
        TweenLite.to($(this), 0.35, {
            rotationY: 0,
            rotationX: 0,
            ease: Power1.easeOut,
            transformPerspective: 900,
            transformOrigin: "center"
        });
    });

    photoJS = document.getElementsByClassName('photo-link');

    setPrevNext(data.length);

    num = document.getElementsByClassName('num');
    setPage(data.length, 1);

    listItem = $('.list-item');
    var maxPage = Math.ceil(data.length / 15);
    listItem.on('click', function () {
        var id = $(this).attr('id');
        console.log(id);
       if(id) {
            if(id == "prev" && curPage != 1) {
                setPage(data.length, curPage - 1);
            }
            else if(id == "next" && curPage != maxPage) {
                setPage(data.length, curPage + 1);
            }
       }
       else {
           setPage(data.length, Number(id));
       }
    });

}

$(document).ready(function () {
    $('html, body').fadeIn(500);
    updateTime();
    setInterval(updateTime, 500);

    $.ajax({
        url: "php/gallery.php"
        , method: "GET"
        , dataType: "json"
    }).done(function (data) {
        console.log(data.length);
        photoHTML = main.html();
        setPhoto(data);
        initializeScreen(data);
    });
});