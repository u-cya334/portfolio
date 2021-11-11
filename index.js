const $title = document.getElementById("title");
const $titleTxt = document.getElementById('titleTxt');
$width = $(window).width();
console.log($width);   

const resize = ()=>{
    $titleTxt.style.fontSize = "120px"
    $title.style.height = 1220/1920*$title.clientWidth+"px";
}

window.onload = resize();
$title.onload = resize();
window.addEventListener('resize',resize);