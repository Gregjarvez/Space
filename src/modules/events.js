class Event {
  constructor() {
    this.accepted = null;
    this.eventName = null;
    this.callBack = null;
  }
  accept(entity) {
    this.accepted = entity;
    return this;
  }

  on(eventName, callBack) {
    this.callBack = callBack;
    this.eventName = eventName;
    this.accepted.addEventListener(eventName, callBack);
  }

  clear() {
    this.accepted.removeEventListener(this.eventName, this.callBack);
  }
}

export default Event;
