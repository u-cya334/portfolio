const $portfolio = document.getElementById('portfolio');
const $glass = document.getElementsByClassName('glass');



const adjust = function(){
    $windowW = $(window).width();
    glassW = $glass[0].style.width;
    $glass[0].style.width = $windowW*0.7+"px";
    glassW = $glass[0].style.width.slice(0,-2);
    $portfolio.style.fontSize = glassW*0.2+"px";
}


window.onload = adjust();
window.addEventListener("resize",adjust);
