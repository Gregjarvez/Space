import Brick from './brick';

/**
 * @class BrickType1
 * @extends Brick
 * @param {object} specs
 */
class BrickType1 extends Brick {
  constructor(specs) {
    super(specs);
    this.hitPoints = 2;
  }
}

export default BrickType1;
