<template>
    <div>
        <div class="form-row align-items-center" v-bind:key="assignment" v-for="assignment in assignments">
            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                </a>

                <!-- Edit Button -->
                <a href="#" 
		class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <router-link :to="{path: '/arcreation',
		    query: { jsonData: JSON.stringify(assignment._id) } }">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">✏️</h5>
                    </router-link>
                    <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    </svg>
                </a>

                <!-- Remove Button -->
                <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <button v-on:click="deleteAssignment(assignment._id)">
                        🗑️
                    </button>
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
        deleteAssignment(id) {
        axios.delete(`http://localhost/assignment/delete/${id}`)
            .then(response => {
                // Handle success, such as updating the view or notifying the user
                console.log('Assignment deleted successfully', response);
                // Optionally remove the assignment from the list in the frontend
                this.assignments = this.assignments.filter(assignment => assignment._id !== id);
            })
            .catch(error => {
                // Handle error, show a message to the user
                console.error('Error deleting the assignment', error);
            });
        }
    }
}
  </script>
