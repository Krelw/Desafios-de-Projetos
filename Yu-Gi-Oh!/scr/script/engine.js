const state = {
    score:{
        Playerscore: 0 ,
        computerScore: 0 ,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites:{
        avatar: document.getElementById("card-image"),
        type: document.getElementById("card-type"),
        name: document.getElementById("card-name"),
    },
    fieldCards:{
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },
    actions:{
    button : document.getElementById("next-duel"),
},
};

const playersSides = {
    player1: "player-cards",
    computer: "computer-cards",
}

const pathImages ="./scr/assets/icons/";
const cardData=[{

    id: 0,
    name: "Dragão Branco de Olhos Azuis",
    type: "Papel",
    img:`${pathImages}dragon.png`,
    Winof:[1],
    Loseof:[2],
},
{

    id: 1,
    name: "Mago Negro",
    type: "Pedra",
    img:`${pathImages}magician.png`,
    Winof:[2],
    Loseof:[0],
},
{

    id: 2,
    name: "Exodia",
    type: "Tesoura",
    img:`${pathImages}exodia.png`,
    Winof:[0],
    Loseof:[1],
},
]

async function getRandomCardId(){
const randomIndex = Math.floor( Math.random()* cardData.length);
return cardData[randomIndex].id;
};

async function CreatCardimage(IdCard, fieldSide){
const cardImage = document.createElement("img");
cardImage.setAttribute("height", "100px");
cardImage.setAttribute("src", "./scr/assets/icons/card-back.png");
cardImage.setAttribute("data-id", IdCard);
cardImage.classList.add("card");


if(fieldSide === playersSides.player1 ){
cardImage.addEventListener("click", () => {
    setCardsfield(cardImage.getAttribute("data-id"));
});
cardImage.addEventListener("mouseover", ()=> {
    drawselectorcard(IdCard);
});
}


return cardImage;
}

async function setCardsfield(cardId){
await removeallcardsimages();

const computercardId = await getRandomCardId();
state.fieldCards.player.style.display = "block";
state.fieldCards.computer.style.display = "block";

state.cardSprites.avatar.src ="";
state.cardSprites.name.innerText ="";
state.cardSprites.type.innerText ="";

state.fieldCards.player.src = cardData[cardId].img;
state.fieldCards.computer.src = cardData[computercardId].img;

 let Duelresults = await checkduelresults(cardId, computercardId);

await updatescore();
await drawnbutton(Duelresults);
};

async function drawnbutton(text){
state.actions.button.innerText = text;
state.actions.button.style.display = "block";
}

async function updatescore() {
    state.score.scoreBox.innerText =`Win: ${state.score.Playerscore} | Lose: ${state.score.computerScore}`;
};


async function checkduelresults(playercardId, ComputercardId){
    let Duelresults = "Empate"
    let PlayerCard = cardData[playercardId];
    if (PlayerCard.Winof.includes(ComputercardId)){
Duelresults = "Ganhou";
state.score.Playerscore++;
await playAudio("ganhou");
    };
    if(PlayerCard.Loseof.includes(ComputercardId)){
  Duelresults = "Perdeu";
   state.score.computerScore++;
   await playAudio("perdeu");
    };
    return Duelresults
};

async function removeallcardsimages(){
let cards = document.querySelector(".card-box.framed#computer-cards");
let imgElements = cards.querySelectorAll("img");
imgElements.forEach((img)=> img.remove());

cards = document.querySelector(".card-box.framed#player-cards");
 imgElements = cards.querySelectorAll("img");
imgElements.forEach((img)=> img.remove());

}


async function drawselectorcard(index){
state.cardSprites.avatar.src = cardData[index].img;
state.cardSprites.name.innerText = cardData[index].name;
state.cardSprites.type.innerText = "Atributo: " + cardData[index].type;
}

async function drawCard(cardsNumber, fieldSide){
for( let i = 0; i<cardsNumber; i++){
    const randomIdCard = await getRandomCardId();
    const cardImage = await CreatCardimage(randomIdCard, fieldSide);
document.getElementById(fieldSide).appendChild(cardImage);

}
};

async function resetDuel(){
    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";
    state.fieldCards.player.style.display ="none";
    state.fieldCards.computer.style.display ="none";
    init();
}


async function playAudio(status){
const audio = new Audio(`./scr/assets/audios/${status}.wav`);
audio.play();
}


function init(){
state.fieldCards.player.style.display = "none";
state.fieldCards.computer.style.display = "none";
drawCard(5,playersSides.player1),
drawCard(5,playersSides.computer)

const bgm = document.getElementById("bgm");
bgm.play();
}

init();

