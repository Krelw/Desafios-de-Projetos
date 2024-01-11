const Pianokeys = document.querySelectorAll(".pianokeys .key");
const Volume = document.querySelector(".volume input");
const keyscheck = document.querySelector(".keys input");


let mapedkeys =[];
let audio = new Audio("scr/tunes/a.wav");

const playTune = (key) =>{
    audio.src = `scr/tunes/${key}.wav`;
    audio.play();

    const clickedkey = document.querySelector(`[data-key="${key}"]`)
    clickedkey.classList.add("active");
    setTimeout(()=>{
    clickedkey.classList.remove("active");
    },150);

};

Pianokeys.forEach((key)=>{
key.addEventListener("click",() => playTune(key.dataset.key));
 mapedkeys.push(key.dataset.key);
});

document.addEventListener("keydown", (e)=>{
    if(mapedkeys.includes(e.key)){
     playTune(e.key);
    }
   
});

const handlevolume =(e) =>{
audio.volume  = e.target.value;
};
const showhidekeys = ()=>{
Pianokeys.forEach(key => key.classList.toggle("hide"));

};

Volume.addEventListener("input" , handlevolume);

keyscheck.addEventListener("click", showhidekeys);
