import { ctx } from './canvas';
import Vec from './vector';

class Text {
  constructor({
    x, y, text, font,
  }) {
    this.color = 'purple';
    this.font = font;
    this.text = text;
    this.pos = new Vec(x, y);
    this.visible = true;
    this.fontSize = 20;
  }

  show = () => {
    if (this.visible) {
      ctx.fillStyle = this.color;
      ctx.font = this.font;
      ctx.fillText(this.text, this.pos.x - ((this.fontSize / 2) * this.text.length), this.pos.y);
    }
  }

  remove() {
    this.visible = false;
  }
}

export default Text;
