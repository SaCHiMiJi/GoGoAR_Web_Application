<template>
    <div class="container">
      <div class="row vertical-centre justify-content-center mt-50">
        <div class="col-md-6 mx-auto">
          <CreateTodo></CreateTodo>
          <ListTodo></ListTodo>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import CreateTodo from "./CreateTodo.vue";
  import ListTodo from "./ListTodo.vue";
  
  export default {
    name: "app",
    components: { CreateTodo, ListTodo }
  };
  </script>
  
  <style lang="scss">
  .vertical-centre {
    min-height: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
  .todo__row {
    width: 400px;
  }
  </style>
  