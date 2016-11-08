var life = document.getElementsByClassName('life')[0];
var colors1 = ["#E91E63", "#9C27B0", "#3F51B5", "#2196F3", "#009688", "#FF9800", "#795548", "#FF5722", "#1B5E20", "#B71C1C"];
var colors2 = ["#1976D2", "#2196F3", "#42A5F5", "#1E88E5"];
var nums = ["one", "two", "three", "four"];

function createPieces() {
    for (var i = 1; i <= 31; i++) {
        var piece = document.createElement('div');
        piece.className = 'piece';
        piece.style.backgroundColor = colors1[(i - 1) % 10];
        life.appendChild(piece);
    }
}

function addShine(i, len, start) {
    var k = i + len;
    start -= .5;
    for (var j = i; j < k; j++) {
        $('div.piece:nth-child(' + j + ')').css('animation', nums[(j - 1) % 4] + ' 2.7s ' + start + 's infinite');
    }
}

function initShine() {
    addShine(1, 5, 13);
    addShine(6, 4, 13.2);
    addShine(10, 3, 13.4);
    addShine(13, 4, 13.6);
    addShine(17, 3, 13.8);
    addShine(20, 2, 14);
    addShine(22, 3, 14.2);
    addShine(25, 4, 14.4);
    addShine(29, 3, 14.6);
}
createPieces();
console.log(screen.width);
console.log(screen.height);
var i = 0;
setTimeout(function () {
    $('div.piece').addClass('swap');
}, 2900);
setTimeout(function () {
    $('div.piece').removeClass('swap');
}, 6400);
setTimeout(function () {
    $('div#dimmer').css("background", "rgba(0, 0, 0, .9)");
}, 10500);
setTimeout(function () {
    $('div.piece').each(function () {
        $(this).css({
            "transition-delay": (i * 0.05) + "s"
            , "transition-duration": "2s"
            , "transition-timing-function": "cubic-bezier(.7, .3, 0, 1)"
            , "background-color": colors2[i % 4]
        });
        i += 1;
    });
    $('div.piece').addClass('words');
}, 11000);
setTimeout(function () {
    $('div#welcome').css("opacity", "1");
}, 11500);
setTimeout(function () {
    $('div#explore').stop().fadeIn(500);
}, 12500);
//initShine();
//$('div.piece:first-child').css('-webkit-animation', 'one 3s 13s infinite');
$('div#explore').on('click', function () {
    $('body').stop().fadeOut(350);
    setTimeout(function () {
        window.location.href = "home.html";
    }, 350);
});