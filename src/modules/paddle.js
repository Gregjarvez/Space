import Rect from './rect';
import Event from './events';
import gameCanvas, { canvas, ctx } from './canvas';

/**
 * @class Paddle
 */
class Paddle extends Rect {
  constructor(spec) {
    super(spec);
    this.pos.x = gameCanvas.halfWidth;
    this.pos.y = canvas.height - spec.offset;

    this.accepted = null;
    this.event = new Event();
  }

  /**
   * @description only accept one plugin. ball
   * @param entity
   * @returns {Paddle}
   */
  plugin(entity) {
    if (!this.accepted) {
      this.accepted = entity;
      return this;
    }
    return this;
  }

  draw = () => {
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

  checkCollision = () => {
    // rename for semantics in this scope
    this.accepted = this.ball;
    if (this.ball.left > this.left &&
        this.ball.right < this.right &&
        this.ball.bottom > this.top
    ) {
      this.ball.vel.y = -this.ball.vel.y;

      const paddleCenter = this.pos.x + (this.size.x / 2);
      const collisionPointFromCenter = this.ball.pos.x - paddleCenter;

      this.ball.vel.x = collisionPointFromCenter * this.ball.drag;
      this.ball.vel.x -= 0.5;
      this.ball.vel.y -= 0.5;
    }
  }
  reset = () => {
    this.pos.x = canvas.halfWidth;
  }
}

export default Paddle;
