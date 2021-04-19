import { Game } from './game.js';

const startButton = document.querySelector('#start-button');
const stopButton = document.querySelector('#stop-button');

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const game = new Game(ctx, canvas);
game.draw();

startButton.addEventListener('click', () => {
  if (!game.isRunning) {
    game.startGame();
  }
});

stopButton.addEventListener('click', () => {
  if (game.isRunning) {
    game.stopGame();
  }
});
