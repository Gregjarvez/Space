/* eslint-disable consistent-return */
import Paddle from './modules/paddle';
import Ball from './modules/ball';
import specs from './modules/specs';
import Brick from './modules/brick';
import { repaint, canvas } from './modules/canvas';
import Grid from './modules/grid';
import Event from './modules/events';
import Life from './modules/life';
import Text from './modules/text';
import Ticker from './modules/ticker';
import Composer from './composer';
import * as structures from './modules/structure';

class Pong {
  constructor() {
    this.life = new Life();
    this.event = new Event();
    this.grid = new Grid(10, 8);
    this.ball = new Ball(specs.ballSpecs);
    this.paddle = new Paddle(specs.paddleSpecs);
    this.clickToStart = new Text(specs.welcome);
    this.clickToRestart = new Text(Object.assign({}, specs.welcome, { text: 'Click To Restart' }));
    this.ticker = new Ticker();
    this.composer = new Composer();
    this.started = false;
    this.structures = structures;
    this.setup();
  }

  start() {
    if (!this.started) {
      this.event
        .accept(canvas)
        .on('click', () => {
          if (!this.started) {
            this.clickToStart.remove();

            this.ticker.tick();
            this.started = true;
          }
        });
    }
  }

  setup() {
    repaint();

    this.grid
      .fill(Brick, specs.brick, true)
      .plugin(this.ball)
      .structure(this.structures.level1)
      .construct();

    this.composer.group(
      'resets',
      this.ball.reset,
      this.grid.reset,
      this.paddle.reset,
      this.life.resetLife,
    );

    this.composer.group(
      'draw',
      this.paddle.draw,
      this.ball.draw,
      this.grid.draw,
    );

    this.composer.group(
      'collision',
      this.grid.checkIntersection,
      this.paddle.checkCollision,
    );

    this.clickToStart.show();
    this.ball.plugin(this.life);
    this.paddle.plugin(this.ball);

    this.ticker.register(this.update);
    this.paddle.onMouseMove();
  }

  update = () => {
    repaint();
    this.composer.runAll('draw');
    this.composer.runAll('collision');
    this.ball.move();

    this.clickToStart.show();
    this.life.show();

    this.reset();
  }

  restart() {
    this.ticker.stop();
    this.event.clear();
    this.started = false;
    this.start();
  }


  isGameover() {
    const numberOfBricksLeft = this.grid.gridItemDone -
                               (this.grid.gridItems.length - this.grid.skip);
    return this.life.lifes.length === 0 || numberOfBricksLeft === 0;
  }

  reset() {
    if (this.isGameover()) {
      this.clickToRestart.show();
      this.composer.runAll('resets');
      this.restart();

      this.grid.gridItemDone = 0;
    }
  }
}
const pong = new Pong();
pong.start();

window.pong = pong;

