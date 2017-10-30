class Ticker {
  constructor() {
    this.func = null;
    this.loop = null;
    this.fps = 1000 / 60;
  }

  register(fnc) {
    this.func = fnc;
  }
  tick = () => {
    this.loop = setInterval(() => {
      this.func();
      console.log('ticking');
    }, this.fps);

    this.loop = requestAnimationFrame(this.func)
  }

  stop = () => {
    clearInterval(this.loop);
  }
}
export default Ticker;
