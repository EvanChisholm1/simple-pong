import { Game } from './game.js';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const game = new Game(ctx, canvas);
game.startGame();
console.log(game);
