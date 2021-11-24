peopleNumber = $("#peopleNumber").text();
const $counter = document.getElementById('counter');
let search = "";
let no = ""
let $unit = $("#unit").val();
let $default = $("#default").val();

// スマホだった場合のカウンターの横幅調整
let windowSm = 640;
let $width = $(window).width();
const resize = ()=>{
    $width = $(window).width();
    if(windowSm>$width){
        $(".counterBox").width("45%")
    }
    else{
        $(".counterBox").width("30%")
    }
}

window.onload = resize();
window.addEventListener('resize',resize);

// 個数マイナスボタンが押されたとき
$("#peopleMinus").click(()=>{
    if(peopleNumber>0){
    peopleNumber--;
    $("#peopleNumber").text(peopleNumber);
    removeBox();
    }
})

// 個数プラスボタンが押されたとき
$("#peoplePlus").click(()=>{
    if(peopleNumber<12){
    peopleNumber++;
    $("#peopleNumber").text(peopleNumber);
    addBox();
    }
})

// カウンターを追加
const addBox = ()=>{
    $default = $("#default").val();
    addCode = '<div class="counterBox"><input type="text" value="'+peopleNumber+'個目" class="countName"><div class="numberBox"><a class="button inboxMinus no'+peopleNumber+' inboxButton aButton">-</a><input type="number" class="countNumber no'+peopleNumber+'" value="'+$default+'"><a class="button inboxPlus no'+peopleNumber+' inboxButton aButton">+</a></div></div>'
    $counter.insertAdjacentHTML('beforeend',addCode);
    resize();
}

// カウンターを削除
const removeBox = ()=>{
    $counter.lastElementChild.remove();
    console.log($counter)
}

// マイナスボタンをクリックした時の動作
$(document).on('click','.inboxMinus', function(){
    $unit = $("#unit").val();
    i=1;
    while(i<=peopleNumber){
        if($(this).attr("class").includes("no"+i)){
            search = ".no"+i;
            break;
        }
        i++;
    }
    countNumber = $(".countNumber"+search).val();
    $(".countNumber"+search).val(parseInt(countNumber)-parseInt($unit));    
})

// プラスボタンを押したときの動作
$(document).on('click','.inboxPlus', function(){
    $unit = $("#unit").val();
    i=1;
    while(i<=peopleNumber){
        if($(this).attr("class").includes("no"+i)){
            search = ".no"+i;
            break;
        }
        i++;
    }
    countNumber = $(".countNumber"+search).val();
    $(".countNumber"+search).val(parseInt(countNumber)+parseInt($unit));    
})

// リセットボタン
$("#reset").click(()=>{
    i=1;
    while(i<=peopleNumber){
        no = ".no"+i;
        console.log(no)
        de = $("#default").val()
        console.log(de)
        console.log($(".countNumber"+no).val(de))
        i++;
    }
})