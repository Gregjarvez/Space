/* eslint-disable consistent-return */
import Paddle from './modules/paddle';
import Ball from './modules/ball';
import specs from './modules/specs';
import Brick from './modules/brick';
import BrickType1 from './modules/brick_u1';
import { repaint, canvas } from './modules/canvas';
import Grid from './modules/grid';
import Event from './modules/events';
import Life from './modules/life';
import Text from './modules/text';
import Ticker from './modules/ticker';
import Composer from './composer';
import levels from './modules/levels';

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
    this.currentLevel = 0;

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
      .fill({
        type0: {
          brick: Brick,
          specs: specs.brick,
        },
        type1: {
          brick: BrickType1,
          specs: Object.assign({}, specs.brick, { color: 'purple' }),
        },
      }, true)
      .plugin('ball', this.ball)
      .plugin('levelStructure', levels[this.currentLevel])
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

    this.__debuggger__();
  }

  update = () => {
    repaint();
    this.composer.runAll('draw');
    this.composer.runAll('collision');
    this.ball.move();

    this.clickToStart.show();
    this.life.show();

    this.tryloadNextLevel();
    this.reset();
  };

  restart() {
    this.ticker.stop();
    this.event.clear();
    this.started = false;
    this.start();
  }

  isGameover() {
    return this.life.lifes.length === 0;
  }

  reset() {
    if (this.isGameover()) {
      this.clickToRestart.show();
      this.composer.runAll('resets');
      this.restart();

      this.grid.gridItemDone = 0;
    }
  }

  tryloadNextLevel() {
    const numberOfBricksLeft = this.grid.gridItemDone -
        (this.grid.gridItems.length - this.grid.skip);
    if (numberOfBricksLeft === 0 && this.life.lifes.length > 0) {
      this.restart();
      this.currentLevel++;
    }
  }

  __debuggger__() {
    new Event()
      .accept(canvas)
      .on('mousemove', (e) => {
        this.ball.pos.x = e.offsetX;
        this.ball.pos.y = e.offsetY;
      });
  }
}

const pong = new Pong();
pong.start();

window.pong = pong;

