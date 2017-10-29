import Rect from './rect';
import Event from './events';
import gameCanvas, { canvas, ctx } from './canvas';

class Paddle extends Rect {
  constructor(spec) {
    super(spec);
    this.pos.x = gameCanvas.halfWidth;
    this.pos.y = canvas.height - spec.offset;

    this.accepted = null;
    this.event = new Event();
  }

  plugin(entity) {
    if (!this.accepted) {
      this.accepted = entity;
      return this;
    }
    return this;
  }

  draw() {
    this.drawRect(ctx, this);
  }

  move = (event) => {
    this.pos.x = event.offsetX - (this.size.x / 2);
  }

  onMouseMove() {
    this.event
      .accept(canvas)
      .on('mousemove', this.move);
  }

  checkCollision() {
    if (this.accepted.left > this.left &&
        this.accepted.right < this.right &&
        this.accepted.bottom > this.top
    ) {
      this.accepted.vel.y = -this.accepted.vel.y;

      const paddleCenter = this.pos.x + (this.size.x / 2);
      const collisionPointFromCenter = this.accepted.pos.x - paddleCenter;

      this.accepted.vel.x = collisionPointFromCenter * this.accepted.drag;
      this.accepted.vel.x -= 0.5;
      this.accepted.vel.y -= 0.5;
    }
  }
  reset() {
    this.pos.x = canvas.halfWidth;
  }
}

export default Paddle;
