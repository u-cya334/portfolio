let Pos = 0;
let scrollTop = 0;
let windowH = $(window).height();

function fadeAnime(){
    $('.fadeUpTrigger').each(function(){ 
        Pos = $(this).offset().top+200;
        scrollTop = $(window).scrollTop();
        windowH = $(window).height();
        if(scrollTop >= Pos - windowH){
            $(this).addClass('fadeUp');
        }
    });
}
  

$(window).scroll(function (){
    fadeAnime();
});