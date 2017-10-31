/* eslint-disable consistent-return,no-unused-expressions */
import Circle from './circles';

/**
 * @class Dot
 * @extends Circle
 * @constructor
 * @param {Object} specs
 */
class Dot extends Circle {
  constructor(specs) {
    super(specs);
    this.blinkCount = 3;
    this.animationComplete = false;
  }

  draw() {
    /**
     * @see drawCircle#Circle
     */
    this.drawCircle(this);
  }

  /**
   *
   * @returns {Promise}
   */
  blink() {
    /**
     *@description
     * promise allows me to remove the life from the array only after
     * it is resolved (animation complete)
     * probably setInterval could have done this
     */
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
      }, 200);
    }));
  }

  /**
   *
   * @param cb
   * @callback cb - runs only after promise has resolved with true;
   */
  animate(cb) {
    this.blink()
      .then((done) => {
        cb(done);
      });
  }
}

export default Dot;
