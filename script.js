'use strict';

//VARIABLES
let currentScore, totalScore, activePlayer, playing;

//DOMELEMENTS
const playersDOM = document.querySelectorAll('.player');
const diceDOM = document.querySelector('.dice');

//BUTTONS
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const init = function(){
    diceDOM.classList.add('hidden');
    playing = true;
    activePlayer = 0;
    currentScore = 0;
    totalScore = [0,0];
    
    
    for(let i = 0; i < playersDOM.length; i++){
            
        playersDOM[i].querySelector('.score').textContent = '0';
        playersDOM[i].querySelector('.current-score').textContent = '0';
        totalScore[i] = 0;
        playersDOM[0].classList.add('player--active');
        playersDOM[1].classList.remove('player--active');
        playersDOM[i].classList.remove('player--winner');
        
    }

}

init();

const switchPlayer = function(){
    currentScore = 0;
    playersDOM[activePlayer].querySelector('.current-score').textContent = currentScore;
    playersDOM[activePlayer].classList.toggle('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0; 
    playersDOM[activePlayer].classList.toggle('player--active');

}

//////////////////////////////////////BUTTON FUNCTIONS////////////////////////////////////////////////////

btnRoll.addEventListener('click', function(){

    if(playing){
    //Generate random diceroll
    let diceRandom = Number(Math.floor(Math.random()*6) + 1);

    //Display dice
    diceDOM.classList.remove('hidden');
    diceDOM.src = 'dice-' + diceRandom + '.png';

    //Check for rolled 1
    
        if(diceRandom !== 1){
            currentScore += diceRandom;
            playersDOM[activePlayer].querySelector('.current-score').textContent = currentScore;
            
        } else {
            switchPlayer();
        }
    }

})

btnHold.addEventListener('click', function(){

    if(playing){
    totalScore[activePlayer] = totalScore[activePlayer] + currentScore; 
    playersDOM[activePlayer].querySelector('.score').textContent = totalScore[activePlayer];
    
   
    if(totalScore[activePlayer] >= 100){
        playing = false;
        playersDOM[activePlayer].classList.add('player--winner');
        playersDOM[activePlayer].classList.remove('player--active');
        diceDOM.classList.add('hidden');
        currentScore = 0;
    }
    else {
        switchPlayer();
    }}
})


btnNew.addEventListener('click', init);




