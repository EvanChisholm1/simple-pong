import { Ball } from './ball.js';
import { Paddle } from './paddle.js';
import { rectIntersect } from './utils.js';

export class Game {
  intervalId = null;
  leftScore = 0;
  rightScore = 0;
  dir = 'right';
  isRunning = false;

  constructor(ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.ball = new Ball(
      canvas.width / 2,
      canvas.height / 2,
      ctx,
      canvas,
      this
    );
    this.leftPaddle = new Paddle(ctx, canvas, 'left');
    this.rightPaddle = new Paddle(ctx, canvas, 'right');
  }

  score(side) {
    if (side === 'left') this.leftScore++;
    if (side === 'right') this.rightScore++;
    if (this.dir === 'left') this.dir = 'right';
    else this.dir = 'left';
    this.ball = new Ball(
      this.canvas.width / 2,
      this.canvas.height / 2,
      this.ctx,
      this.canvas,
      this,
      this.dir
    );
  }

  renderScore() {
    this.ctx.fillStyle = 'white';
    this.ctx.font = '48px roboto';
    const text = this.ctx.measureText(`${this.leftScore} : ${this.rightScore}`);
    const xOffSet = this.canvas.width / 2 - text.width / 2;
    // console.log(text);
    this.ctx.fillText(`${this.leftScore} : ${this.rightScore}`, xOffSet, 48);
  }

  gameLoop() {
    // this.leftPaddle.update();
    this.rightPaddle.update();
    this.leftPaddle.update();
    this.ball.update();

    this.checkPaddleIntersects(this.rightPaddle);
    this.checkPaddleIntersects(this.leftPaddle);

    // if (rectIntersect(this.rightPaddle, this.ball)) {
    //   const relativeYIntersect =
    //     this.rightPaddle.y + this.rightPaddle.height / 2 - this.ball.y;
    //   const normalizedRelativeYIntersect =
    //     relativeYIntersect / (this.rightPaddle.height / 2);

    //   const newYVelocity = -(normalizedRelativeYIntersect * 10);
    //   this.ball.yVelocity = newYVelocity;
    //   this.ball.xVelocity = -this.ball.xVelocity * 1.04;
    //   this.ball.x = this.rightPaddle.x - this.ball.width;
    // }
    this.draw();
  }

  checkPaddleIntersects(paddle) {
    if (rectIntersect(paddle, this.ball)) {
      console.log(paddle);
      const relativeYIntersect = paddle.y + paddle.height / 2 - this.ball.y;
      const normalizedRelativeYIntersect =
        relativeYIntersect / (paddle.height / 2);

      const newYVelocity = -(normalizedRelativeYIntersect * 10);
      this.ball.yVelocity = newYVelocity;
      this.ball.xVelocity = -this.ball.xVelocity * 1.04;
      if (paddle.side === 'right') {
        this.ball.x = paddle.x - this.ball.width;
      } else {
        this.ball.x = paddle.x + paddle.width;
      }
    }
  }

  startGame() {
    this.isRunning = true;

    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.rightPaddle.attachListeners();
    this.leftPaddle.attachListeners();
    document.addEventListener('click', () => {
      this.ball.angle = this.ball.angle / 2;
    });

    this.intervalId = setInterval(() => {
      this.gameLoop();
    }, 1000 / 60);
  }

  stopGame() {
    clearInterval(this.intervalId);
    this.isRunning = false;
  }

  draw() {
    this.ctx.fillStyle = 'black';
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.renderScore();
    this.leftPaddle.draw();
    this.rightPaddle.draw();
    this.ball.draw();
  }
}
