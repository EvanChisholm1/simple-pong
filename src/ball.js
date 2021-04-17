import { randInt } from './utils.js';

export class Ball {
  color = 'white';
  size = 10;
  height = this.size;
  width = this.size;
  speed = 10;

  constructor(x, y, ctx, canvas, game, dir) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.canvas = canvas;
    this.wasJustOutside = false;
    this.game = game;

    console.log(dir);
    if (dir === 'left') this.xVelocity = -7;
    else this.xVelocity = 7;
    this.yVelocity = randInt(-7, 7);
    // this.xVelocity = 7;
    // this.yVelocity = 5;
  }

  getCenterX() {
    return this.x - this.size / 2;
  }

  getCenterY() {
    return this.y - this.size / 2;
  }

  update() {
    this.x = this.x + this.xVelocity;
    this.y = this.y + this.yVelocity;

    // if the ball hits the bottom
    if (this.y + this.size >= this.canvas.height) {
      // this.angle = -this.angle;
      this.yVelocity = -this.yVelocity;
      this.y = this.canvas.height - this.size;
      // console.log('hit bottom');
    }
    // if the ball hits the right side
    if (this.x + this.size >= this.canvas.width) {
      // console.log('out on right side');
      // this.angle = this.angle * 2;
      this.game.score('left');
      this.xVelocity = -this.xVelocity;
      this.x = this.canvas.width - this.size;
    }
    // if the ball hits the top
    if (this.y <= 0) {
      // console.log('hit top');
      // this.angle = -this.angle;
      this.yVelocity = -this.yVelocity;
      this.y = 1;
    }
    // if the ball hits the left side
    if (this.x <= 0) {
      // console.log('hit left side');
      // this.angle = -(this.angle * 2);
      this.game.score('right');
      this.xVelocity = -this.xVelocity;
      this.x = 1;
    }
  }

  draw() {
    this.ctx.strokeStyle = 'white';
    this.ctx.fillStyle = 'white';
    // this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.beginPath();
    this.ctx.arc(
      // this.getCenterX(),
      this.x,
      // this.getCenterY(),
      this.y,
      this.size / 2,
      0,
      2 * Math.PI
    );
    this.ctx.closePath();
    this.ctx.fill();
  }
}
