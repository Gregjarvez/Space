/**
 *@class Composer
 *@classdesc - groups repetitive tasks and run at call
 */

class Composer {
  constructor() {
    this.buckets = {};
  }

  /**
   * @param type
   * @param args []
   */
  group(type, ...args) {
    this.buckets[type] = args;
  }

  /**
   *
   * @param type
   */
  runAll(type) {
    this.buckets[type].forEach((func) => {
      func();
    });
  }
}

export default Composer;
