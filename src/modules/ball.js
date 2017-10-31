import Vec from './vector';
import Circle from './circles';
import gamesCanvas, { canvas } from './canvas';

/**
 * @class Ball
 * @extends Circle
 * @param {Object, <string, number|string>} specs
 */
class Ball extends Circle {
  constructor(spec) {
    super(spec);
    this.drag = 0.5;
    this.vel = new Vec(5, 7);
    this.accepted = null;
  }

  move() {
    this.pos.x += (this.vel.x * this.drag);
    this.pos.y += (this.vel.y * this.drag);

    if (this.left <= 0 || this.right > canvas.width) {
      this.vel.x = -this.vel.x;
    }

    if (this.top <= 0) {
      this.vel.y = -this.vel.y;
    }

    if (this.top > canvas.height) {
      this.reset();
      // rename for semantic reasons
      this.lives = this.accepted;
      if (this.lives.length) {
        /**
         * @description decreases life after paddle misses ball
         * @see decrease#Life
         */
        this.lives.decrease();
      }
    }
  }

  // accepts life
  plugin(entity) {
    this.accepted = entity;
    return this;
  }

  reset = () => {
    this.pos.x = gamesCanvas.halfWidth;
    this.pos.y = gamesCanvas.halfHeight;
    this.vel.x = 5;
    this.vel.y = 7;
  }

  draw = () => {
    this.drawCircle(this);
  }
}

export default Ball;
