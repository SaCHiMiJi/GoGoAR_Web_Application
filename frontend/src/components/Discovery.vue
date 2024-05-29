<template>
<section>
    <div v-show="assignments.length > 0" class="py-4 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
      <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-5xl">Our discovery here</h1>
      <p class="text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48">
        You can view the other course's instructions and url application.
      </p>
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
                <p class="font-normal text-gray-500 pb-8">
                    <a :href='assignment.mobileapp_url'>the assignment url</a>
                </p>
                
                <!-- Buttons Row -->
                <div class="flex justify-end mt-4">

                  <!-- To assignment view page -->
                  <router-link :to="{path: '/assignmentview/' + assignment._id}">
                      <div class="p-4 text-sm font-medium flex fonts-center text-black bg-white border border-black rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-800">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                      </svg>
                    </div>
                  </router-link>
                </div>
            </div>
      </div>
    </div>
    <div v-show="assignments.length==0" class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
      <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">There are no course at the moment.</h1>
      <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48">
        wait the others to create one.
      </p>
    </div>
</section>
</template>
  
<script>
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
