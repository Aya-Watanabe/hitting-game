
window.onload =build;
const container = document.querySelector('.container');
const scoreHTML = document.querySelector('.score');
const finalScore = document.querySelector('.finalScore');
const btn = document.querySelector('.btn');
const counter = document.querySelector('.counter');
const overlay = document.querySelector('.overlay');

let targetNum = 4;
let demons;
let score = 0;
let canHit = true;
let timer = 30;
let randomTimer;
let randomDemon;
let t;

function selectDifficulty(e){
    container.innerHTML ="";   
    v = event.currentTarget.value;
    targetNum = v;
    build();
}
    
function build(){
    for(let i =0; i<targetNum; i++){
        container.innerHTML += 
        "<div class='target'>" +
        "<img src='images/demon.png' alt='demon image' class='demon'>" +
        "<div class='block'>" +
        "</div>" + "</div>"

        demons = document.querySelectorAll('.demon');
        // console.log(demons.length);
        for(let j =0; j < demons.length; j++){
            demons[j].addEventListener('click', hitDemon,false);
        }
    }
}

function startGame(){
    document.getElementById("bksound").play();
    minusTimer();
    demonPopup();
    
    btn.disabled = true;
    btn.style.opacity =  '.5';
}

function demonPopup(){
    canHit = true;
    
    randomDemon = demons[Math.floor(Math.random()*demons.length)];

    randomDemon.classList.add('show');
    randomDemon.classList.remove('onfire');

    let randomInterval = (Math.floor(Math.random()*10)*100) + 400;
    randomTimer = setTimeout(hideDemonAuto,randomInterval);
}

function hideDemonAuto(){
    randomDemon.classList.remove('show');
    demonPopup();
}

function hitDemon(){
    event.target.classList.remove('show');
    
    if(canHit){
    canHit = false;   
    score+=10;
    scoreHTML.innerHTML = score;
    finalScore.innerHTML = score;
   
    event.target.classList.add('onfire');
    
    document.getElementById("hitsound").play();
    document.getElementById("hitsound").currentTime = 0;
    
    }
    // demonPopup();
}   

function stopDemons() {
    clearInterval(randomTimer);
    clearInterval(t);
    document.getElementById("bksound").pause();
    
}
 
function gameEnd(){
        overlay.classList.add('showOverlay'); //Finish game
        
        clearInterval(t);
        stopDemons();

        document.getElementById("bksound").pause();
        document.getElementById("finishsound").play();
}

function minusTimer(){
    timer--;
    counter.innerHTML = timer;
    t= setTimeout(minusTimer, 1000);

    if(timer == 0){
        gameEnd();
    };
}

function reset(){
    document.location.reload();
    overlay.classList.remove('showOverlay');
}

