'use strict';

const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

diceEl.classList.add('hidden');
score0EL.textContent = 0;
score1EL.textContent = 0;

let currentScore = 0;
let playing = true;

function switchPlayers()
{
    current0El.textContent = current1El.textContent = currentScore = 0;
    player0El.classList.toggle('player--active'); // if exist -> remove else -> add
    player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click',function()
{
    if(playing)
    {
        const diceNum = Math.trunc(Math.random() * 6) + 1;
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${diceNum}.png`;
        if(diceNum !== 1)
        {
            currentScore += diceNum;
            if(player0El.classList.contains('player--active'))
                current0El.textContent = currentScore;
            else
                current1El.textContent = currentScore;
        }
        else
        {
            switchPlayers();
        }
    }
})

btnHold.addEventListener('click',function()
{
    if(playing)
    {
        score0EL.textContent = Number(score0EL.textContent) + Number(current0El.textContent);
        score1EL.textContent = Number(score1EL.textContent) + Number(current1El.textContent);
        diceEl.classList.add('hidden');
        if(score0EL.textContent >= 100)
        {
            player0El.classList.add('player--winner');
            player0El.classList.remove('player--active');
            playing = false;
        }
        else if (score1EL.textContent >= 100)
        {
            player1El.classList.add('player--winner');
            player1El.classList.remove('player--active');
            playing = false;
        }
        else
            switchPlayers();
    }
})

btnNew.addEventListener('click',function()
{
    current0El.textContent = current1El.textContent = score0EL.textContent = score1EL.textContent = currentScore = 0; 

    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    diceEl.classList.add('hidden');
    player0El.classList.add('player--active');
    playing = true;
})