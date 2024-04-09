import { createApp, ref } from 'vue';

const bus = createApp({});
bus.config.globalProperties.$bus = {
  events: ref({}),
  $on(event, callback) {
    if (!this.events.value[event]) {
      this.events.value[event] = [];
    }
    this.events.value[event].push(callback);
  },
  $off(event, callback) {
    if (this.events.value[event]) {
      const index = this.events.value[event].indexOf(callback);
      if (index > -1) {
        this.events.value[event].splice(index, 1);
      }
    }
  },
  $emit(event, ...args) {
    if (this.events.value[event]) {
      this.events.value[event].forEach(callback => {
        callback(...args);
      });
    }
  }
};

export default bus;