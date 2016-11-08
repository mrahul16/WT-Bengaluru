var hh = document.getElementById('hh');
var mm = document.getElementById('mm');
var ss = document.getElementById('ss');
var offset = new Date().getTimezoneOffset();
var categories = $('#categories');
var navOverlay = $('#nav-overlay');
var type = $('.type');
var currentlySelected = $('#current-news-text');
var currentNewsIcon = document.getElementById('current-news-icon');
var newsList = $('#news-list');
var loading = $('#loading');
var currentNewsCategory;
var newsListItem;
var selectedNews;
var news;
var listContent;
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

function toggleCategory() {
    if (categories.hasClass('open')) {
        categories.removeClass('open');
        categories.slideUp(150);
    }
    else {
        categories.addClass('open');
        categories.slideDown(150);
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

function setNewsList(category) {
    currentNewsCategory = category;
    newsList.html("");
    news = response[category];
    var lastChild;
    var len = news.length;
    for (var i = 0; i < len; i++) {
        newsList.append(listContent);
        lastChild = $('.news-list-item:last-child');
        lastChild.attr('id', i);
        lastChild.find('.news-list-title').text(news[i]['Title']);
        var content = news[i]['Content'];
        lastChild.find('.news-list-text').html(content.substring(0, content.indexOf('.') + 1));
        if (currentNewsCategory == "recent") {
            lastChild.find('.news-thumbnail').css('background-image', 'url(img/news/' + news[i]['Category'] + '/' + news[i]['Image'] + ')');
        }
        else {
            lastChild.find('.news-thumbnail').css('background-image', 'url(img/news/' + currentNewsCategory + '/' + news[i]['Image'] + ')');
        }
    }
}

function setNewsInfo(clickedItem) {
    var id = $(clickedItem).attr('id');
    $('#info-title').text(news[Number(id)]['Title']);
    var date = new Date(news[id]['Timestamp'] * 1000);
    $('#timestamp').text(date.toLocaleString());
    document.getElementById('info-text').innerHTML = news[id]['Content'];
//    $('#info-text').html(news[id]['Content']);
    if (currentNewsCategory == "recent") {
        $('#info-image').css('background-image', 'url(img/news/' + news[id]['Category'] + '/' + news[id]['Image'] + ')');
    }
    else {
        $('#info-image').css('background-image', 'url(img/news/' + currentNewsCategory + '/' + news[id]['Image'] + ')');
    }
}

function setNewsListItem() {
    selectedNews = $('.news-list-item:first-child');
    selectedNews.addClass('selected');
    newsListItem = $('.news-list-item');
    setNewsInfo(selectedNews);
    newsListItem.on('click', function () {
        setNewsInfo(this);
        onNewsListItemClicked(this);
    });
}

function onNewsListItemClicked(newsListItem) {
    $(selectedNews).removeClass('selected');
    $(newsListItem).addClass('selected');
    selectedNews = newsListItem;
}
$(document).ready(function () {
    $('html, body').fadeIn(500);
    updateTime();
    setInterval(updateTime, 500);
    type.on('click', function () {
        var text = $(this).text().trim();
        console.log(text.toLowerCase());
        currentlySelected.text(text);
        currentNewsIcon.src =  'img/icons/' + text.toLowerCase() + '.svg';
        toggleCategory();
        setNewsList(text.toLowerCase());
        setNewsListItem();
    });
    $.ajax({
        url: "php/news.php"
        , method: "GET"
        , dataType: "json"
    }).done(function (data) {
        response = data;
        loading.css('display', 'none');
        listContent = newsList.html();
        setNewsList("recent");
        setNewsListItem();
    });
});