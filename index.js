const $title = document.getElementById("title");
const $headerTxt = document.getElementsByClassName('headerTxt');
$width = $(window).width();
console.log($width);   

const resize = ()=>{
    // $title.style.height = 1220/1920*$title.clientWidth+"px";
}

window.onload = resize();
// $title.onload = resize();
window.addEventListener('resize',resize);