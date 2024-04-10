<template>
    <div v-bind:show="courses.length>0" class="col align-self-center">
      <!-- Add by amount of Course -->
      <div class="form-row align-items-center" v-bind:key="course" v-for="course in courses">
        <div class="col-auto my-1">
          <div class="input-group mb-3 todo__row">
            <div class="input-group-prepend">
                <div> {{ course.course_name }} </div>
                <br>
                <div> {{ course.course_description }} </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="alert alert-primary todo__row"
        v-show="courses.length==0 && doneLoading"
      >There are no course exist yet.</div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import bus from "./../bus.js";
  
  export default {
    data() {
      return {
        courses: [],
        doneLoading: true
      };
    },
    created: function() {
      this.fetchCourse();
      this.listenToEvents();
    },
    watch: {
      $route: function() {
        let self = this;
        self.doneLoading = false;
        self.fetchData().then(function() {
          self.doneLoading = true;
        });
      }
    },
    methods: {
      fetchCourse() {
        this.$http.get("/").then(response => {
          this.courses = response.data;
        });
      },
  
      deleteTodo(id) {
        this.$http.delete(`/${id}`).then(response => {
          this.fetchCourse();
        });
      },
  
      listenToEvents() {
        bus.on("refreshCourse", $event => {
          this.fetchCourse(); //update todo
        });
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .todo__done {
    text-decoration: line-through !important;
  }
  
  .no_border_left_right {
    border-left: 0px;
    border-right: 0px;
  }
  
  .flat_form {
    border-radius: 0px;
  }
  
  .mrb-10 {
    margin-bottom: 10px;
  }
  
  .addon-left {
    background-color: none !important;
    border-left: 0px !important;
    cursor: pointer !important;
  }
  
  .addon-right {
    background-color: none !important;
    border-right: 0px !important;
  }
  </style>
  