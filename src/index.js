import Paddle from './modules/paddle';
import Ball from './modules/ball';
import specs from './modules/specs';
import Brick from './modules/brick';
import { canvas, ctx, repaint } from './modules/canvas';
import Event from './modules/events';
import Grid from './modules/grid';

class Pong {
  constructor() {
    this.event = new Event();
    this.paddle = new Paddle(specs.paddleSpecs);
    this.ball = new Ball(specs.ballSpecs);
    this.grid = new Grid(10, 8);
    this.fps = 60;
    this.lifes = 3;

    this.init();
  }

  init() {
    this.grid
      .fill(Brick, specs.brick, true)
      .accept(this.ball)
      .construct();

    this.paddle.accept(this.ball);

    this.update();
    this.onMouseMove();
  }

  update() {
    setInterval(() => {
      this.draw();

      this.ball.move();
      this.grid.checkIntersection();

      this.paddle.checkCollision();

      this.reset();
    }, 1000 / this.fps);
  }

  draw() {
    repaint();
    this.paddle.draw();
    this.ball.draw();
    this.grid.drawGrid();

    this.drawLife();
    this.__debugger__();
  }

  drawLife() {
    ctx.fillStyle = 'blue';
    ctx.font = '20px sans-serif';
    ctx.fillText(this.lifes.toString(), 10, 25);
  }

  onMouseMove() {
    this.event
      .accept(canvas)
      .on('mousemove', this.paddle.move);
  }

  __debugger__() {
    ctx.fillStyle = 'blue';
    const { width, height } = specs.brick;
    const col = Math.floor(this.paddle.eventX / width);
    const row = Math.floor(this.paddle.eventY / height);
    const index = col + (
      this.grid.dimension.y * row
    );
    ctx.font = '17px sans-serif';
    ctx.fillText(`${col}, ${row}, ${index}`, this.paddle.eventX, this.paddle.eventY);
  }

  reset() {
    const numberLeft = this.grid.gridItems.length - this.grid.skip;
    if (this.grid.gridItemDone === numberLeft) {
      this.ball.reset();
      this.grid.resetGrid();
      this.paddle.reset();
      this.grid.gridItemDone = 0;
    }
  }
}
const pong = new Pong();
window.pong = pong;

