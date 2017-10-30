import Vec from './vector';

class Grid {
  constructor(col, row) {
    this.dimension = new Vec(col, row);
    this.gridItems = [];
    this.gridItemDone = 0;
    this.padding = 2;

    this.entities = null;
    this.specs = null;
    this.skip = this.dimension.y * 2;
    this.shiftFromTop = false;
  }

  plugin(key, entity) {
    if (!this[key]) {
      this[key] = entity;
      return this;
    }
    return this;
  }

  fill(entities, space) {
    this.entities = entities;
    this.shiftFromTop = space;
    this.specs = entities.type0.specs; // todo remove hard coded values
    return this;
  }

  draw = () => {
    this.gridItems.forEach(item => item.visible && item.draw());
  }

  construct() {
    const rowLength = this.dimension.x;
    const colLength = this.dimension.y;

    for (let row = 0; row < rowLength; row++) {
      for (let col = 0; col < colLength; col++) {
        const index = col + (this.dimension.y * row);
        const { brick: Brick, specs } = this.entities[`type${this.levelStructure[index]}`];
        const { width, height } = specs;

        const construct = new Brick(Object.assign(specs, {
          x: width * col,
          y: height * row,
        }));

        construct.size.x -= this.padding;
        construct.size.y -= this.padding;
        this.gridItems.push(construct);
      }
    }

    if (this.shiftFromTop) {
      this.gridItems.forEach((rect, index) => {
        if (index < this.skip) {
          rect.visible = false;
        }
      });
    }
  }

  checkIntersection = () => {
    const { width, height } = this.specs;
    const col = Math.floor(this.ball.pos.x / width);
    const row = Math.floor(this.ball.pos.y / height);
    const index = col + (this.dimension.y * row);

    const brickAtGrid = this.gridItems[index];

    const isWithinRange = () => (
      col >= 0 && col < this.dimension.y &&
      row >= 0 && row < this.dimension.x &&
      index < this.dimension.x * this.dimension.y
    );

    if (isWithinRange() && brickAtGrid.visible !== false) {
      if (brickAtGrid.hitPoints && brickAtGrid.hitPoints > 1) {
        brickAtGrid.hitPoints--;
      } else {
        brickAtGrid.visible = false;
      }

      const ballX = Math.floor(this.ball.pos.x);
      const brickLeftReference = brickAtGrid.left + 5;
      const brickRightReference = brickAtGrid.right - 5;

      if (brickLeftReference >= ballX) {
        this.ball.vel.x *= -1;
      }
      if (brickRightReference <= ballX) {
        this.ball.vel.x *= -1;
      }

      this.ball.vel.y *= -1;
      this.ball.vel.y += 0.05;
      this.gridItemDone++;
    }
  }

  reset = () => {
    this.gridItems.forEach((brick, index) => {
      if (index >= this.skip) {
        brick.visible = true;
      }
    });
  }
}

export default Grid;
