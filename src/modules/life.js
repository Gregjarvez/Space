import Vec from './vector';
import Dot from './lifeDot';
import specs from './specs';

class Life {
  constructor(life = 3) {
    this.lifeCount = life;
    this.lifes = [];

    this.populate();
  }

  populate() {
    for (let i = 1; i <= this.lifeCount; i++) {
      const pos = new Vec((20 * i), 20);
      const dot = new Dot(Object.assign(specs.life, {
        x: pos.x,
        y: pos.y,
      }));

      this.lifes.push(dot);
    }
  }

  decrease() {
    const life = this.lifes[this.lifes.length - 1];
    if (!life.animationComplete) {
      life.animate((status) => {
        if (status) this.lifes.pop();
      });
    }
  }

  increase() {
    ++this.lifeCount;
  }

  show = () => {
    this.lifes.forEach((life) => {
      life.draw();
    });
  }


  resetLife = () => {
    this.populate();
  }
}

export default Life;
