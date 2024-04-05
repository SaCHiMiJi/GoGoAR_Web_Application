<template>
  <div class="col align-self-center">
    <h3 class="pb-5 text-left underline">Create todos</h3>
    <form class="sign-in" @submit.prevent>
      <div class="form-group todo__row">
        <input
          type="text"
          class="form-control"
          @keypress="typing=true"
          placeholder="Course Name"
          v-model="name"
          @keyup.enter="addTodo($event)"
        />
        <input
          type="text"
          class="form-control"
          @keypress="typing=true"
          placeholder="Course description"
          v-model="description"
          @keyup.enter="addTodo($event)"
        />
        <small class="form-text text-muted" v-show="typing">Hit enter to save</small>
      </div>
    </form>
  </div>
</template>
<script>
import axios from "axios";
import bus from "./../bus.js";

export default {
  data() {
    return {
      name: "",
      description:"",
      typing: false
    };
  },
  methods: {
    addTodo(event) {
      if (event) event.preventDefault();
      let todo = {
        name: this.name,
        description: this.description,
        done: false //false by default
      };

      console.log(todo);
      this.$http
        .post("/", todo)
        .then(response => {
          this.clearTodo();
          this.refreshTodo();
          this.typing = false;
        })
        .catch(error => {
          console.log(error);
        });
    },

    clearTodo() {
      this.name = "";
      this.description = "";
    },

    refreshTodo() {
      bus.$emit("refreshTodo");
    }
  }
};
</script>
<style lang="scss" scoped>
.underline {
  text-decoration: underline;
}
</style>
