class Event {
  accept(entity) {
    this.accepted = entity;
    return this;
  }

  on(eventName, callBack) {
    this.accepted.addEventListener(eventName, callBack);
  }
}

export default Event;
