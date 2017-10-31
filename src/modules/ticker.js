/**
 * @class Ticker
 */
class Ticker {
  constructor() {
    this.func = null;
    this.loop = null;
    this.fps = 1000 / 60;
  }

  /**
   *
   * @param fnc - callback function in setInterval;
   */
  register(fnc) {
    this.func = fnc;
  }

  /**
   * use requestAnimationFrame instead.
   */
  tick = () => {
    this.loop = setInterval(() => {
      this.func();
    }, this.fps);
  }

  stop = () => {
    clearInterval(this.loop);
  }
}
export default Ticker;
