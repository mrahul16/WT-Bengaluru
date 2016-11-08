var form = document.getElementById("form");
var formexit = document.getElementById("formexit");

form.onclick = function () {
    var op = document.getElementsByClassName("nonform");
    for (var i = 0; i < op.length; i++) {
        op[i].style.opacity = 0.1;
    }
    form.style.transform = "scale(1.25)"
    formexit.style.opacity = "1";
    formexit.style.display = "inline-block";
};

formexit.onclick = function () {
    var op = document.getElementsByClassName("nonform");
    for (var i = 0; i < op.length; i++) {
        op[i].style.opacity = 1;
    }
    form.style.transform = "scale(1)";
    formexit.style.opacity = "0";
    formexit.style.display = "none";
};

function showToast(code) {
    var toast = document.getElementById('formSubmitMessage');
    if (code == 1) {
        toast.innerHTML = "Added to database.";
        toast.style.backgroundColor = "green";
    }
    else {
        toast.innerHTML = "There were some errors.";
        toast.style.backgroundColor = "red";
    }
    toast.style.opacity = "1";
    setTimeout(function () {
        toast.style.opacity = "0";
    }, 3500);
}