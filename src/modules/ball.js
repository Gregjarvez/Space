import Vec from './vector';
import Circle from './circles';
import { canvas, ctx } from './canvas';

class Ball extends Circle {
  constructor(spec) {
    super(spec);
    this.drag = 0.35;
    this.vel = new Vec(3, 5);
  }

  move() {
    this.pos.x += this.vel.x / 2;
    this.pos.y += this.vel.y / 2;
    if (this.left <= 0 || this.right > canvas.width) {
      this.vel.x = -this.vel.x;
    }

    if (this.top <= 0) {
      this.vel.y = -this.vel.y;
    }

    if (this.top > canvas.height) {
      this.reset();
    }
  }

  reset() {
    this.pos.x = canvas.halfWidth;
    this.pos.y = canvas.halfHeight;
    this.vel.x = 3;
    this.vel.y = 5;
  }

  draw() {
    this.drawCircle(ctx, this);
  }
}

export default Ball;
