import Vec from './vector';
import { ctx } from './canvas';

/**
 * @class Circle
 */
class Circle {
  /**
   *
   * @param {...number, ?string}
   * @param x
   * @param y
   * @param radius
   * @param startAngle
   * @param endAngle
   * @param color
   */
  constructor({
    x, y, radius, startAngle, endAngle, color,
  }) {
    this.pos = new Vec(x, y);
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.color = color;
  }

  get left() {
    return this.pos.x - this.radius;
  }

  get right() {
    return this.pos.x + this.radius;
  }

  get top() {
    return this.pos.y - this.radius;
  }

  get bottom() {
    return this.pos.y + this.radius;
  }

  // eslint-disable-next-line class-methods-use-this
  drawCircle(circle) {
    ctx.fillStyle = circle.color;
    ctx.beginPath();
    ctx.arc(circle.pos.x, circle.pos.y, circle.radius, circle.startAngle, circle.endAngle, true);
    ctx.fill();
  }
}

export default Circle;
