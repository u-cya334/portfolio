const $portfolio = document.getElementById('portfolio');
const $glass = document.getElementsByClassName('glass');

const adjust = function(){
    $windowW = $(window).width();
    $windowH = $(window).height();
    glassW = $glass[0].style.width;
    $glass[0].style.width = $windowW*0.7+"px";
    glassW = $glass[0].style.width.slice(0,-2);
    $portfolio.style.fontSize = glassW*0.16+"px";
    $(".bg").height($windowH);
}


window.onload = adjust();
window.addEventListener("resize",adjust);