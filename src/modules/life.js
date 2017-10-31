import Vec from './vector';
import Dot from './lifeDot';
import specs from './specs';

/**
 * @class Life
 * @description - controls player life;
 * @param life
 * @default {number} 3
 */
class Life {
  constructor(life = 3) {
    this.lifeCount = life;
    this.lives = [];

    this.populate();
  }

  populate() {
    for (let i = 1; i <= this.lifeCount; i++) {
      const pos = new Vec((20 * i), 20);
      const dot = new Dot(Object.assign(specs.life, {
        x: pos.x,
        y: pos.y,
      }));

      this.lives.push(dot);
    }
  }

  decrease() {
    const life = this.lives[this.lives.length - 1];
    if (!life.animationComplete) {
      /**
       * @see animate#LifeDot
       * @callback - removes life after completion.
       * Remove lifeDot object left to maintains no reference and so collected
       * I was thinking of using two stacks to hold current life and expired life
       * respectively.
       * one pops the other receives.
       * @example
       * if(status) this.expired.push(this.lives.pop());
       * on reset this.lives = [...this.expired];
       */
      life.animate((status) => {
        if (status) this.lives.pop();
      });
    }
  }

  show = () => {
    this.lives.forEach((life) => {
      life.draw();
    });
  }


  resetLife = () => {
    this.populate();
  }
}

export default Life;
