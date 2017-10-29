/* eslint-disable consistent-return,no-unused-expressions */
import Circle from './circles';

class Dot extends Circle {
// eslint-disable-next-line no-useless-constructor
  constructor(specs) {
    super(specs);
    this.blinkCount = 3;
    this.animationComplete = false;
  }

  draw() {
    this.drawCircle(this);
  }

  blink() {
    return new Promise(((resolve) => {
      const count = setInterval(() => {
        if (this.blinkCount > 0) {
          this.color === 'green' ?
            this.color = 'black' :
            this.color = 'green';
          --this.blinkCount;
        } else {
          this.animationComplete = true;
          clearInterval(count);
          return resolve(this.animationComplete);
        }
      }, 300);
    }));
  }


  animate(callBack) {
    this.blink()
      .then((done) => {
        callBack(done);
      });
  }
}

export default Dot;
