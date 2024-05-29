<template>
  <div class="align-self-center;"> 
        <!-- view assignment's details and instructions -->
        <div class="gap-8 items- py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6" v-if="detailView">
            <!-- Image container on 1st column -->
            <div>
                <img class="object-none self-center" src="/gogoboard.png" usemap="#image_map"/>
                <!-- view the assignment's url -->
                <div class="fixed bottom-0 left-0">
                    <button 
                        class="mb-5 p-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none" 
                        v-on:click="detailView = !detailView;getMobileAppURL()">
                        Assignment URL
                    </button>
                </div>
            </div>

            <!-- Form container on 2nd column -->
            <div class="items-start">
                <!-- Assignment name -->
                <div class="bg-[#322653] rounded-md p-8">
                    <div v-if="formCreating" class="flex justify-end">
                       {{ displayInstructionOrder() }}
                    </div>

                    <label for="large-input" class="block mb-2 text-sm font-medium text-white">Assignment Name</label>
                    <input v-model="assignmentName" type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500" readonly>
                    <!-- Description -->
                    <label for="large-input" class="block mb-2 text-sm font-medium text-white">Description</label>
                    <input v-model="description" type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500" readonly>

                    <!-- Assignment Reference URL -->
                    <label for="large-input" class="block mb-2 text-sm font-medium text-white">Reference Link</label>
                   <input v-model="ref_url" type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500" readonly>
                    </div>

                    <div class="mb-5 bg-[#EDE7F0] rounded-md p-8">
                    <!-- Instruction View page -->
                      <div>
                        <div v-for="[key] in steps" :key="key">
                          <div class="p-4 bg-gray-100 rounded-lg shadow-md flex items-center justify-between mb-2">
                            <div class="flex items-center">
                              <span class="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full mr-2">{{ key }}</span>
                              <span class="text-lg font-medium text-purple-700">{{ getStepFunctionDetails(key) }}</span>
                          </div>
                            
                          </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
        <!-- preview assignment's mobile url -->
        <div class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6" v-else>
        <!-- 1st column -->
          <div class="">
            <div v-if="mobileAppURL !== '' && mobileAppURL !== false" class=" text-center">
              <img src="/tick-circle.svg" class="mx-auto mb-4"/>
              <p>The assignment's presence, You can try the assignment on the button.</p>

              <div class="pb-6">
                Preview this Assignment.
              </div>
              <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">
                <a v-bind:href="mobileAppURL">Here</a>
              </button>
            </div>
            <div v-else class="text-center">
              <img class="mx-auto mb-4" src="/error.jpg"/>
              <div>This assignment doesn't have an app's URL yet, Please wait for the author to add this app later.</div>
             </div>
              <!-- view the assignment's detail -->
            <div class="fixed bottom-0 left-0">
              <button 
                class="mb-5 p-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none" v-on:click="detailView = !detailView">
                Assignment Detail
              </button>
            </div>
          </div>
          <!-- 2nd column -->
          <div>
            <!-- if assignment URL is present -->
            <div v-if="mobileAppURL !== '' && mobileAppURL !== false">
                  <!-- Assignment name -->
                  <div class="bg-[#322653] rounded-md p-8">
                    <div v-if="formCreating" class="flex justify-end">
                       {{ displayInstructionOrder() }}
                    </div>

                    <label for="large-input" class="block mb-2 text-sm font-medium text-white">Assignment Name</label>
                    <input v-model="assignmentName" type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500" readonly>
                    <!-- Description -->
                    <label for="large-input" class="block mb-2 text-sm font-medium text-white">Description</label>
                    <input v-model="description" type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500" readonly>

                    <!-- Assignment Reference URL -->
                    <label for="large-input" class="block mb-2 text-sm font-medium text-white">Reference Link</label>
                   <input v-model="ref_url" type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500" readonly>
                    </div>

                    <div class="mb-5 bg-[#EDE7F0] rounded-md p-8">
                    <!-- Instruction View page -->
                    <div>
                        <div v-for="[key] in steps" :key="key">
                          <div class="p-4 bg-gray-100 rounded-lg shadow-md flex items-center justify-between mb-2">
                            <div class="flex items-center">
                              <span class="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full mr-2">{{ key }}</span>
                              <span class="text-lg font-medium text-purple-700">{{ getStepFunctionDetails(key) }}</span>
                          </div>
                            
                          </div>
                    </div>
                  </div>
                </div>

            </div>
            <!-- if assignment URL is absent, let the user manually fetch the data -->
            <div v-else class="text-center">
              <button v-on:click="getMobileAppURL()" 
class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">
Re-fetch the URL</button>
           </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    props: {
      id: String
    },
    data() {
        return {
            assignment_id: null,
	    
            // this value will ensure how many instruction have existed.
            currentIndex: 0,

            // POST datas
            assignmentName: "",
            description: "",
            ref_url: "",
            creator_id: "guestuser0000",
            steps: new Map(),
            isExist: false,
            detailView: true,

            isAssignmentSubmit: false,
            mobileAppURL: ""
        };
    },
    methods: {
        // fetch assignment's detail
        getAssignmentDetail() {
            this.$http.get("/getassignment/" + this.assignment_id)
            .then(response => {
                const data = response.data;
                console.log(data);
                this.assignmentName = data.assignment_name;
                this.description = data.description;
                this.creator_id = data.creator_id;
		            this.ref_url = data.ref_url;
                this.mobileAppURL = data.mobileapp_url,
                this.steps = this.objectToMap(data.steps);

                console.log("fetched name as: " + this.assignmentName
                    + ", fetch creator's mail as : " + this.creator_mail);

                // this.displayInstructions();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        },
        // get subMap with Map's key as indicator on eaches.
        getSubValue(key, subKey) {
            if(this.steps.has(key)) {
                return this.steps.get(key).get(subKey);
            }
        },
        displayInstructionOrder() {
          if(this.currentIndex === 0) {
             return this.getInstructionAmount() + 1;
          }
          return this.currentIndex;
        },
        // Return them as text for overall displays.
        getStepFunctionDetails(index) {
            // Convert the step number to a string if it's passed as a number
            const step = this.steps.get(index);
            let stepInfo = "";
            if (step) {
                console.log(`Details of step ${index}:`);
                for (let [key, value] of step.entries()) {
                    stepInfo += `| ${value} `;
                    console.log(`${key}: ${value}`);
                }
                return stepInfo;
            } else {
                console.log(`Step ${index} not found.`);
            }
        },
        // the object receive from API server are mixed object, this view convert the object to map values.
        objectToMap(obj) {
            const result = new Map();
            Object.keys(obj).forEach(key => {
                const value = obj[key];
                if (value && typeof value === 'object' && !Array.isArray(value) && value !== null) {
                result.set(key, this.objectToMap(value)); // Recursively convert nested objects
                } else {
                result.set(key, value);
                }
            });
            return result;
        },
        getMobileAppURL() {
            this.isAssignmentSubmit = true;
            this.$http.get('/getredirectionurl/' + this.assignment_id)
                .then((response) => {
                    this.mobileAppURL = response.data;
            		    console.log(this.mobileAppURL + " == " + response);
                })
                .catch((error) => {
                    console.log(error); 
                });
        },
    },
    created() {
        if (this.id) {
            this.assignment_id = this.id;
            this.getAssignmentDetail();
            this.isExist = true;
        } else {
          console.log("Couldn't get the parameter");
        }
    }
};
</script>
