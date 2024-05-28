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
                <!-- Edit Button -->
                <router-link :to="{path: '/assignmentcreation', query: { jsonData: JSON.stringify(assignment._id) } }">
                  <h5 class="inline-flex p-6 items-center px-5 py-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">✏️</h5>
                </router-link>
            
                <!-- Remove Button -->
                <button v-on:click="deleteAssignment(assignment._id)">
                  <h5 class="inline-flex items-center px-5 py-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">🗑️</h5>
                </button>
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
    	this.emitter.emit("restrict-unauthorize");
        this.fetchAssignment();
    },
    methods: {
        fetchAssignment() {
            this.$http.get("/getassignmentbyuser/" + JSON.parse(localStorage.getItem('userInfo'))._id).then(response => {
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
