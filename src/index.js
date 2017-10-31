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

/**
 * @class
 * @constructor
 * @type {Pong}
 * @description Main game controller;
 *
 */
class Pong {
  constructor() {
    /**
     *
     * @type {Life}
     */
    this.life = new Life();
    /**
     *
     * @type {Event}
     */
    this.event = new Event();
    /**
     *
     * @type {Grid}
     * @param {...number} x & y -vector from Vector class
     */
    this.grid = new Grid(10, 8);
    /**
     *
     * @type {Ball}
     * @param {Object.<string, number|string>}
     *
     */
    this.ball = new Ball(specs.ballSpecs);
    /**
     *
     * @type {Paddle}
     * @param {Object.<string, number|string>}
     */
    this.paddle = new Paddle(specs.paddleSpecs);
    /**
     *
     * @type {Text}
     * @param {Object.<string, number|string>}
     */
    this.clickToStartText = new Text(specs.welcome);
    this.clickToRestart = new Text(Object.assign({}, specs.welcome, { text: 'Click To Restart' }));

    /**
     *
     * @type {Ticker}
     * @param null
     */
    this.ticker = new Ticker();
    /**
     *
     * @type {Composer}
     * @param null
     */
    this.composer = new Composer();

    /**
     *
     * @type {boolean}
     */
    this.started = false;
    /**
     *
     * @type {number}
     */
    this.currentLevel = 0;

    this.setup();
  }

  /**
   * @desc
   * Starts main game. Accepts and Binds an event to canvas
   * @callback no run if this.started = true
   * @see Event#accept
   * @see Event#on
   *
   */
  start() {
    if (!this.started) {
      this.event
        .accept(canvas)
        .on('click', () => {
          if (!this.started) {
            this.clickToStartText.remove();

            this.ticker.tick();
            this.started = true;
          }
        });
    }
  }

  /**
   * @desc
   * setUp main game components
   * @see repaint#Gamecanvas
   * @see grid#Grid
   * @see fill#Grid
   * @see plugin#Grid
   * @see construct#Grid
   *
   * @see group@Composer
   */
  setup() {
    // paint done once until update is called;
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

    this.composer.group(
      'show',
      this.clickToStartText.show,
      this.life.show,
    );

    this.clickToStartText.show();
    this.paddle.onMouseMove();

    /**
     * @desc
     * plugin allows two objects to interact
     */
    this.ball.plugin(this.life);
    this.paddle.plugin(this.ball);
    /**
     * @desc
     * registers what function to call during setInterval update
     * needs to use requestAnimationFrame
     */
    this.ticker.register(this.update);

    // uncomment debugger to move ball where mouse goes
    this.__debuggger__();
  }

  update = () => {
    repaint();
    this.composer.runAll('draw');
    this.composer.runAll('collision');
    this.composer.runAll('show');
    this.ball.move();

    this.tryloadNextLevel();
    if (this.isGameover()) this.reset();
  };

  restart() {
    /**
     * @desc
     * stops ticker
     * unbind and rebinds the event to allow click to restart
     */
    this.started = false;
    this.ticker.stop();
    this.event.clear();
    this.start();
  }

  isGameover() {
    return this.life.lives.length === 0;
  }

  reset() {
    this.clickToRestart.show();
    this.grid.gridItemDone = 0;
    this.currentLevel = 0;

    this.composer.runAll('resets');
    this.restart();
  }

  nextLevel() {
    this.currentLevel++;
    this.grid.plugin('levelStructure', levels[this.currentLevel]);
    this.composer.runAll('resets');
    this.restart();
  }

  tryloadNextLevel() {
    if (
      this.grid.gridItemDone -
      (this.grid.gridItems.length - this.grid.skip) === 0 &&
      this.life.lives.length > 0
    ) {
      if (this.currentLevel < levels.length - 1) {
        this.nextLevel();
      } else {
        this.reset();
      }
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

