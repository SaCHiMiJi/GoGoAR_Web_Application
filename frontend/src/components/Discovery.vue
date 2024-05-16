<template>
    <div>
        <div class="form-row align-items-center" v-bind:key="assignment" v-for="assignment in assignments">
            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                </a>
            </div>
        </div>
    </div>
  </template>
  
<script>
import axios from 'axios';

export default {
    data() {
            return {
                assignments: []        
            };
    },
    created: function()  {
        this.fetchAssignment();
    },
    methods: {
        fetchAssignment() {
            this.$http.get("/getall").then(response => {
                this.assignments = response.data;
            });
        },
    }
}
  </script>
