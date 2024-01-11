const state = {
    view:{
     squares: document.querySelectorAll(".square"),
    inimigo: document.querySelector(".inimigo"),
    time: document.querySelector("#tempo"),
    score: document.querySelector("#Score")
    },

    value:{
    
     gamevelocity: 900,
     hitposition: 0,
     result: 0,
     curretTime: 60,
    
},
    action: {
        timerid:null,
     Countdowntimerid: setInterval(Countdown,900), 
    }
};

function Countdown(){
state.value.curretTime--;
state.view.time.textContent = state.value.curretTime;
if (state.value.curretTime <=0){
    clearInterval(state.action.Countdowntimerid);
    clearInterval(state.action.timerid);
    alert("Seu resultado foi de " + state.value.result);
}
}

function playsound(audioname){
    let audio = new Audio(`./src/audios/${audioname}.wav`);
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("inimigo");
    });
   let randomNumber = Math.floor(Math.random()*9);
    let randomsquare = state.view.squares[randomNumber];
    randomsquare.classList.add("inimigo");
    state.value.hitposition = randomsquare.id;
}

function moveenemy(){
    state.value.timerid = setInterval(randomSquare, state.value.gamevelocity)
}
function addlisternhitbox(){
    state.view.squares.forEach((square)=>{
       square.addEventListener("mousedown",()=>{
        if(square.id === state.value.hitposition){
           state.value.result++;
           state.view.score.textContent = state.value.result;
           state.value.hitposition = null;
           playsound("hit")
        }
       })
});
}
function init(){
 moveenemy();
 addlisternhitbox();
}

init();

