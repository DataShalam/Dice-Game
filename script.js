'use strict';

// Selecting elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, gamePlaying;

const init = function () {
  // Starting conditions
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
  diceEl.classList.add('hidden');

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gamePlaying = true;
};
init();

const switchPlayer = function () {
  document.getElementById('current--' + activePlayer).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (gamePlaying) {
    // Generate Random dice
    const randomDice = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = 'dices/dice-' + randomDice + '.png';

    // Check if rolled 1 (if true switch to next player)
    if (randomDice !== 1) {
      // Add dice to Score
      currentScore += randomDice;
      document.getElementById('current--' + activePlayer).textContent =
        currentScore;
    } else {
      // Switch Player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (gamePlaying) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById('score--' + activePlayer).textContent =
      scores[activePlayer];
    // Check if player's score >= 100
    if (scores[activePlayer] >= 100) {
      // Finish game if it is
      gamePlaying = false;
      diceEl.classList.add('hidden');

      document
        .querySelector('.player--' + activePlayer)
        .classList.remove('player--active');
      document
        .querySelector('.player--' + activePlayer)
        .classList.add('player--winner');
    }

    // switch to the next player
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
