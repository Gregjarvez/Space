import Vec from './vector';

class Grid {
  constructor(col, row) {
    this.dimension = new Vec(col, row);
    this.gridItems = [];
    this.gridItemDone = 0;
    this.padding = 2;

    this.accepted = null;
    this.Entity = null;
    this.specs = null;
    this.skip = this.dimension.y * 2;
    this.shiftFromTop = false;
  }

  plugin(entity) {
    if (!this.accepted) {
      this.accepted = entity;
      return this;
    }
    return this;
  }

  fill(entity, specs, shift) {
    this.Entity = entity;
    this.specs = specs;
    this.shiftFromTop = shift;

    return this;
  }

  draw() {
    this.gridItems.forEach(item => item.visible && item.draw());
  }

  construct() {
    const rowLength = this.dimension.x;
    const colLength = this.dimension.y;

    for (let row = 0; row < rowLength; row++) {
      for (let col = 0; col < colLength; col++) {
        const brick = new this.Entity(Object.assign(this.specs, {
          x: this.specs.width * col,
          y: this.specs.height * row,
        }));

        brick.size.x -= this.padding;
        brick.size.y -= this.padding;

        this.gridItems.push(brick);
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

  checkIntersection() {
    const { width, height } = this.specs;
    const col = Math.floor(this.accepted.pos.x / width);
    const row = Math.floor(this.accepted.pos.y / height);
    const index = col + (this.dimension.y * row);

    const brickAtGrid = this.gridItems[index];

    const isWithinRange = () => (
      col >= 0 && col < this.dimension.y &&
      row >= 0 && row < this.dimension.x &&
      index < this.dimension.x * this.dimension.y
    );

    if (isWithinRange() && brickAtGrid.visible !== false) {
      brickAtGrid.visible = false;

      const ballX = Math.floor(this.accepted.pos.x);
      const brickLeftReference = brickAtGrid.left + 5;
      const brickRightReference = brickAtGrid.right - 5;

      if (brickLeftReference >= ballX) {
        this.accepted.vel.x *= -1;
      }
      if (brickRightReference <= ballX) {
        this.accepted.vel.x *= -1;
      }

      this.accepted.vel.y *= -1;
      this.accepted.vel.y += 0.05;
      this.gridItemDone++;
    }
  }

  reset() {
    this.gridItems.forEach((brick, index) => {
      if (index >= this.skip) {
        brick.visible = true;
      }
    });
  }
}

export default Grid;
