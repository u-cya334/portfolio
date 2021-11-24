$windowW = $(window).width();
$windowH = $(window).height();
let PCMode = true;

const resize = ()=>{
    $windowW = $(window).width();
    if(950>$windowW){
        PCMode=false;
    }else{
        PCMode = true;
    }

    if(PCMode===true){
        // PC設定
        $(".wideBox").css('flex-wrap','nowrap');
        $(".wideBox").css("text-align","left");
        $("body").css("font-size","20px");

    }else if(PCMode===false){
        // スマホ設定
        $(".wideBox").css("flex-wrap","wrap");
        $("body").css("font-size","15px");
        $(".wideBox").css("text-align","center");
    }
}




window.onload = resize();
window.addEventListener('resize',resize);