const $restart = document.getElementById('restart');
const $send = document.getElementById('send');
const $input = document.getElementById('input');
// const $message = document.getElementsByClassName('message')[0];
const $answer = document.getElementsByClassName('answer')[0];
const $content = document.getElementById('content');
const $surrender = document.getElementById('surrender');
console.log($answer);
let inputWord = ""; // 入力された文字
let inputLastWord = ""; // 入力された言葉の最後の文字
let answer = ""; // CPUの回答
let answerLastWord=""; //
let answerList = []; // CPUの回答一覧
let nameList = []; // 名前の一覧（つかった？）
let usedList = []; // すでに使われたポケモン一覧
let userAnswerList = []; // プレイヤーの回答可能一覧
let userAnsewerLastWord = ""; // プレイヤーの回答可能な最後の文字
let answerSum = 0; // 答えた回数
let lose = false; //敗北判定
let modeSm = true; //スマートフォンかどうか
const $answerClass = document.getElementsByClassName('answer');
const replaceWord = ["♂","♀","2","２","Z"];
const windowWidth = $(window).width();
const windowSm = 640;


// PCとスマホで処理を分ける
if (windowWidth <= windowSm) {
    console.log('スマホ');

}else{
    console.log('PC');
    console.log($answerClass);
    modeSm = false;
}

// はじめからボタンをおした時にリロードする
$restart.addEventListener("click",function(){
    location.reload();
})

//エンターが押されたら送信
window.addEventListener("keydown",function(){
    if(this.event.key==="Enter"){
        console.log('enter');
        send();
    }
})

//降参ボタンを押したら敗北へ
$surrender.addEventListener('click',function(){
    if (lose===false) {
        newMessage("playerAnswerNo","降参")
        gameOver('キミの負け');
        lose = true;
    }
})

const send = function(){
    console.log('input:'+$input.value);
    inputWord = $input.value;
    if(inputWord===""){
        newMessage("answer","文字を入力してね");
    }else{
        inputLastWord = inputWord.slice(-1);
        $input.value=''; // 送信したら入力フォームの中身を消す
        no= noSearch(inputWord);
        console.log(no)
        if(no===undefined){
            console.log('mitukaranai');
            newMessage("playerAnswerNo",inputWord)
        }else{
            src = "./img/i_0"+no+".png"
            newMessage("playerAnswer",inputWord,"imgR",src);
        }
            search(inputWord);
    }

}

//入力
$send.addEventListener('click',function(){
    send();
});

//答え作成
const answerMaking = function(word,last){
    answerSum++;

    console.log("last="+last)
    if(last==="ン"){
        console.log("last="+last)
        gameOver('ンが付いた！キミの負け')
    }else{
        //八回目の回答以降背景の大きさを自動調整に
        if(answerSum===4){
            console.log('4回とっぱ')
            $content.style.height = "100%"
        }
        i=0;
        answerList　= [];//答え一覧初期化
        while(i< allList.length-1){
            searchName = allList[i].name;
            if(last==="ー"){
                last = word.slice(0,-1).slice(-1)
            }
            //小文字→大文字
            last = last.replace('ァ',"ア").replace("ィ","イ").replace("ゥ","ウ").replace("ェ","エ").replace("ォ","オ").replace("ャ","ヤ").replace("ュ","ユ").replace("ョ","ヨ");
            if(searchName.slice(0,1)===last&&searchName.slice(-1)!="ン"){
                //”ン”以外で始まり、最初の文字と最後の文字があっていたら答えの候補に入れる
                answerList.push(searchName);
            }
            i++;
        }
        console.log('before'+answerList);
        console.log('used:'+usedList);
        //答えの候補からすでに使われた物を除外する
        answerList = answerList.filter(function(v){
            return ! usedList.includes(v);
        })
        console.log("after:"+answerList);
        if(answerList.length===0){
            //回答候補が無ければプレイヤーの勝ち
            gameOver('キミの勝ち！！');
        }
        random = Math.floor(Math.random()*answerList.length); //回答候補からランダムに選択
        answer = answerList[random];
        usedList.push(answer);
        console.log(answer);
        answerLastWord = answer.slice(-1);
        console.log("answerLastWord"+answerLastWord);
        no= noSearch(answer);
        src = "./img/i_0"+no+".png"; // 画像のパスを取得
        newMessage("answer",answer,"img",src);
        makingPlayerAnswer(answer,answerLastWord);        
    }

}

//プレイヤーの回答可能択の検索
const makingPlayerAnswer = function(word,last){
    
    i=0;
    userAnswerList　= [];//答え一覧初期化
    while(i< allList.length-1){
        searchName = allList[i].name;
        if(last==="ー"){
            //最後の文字が長音なら最後から２文字目を選択
            last = word.slice(0,-1).slice(-1)
        }
        //小文字→大文字
        last = last.replace('ァ',"ア").replace("ィ","イ").replace("ゥ","ウ").replace("ェ","エ").replace("ォ","オ").replace("ャ","ヤ").replace("ュ","ユ").replace("ョ","ヨ");
        if(searchName.slice(0,1)===last&&searchName.slice(-1)!="ン"){
            userAnswerList.push(searchName);
        }
        i++;
    }
    i=0;
    console.log('userbefore'+userAnswerList);
    console.log('used:'+usedList)

    userAnswerList = userAnswerList.filter(function(v){
        return ! usedList.includes(v)
    })
    console.log('userafter:'+userAnswerList);
    if(userAnswerList.length===0){
        gameOver('キミの負け…')
    }
}

const noExist = function(txt){
    newMessage('answer',txt);
}

//存在するかどうか
const search=function(word){
    if(answerLastWord==="ー"){
        answerLastWord = answer.slice(0,-1).slice(-1)
    }
    //小文字→大文字
    answerLastWord = answerLastWord.replace('ァ',"ア").replace("ィ","イ").replace("ゥ","ウ").replace("ェ","エ").replace("ォ","オ").replace("ャ","ヤ").replace("ュ","ユ").replace("ョ","ヨ");

    if(inputWord.slice(0,1)===answerLastWord){
        console.log('good'+answerLastWord);
        i=0
        exist = false;
        if(replaceWord.includes(word.slice(-1))){
            last = word.slice(-1);
            last = last.replace("♂","オス").replace("♀","メス").replace("2","ツー").replace("２","ツー").replace("Z","ゼット");
            inputWord = word.slice(0, -1)+last
            word = inputWord;
        }
        console.log(inputWord);
        while(i<allList.length-1){
            if(usedList.includes(word)){
                //すでに使われていたら戻す
                noExist(word+"はもう使われている");
                exist = true;
                break
            }
            searchName = allList[i].name;
            if(word===searchName){
                usedList.push(searchName);
                exist = true;
                if(inputWord==="ン"){
                    console.log("ンが付いた")
                    gameOver("キミの負け")
                    break
                }else{
                    answerMaking(word,inputLastWord);
                    break
                }
            }
            i++;
        }
        if(exist===false){
            noExist("そんなポケモンは<br>存在しない");
        }
    }else{
        noExist('最後の文字と同じ文字ではじめてね')
    }
    }

const start = function(){
    i=0
    while(i<1){
        random = Math.floor(Math.random()*allList.length);
        console.log(random)
        answer = allList[random-1].name;
        if(answer.slice(-1)==='ン'){
            console.log('やり直し');
        }else{
            answerLastWord = answer.slice(-1);
            if(answerLastWord==="ー"){
                answerLastWord = answer.slice(0,-1).slice(-1)
            }
            //小文字→大文字
            answerLastWord = answerLastWord.replace('ァ',"ア").replace("ィ","イ").replace("ゥ","ウ").replace("ェ","エ").replace("ォ","オ").replace("ャ","ヤ").replace("ュ","ユ").replace("ョ","ヨ");
            i++;
        }
    }
    usedList.push(answer);
    no = noSearch(answer);
    console.log('no'+no);
    src = "./img/i_0"+no+".png"
    newMessage("answer",answer,"img",src);
}

//チャットを追加する
const newMessage = function(clas,txt,imgclass,src){
    if(imgclass==="img"){
        code='<div class="box"><div class="'+clas+'">'+txt+'</div><img class="'+imgclass+'" src="'+src+'" alt=""></div>';
    }else if(imgclass==="imgR"){
        code = '<div class="boxA"><img class="'+imgclass+'" src="'+src+'" alt=""><div class="'+clas+'">'+txt+'</div></div>'
    }else{
        code = '<div class="box"><div class="'+clas+'">'+txt+'</div></div>';
    }
    $content.insertAdjacentHTML('afterbegin',code);
    if(modeSm===false){
        $answerClass[0].style.fontSize = "40px";
        $(".playerAnswerNo").css("font-size","40px");
        $(".playerAnswer").css("font-size","40px");
        $("img").css("width","60px");
        $("img").css("height","60px");
        $("imgR").css("width","60px");
        $("imgR").css("height","60px");
    }
    
    
}

const noSearch = function(name){
    i=0;
    while(i<allList.length-1){
        if(name===allList[i].name){
            return allList[i].no
        }
        i++;
    }
}

const gameOver = function(txt){
    newMessage('answer',txt);
    newMessage('answer',"答えれた回数"+answerSum)
    $surrender.textContent = "ホームへ";
    $surrender.addEventListener("click",function(){
        window.location.href = "../index.html";
    })
}

start();


