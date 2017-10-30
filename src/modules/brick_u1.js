import Brick from './brick';

class Brick_Type1 extends Brick {
  constructor(specs) {
    super(specs);
    this.color = 'brown';
    this.strokeWidth = 3;
    this.hitPoints = 2;
  }
}

export default Brick;
