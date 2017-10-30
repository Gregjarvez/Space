class Composer {
  constructor() {
    this.buckets = {};
  }

  group(type, ...args) {
    this.buckets[type] = args;
  }

  runAll(type) {
    this.buckets[type].forEach((func) => {
      func();
    });
  }
}

export default Composer;
