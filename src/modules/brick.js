import Rect from './rect';
import { ctx } from './canvas';

class Brick extends Rect {
  constructor(spec) {
    super(spec);
    this.visible = true;
  }
  draw() {
    this.drawRect(ctx, this);
  }
}

export default Brick;
