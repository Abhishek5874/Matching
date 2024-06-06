const cardsArray = ['🍎', '🍊', '🍌', '🍉', '🍇', '🍓', '🍒', '🥝'];
let cards = [...cardsArray, ...cardsArray];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let timer = 0;
let timerInterval;

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';
  shuffle(cards);
  cards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
  startTimer();
  document.getElementById('message').innerText = '';
  moves = 0;
  document.getElementById('moves').innerText = moves;
}

function startTimer() {
  clearInterval(timerInterval);
  timer = 0;
  document.getElementById('timer').innerText = timer;
  timerInterval = setInterval(() => {
    timer++;
    document.getElementById('timer').innerText = timer;
  }, 1000);
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flipped');
  this.innerHTML = this.dataset.emoji;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;
  moves++;
  document.getElementById('moves').innerText = moves;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.classList.add('matched');
  secondCard.classList.add('matched');
  if (document.querySelectorAll('.card:not(.matched)').length === 0) {
    document.getElementById('message').innerText = 'Congratulations! You won!';
    clearInterval(timerInterval);
  }
  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    firstCard.innerHTML = '';
    secondCard.innerHTML = '';
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function resetGame() {
  createBoard();
  clearInterval(timerInterval);
  document.getElementById('timer').innerText = 0;
  document.getElementById('moves').innerText = 0;
  moves = 0;
  timer = 0;
}

createBoard();
