import Vec from './vector';

/**
 * @class Rect
 */
class Rect {
  /**
   *
   * @param {...number, ?string}
   * @param x
   * @param y
   * @param radius
   * @param startAngle
   * @param endAngle
   * @param {string} color
   */
  constructor({
    x, y, width, height, color,
  }) {
    this.pos = new Vec(x, y);
    this.size = new Vec(width, height);
    this.color = color;
  }

  get left() {
    return this.pos.x;
  }

  get right() {
    return this.pos.x + this.size.x;
  }

  get top() {
    return this.pos.y;
  }

  drawRect(ctx, rect) {
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.pos.x, rect.pos.y, rect.size.x, rect.size.y);
  }
}

export default Rect;
