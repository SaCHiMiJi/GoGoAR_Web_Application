<template>
<section>
    <!-- Delete Assignment Modal -->
      <div v-if="idToDelete !== null" class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden w-full bg-black/50">
        <div class="relative p-4 w-screen max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow-2xl">
            <button @click="idToDelete = null" type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="p-4 md:p-5 text-center">
              <svg class="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
              <h3 class="mb-5 text-lg font-normal text-gray-500">Are you sure you want to Delete this assignment?</h3>
              <button @click="deleteAssignment(idToDelete)" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                Yes, I'm sure
              </button>
              <button @click="idToDelete = null" type="button" class="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                No, cancel
              </button>
            </div>
          </div>
        </div>
    </div>

    <div v-show="assignments.length==0" class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
      <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">You haven't create any course</h1>
      <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48">
        You can start to create one right here.
      </p>
      <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <a href="/assignmentcreation" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Get started
                <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a>
            <a href="/" class="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-70">
                Learn more
            </a>  
        </div>
    </div>
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
                
                <!-- Buttons Row -->
                <div class="flex justify-end space-x-2 mt-4">
    
                  <!-- Edit Button -->
                  <router-link :to="{path: '/assignmentcreation', query: { jsonData: JSON.stringify(assignment._id) } }">
                    <h5 class="border border-black inline-flex items-center px-5 py-4 text-sm font-medium text-center text-white rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300">
                      <v-lazy-image class="w-5 h-5 md-5 pd-5" src="/edit_image.svg" />
                    </h5>
                  </router-link>
                  <!-- Remove Button -->
                  <button v-on:click="idToDelete = assignment._id">
                    <h5 class="border border-black inline-flex items-center px-5 py-4 text-sm font-medium text-center text-white rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300">
                      <v-lazy-image class="w-5 h-5 md-5 pd-5" src="/delete_image.svg" />
                    </h5>
                  </button>
                </div>
            </div>
        </div>
    </div>
</section>
</template>
  
<script>
import VLazyImage from "v-lazy-image";
export default {
    components: {
      "v-lazy-image": VLazyImage, 
    },
    data() {
            return {
                assignments: [],       
                idToDelete: null
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
            const jwtToken = JSON.parse(localStorage.getItem('userInfo')).token; 
            
            const config = {
              headers: { 
                'Authorization': `Bearer ${jwtToken}`
              }
            };
          this.$http.delete("/delete/" + id, config)
            .then(response => {
                // Handle success, such as updating the view or notifying the user
                console.log('Assignment deleted successfully', response);
                // Optionally remove the assignment from the list in the frontend
                this.assignments = this.assignments.filter(assignment => assignment._id !== id);
                this.idToDelete = null;
            })
            .catch(error => {
                // Handle error, show a message to the user
                console.error('Error deleting the assignment', error);
            });
          }
    }
}
  </script>
