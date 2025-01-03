let gameS=[];
let userS=[];

let btns=["red","green","blue","yellow"];

let start=false;
let level=0;

let h2=document.querySelector("h2");

localStorage.setItem("hs" , 0);

document.addEventListener("keypress",function(){
    if(start==false){
        console.log("Game Started....")
        document.querySelector("body").style.backgroundColor="rgb(16,16,16)";
        start=true;

        levelup();
    }
});

function bflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function uflash(btn){
    btn.classList.add("uflash");
    setTimeout(function(){
        btn.classList.remove("uflash");
    },75);
}

function levelup(){
    userS=[];
    level++;
    h2.innerText=`Level ${level}`;

    let ri=Math.floor(Math.random()*4);
    let rb=btns[ri];
    gameS.push(rb);
    let butn=document.querySelector(`.${rb}`);
    console.log(gameS);
    bflash(butn);
}

let allbtn=document.querySelectorAll(".bt");

function checkc(idx){
    console.log(userS)
    if(userS[idx]===gameS[idx]){
        if(userS.length==gameS.length){
            setTimeout(levelup,1000);
        }
    }else{
        let x=level-1;
        if(x<0){
            x=0;
        }
        h2.innerHTML=`Game Over Your Score is: ${x} Press Any Key To Restart The Game.`;
        let max=level;
        let h3=document.querySelector("h3");
        let hs=Math.max(max,x)-1;
        if(Math.max(max,x)-1<0){
            hs=0;
        }
        if(localStorage.getItem("hs") < hs) {
            localStorage.setItem("hs" , hs);
        }
        hs = localStorage.getItem("hs")
        h3.innerHTML=`High Score: ${hs}`;
        h3.style.color="goldenrod";
        document.querySelector("body").style.backgroundColor="dark gray";
        start=false;
        gameS=[];
        userS=[];
        level=0;
    }
}

function bpress(){ 
    uflash(this);

    let userC=this.getAttribute("id");
    userS.push(userC);
    checkc(userS.length-1);
}

for(let bts of allbtn){
    bts.addEventListener("click",bpress);
}