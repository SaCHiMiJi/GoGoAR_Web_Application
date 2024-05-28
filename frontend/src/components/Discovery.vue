<template>
    <div class="grid grid-cols-4 gap-4 m-10">
        <div class="form-row align-items-center" v-bind:key="assignment" v-for="assignment in assignments">
            <!-- Topic -->
            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
                    {{ assignment.assignment_name }}
                <br>    
                <!-- Description -->
                <p class="font-normal text-gray-700">
                    {{ assignment.description }}
                </p>
                <!-- URL -->
                <p class="font-normal text-gray-500 pb-8" v-if="assignment.mobileapp_url != null">
                    <a :href='assignment.mobileapp_url'>the assignment url</a>
                </p>
                <p class="font-normal text-gray-500 pb-8" v-else>
                    This assignment dont have URL yet.
                </p>

                <!-- To assignment view page -->
                <router-link :to="{path: '/assignmentview/' + assignment._id}">
                    <h5 class=" px-8 py-5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">assigment's details</h5>
                </router-link>
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
        // retreive all assignment form server.
        fetchAssignment() {
            this.$http.get("/getall").then(response => {
                this.assignments = response.data;
            });
        },
    }
}
  </script>
