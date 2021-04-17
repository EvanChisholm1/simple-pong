export class Paddle {
  height = 100;
  width = 10;
  isGoingUp = false;
  isGoingDown = false;

  constructor(ctx, canvas, side) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.y = canvas.height / 2 - this.height / 2;
    this.side = side;
    if (side === 'right') {
      this.x = canvas.width - 10 - this.width;
    } else {
      this.x = 10;
    }
  }

  update() {
    const isAtBottom = this.y + this.height >= this.canvas.height;
    const isAtTop = this.y <= 0;
    if (this.isGoingDown && !isAtBottom) {
      this.y += 10;
    } else if (this.isGoingUp && !isAtTop) {
      this.y -= 10;
    }
  }

  draw() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  attachListeners() {
    if (this.side === 'right') {
      this.canvas.addEventListener('mousemove', e => {
        const rect = e.currentTarget.getBoundingClientRect();
        const newY = e.clientY - rect.y;
        this.y = newY - this.height / 2;

        // console.log(e.currentTarget.getBoundingClientRect());
      });
    }
    window.addEventListener('keydown', e => {
      e.preventDefault();
      if (this.side === 'right') {
        if (e.key === 'ArrowDown') this.isGoingDown = true;
        if (e.key === 'ArrowUp') this.isGoingUp = true;
      } else {
        if (e.key === 'w') this.isGoingUp = true;
        if (e.key === 's') this.isGoingDown = true;
      }
    });
    window.addEventListener('keyup', e => {
      if (this.side === 'right') {
        if (e.key === 'ArrowDown') this.isGoingDown = false;
        if (e.key === 'ArrowUp') this.isGoingUp = false;
      } else {
        if (e.key === 'w') this.isGoingUp = false;
        if (e.key === 's') this.isGoingDown = false;
      }
    });
  }
}
