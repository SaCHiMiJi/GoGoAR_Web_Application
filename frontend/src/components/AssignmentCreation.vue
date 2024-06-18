<template>
  <div class="align-self-center;"> 
        <!-- Save Assignment Modal -->
        <div v-if="saveConfirmationModal" class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden w-full bg-black/50">
          <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow">
              <button v-on:click="saveConfirmationModal = false" type="button" class="absolute top-3 right-2.5 text-gray-400hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
              <div class="p-4 md:p-5 text-center">
                <h3 class="my-5 text-lg font-normal text-gray-500">
                  Are you sure you want to proceed? Please confirm that all details and instructions are complete and accurate before submitting.
                </h3>
                <button v-on:click="submitAssignment" type="button" class="text-white bg-[#50C878] hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                  Yes
                </button>
                <button v-on:click="saveConfirmationModal = false" type="button" class="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                  No
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Delete Instruction Modal -->
        <div v-if="focusDeleteInstruction > 0" class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden w-full bg-black/50">
          <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow">
              <button v-on:click="focusDeleteInstruction = 0" type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
              <div class="p-4 md:p-5 text-center">
                <svg class="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 class="mb-5 text-lg font-normal text-gray-500">Are you sure you want to delete this instruction?</h3>
                <button v-on:click="deleteInstruction(focusDeleteInstruction)" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                  Yes
                </button>
                <button v-on:click="focusDeleteInstruction = 0" type="button" class="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
       
        <!-- Assignments -->
        <div class="gap-8 items-center py-8 px-4 max-w-screen-2xl xl:gap-16 md:grid md:grid-cols-2 lg:px-6 max-h-screen-xl" v-if="!isAssignmentSubmit">
            <!-- Image container on 1st column -->
            <div class="relative flex-grow flex items-center justify-center self-start">
        	<v-lazy-image class="object-none self-center" src="/gogoboard.png" usemap="#image_map"/>
                <map name="image_map">
                    <area v-for="(area, index) in areas" :key="index" :alt="area.alt" :title="area.title" :coords="area.coords" :shape="area.shape" @click="handleAreaClick(index)" :class="{ 'selected-area': areaClicked === index }"/>
                </map>

                
        	<div class="absolute bottom-0 left-0" v-if="!formCreating">
                    <button 
                        class="mb-5 p-8 text-white bg-[#50C878] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none" 
                        v-on:click="saveConfirmationModal = true">
                        Save Assignment
                    </button>
                </div>
            </div>

            <!-- Form container on 2nd column -->
            <div class="items-start">
                <!-- Assignment Detail -->
                <div class="bg-[#322653] rounded-md p-8">
                    <div v-if="formCreating" class="flex justify-end text-white">
                       {{ displayInstructionOrder() }}
                    </div>

                    <label for="default-input" class="block mb-2 text-sm font-medium text-white">Assignment Name</label>
                    <input v-model="assignmentName" type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2">
                    <!-- Description -->
                    <label for="large-input" class="block mb-2 text-sm font-medium text-white">Description</label>
                    <textarea maxlength="75" v-model="description" id="message" rows="1" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mb-2"></textarea>

                    <!-- Assignment Reference URL -->
                    <label for="default-input" class="block mb-2 text-sm font-medium text-white">Reference Link</label>
                    <input v-model="ref_url" type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                </div>

                <!-- Assignment form -->
                <div class="mb-5 bg-[#EDE7F0] rounded-md p-8">
                    <!-- Add form button -->
                    <div v-if="!formCreating">
                        <div v-for="[key] in steps" :key="key">
                          <div class="p-4 rounded-lg bg-gray-100 shadow-md flex items-center justify-between mb-2">
                            <div class="flex items-center flex-grow">
                              <span class="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full mr-2">{{ key }}</span>
                              <span class="text-lg font-medium text-purple-700">{{ getStepFunctionDetails(key) }}</span>
                            </div>
                            <div class="flex items-center space-x-2 flex-shrink-0">
                              <button class="text-gray-700 hover:text-gray-900" v-on:click="openInstructionForm(key)">
                                <v-lazy-image class="w-5 h-5" src="/edit_image.svg" />
                              </button>
                              <button @click="focusDeleteInstruction = key;" class="text-gray-700 hover:text-gray-900">
                                <v-lazy-image class="w-5 h-5" src="/delete_image.svg" />
                              </button>
                              <div class="flex flex-col space-y-1 flex-shrink-0">
                                <button class="text-gray-700 hover:text-gray-900" v-on:click="moveInstructionUp(key)">
                                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
                                  </svg>
                                </button>
                                <button class="text-gray-700 hover:text-gray-900" v-on:click="moveInstructionDown(key)">
                                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <!-- Form creation and submission -->
                        <div class="grid content-center place-items-center bg-[#EDE7F0]">

                            <button 
                                class="my-5 px-10 w-full text-black bg-gray-100 shadow-md hover:bg-white focus:ring-4 focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" 
                                v-on:click="openInstructionForm(0)">
                                +
                            </button>
                        </div>
                    </div>

                    <!-- Instruction forms -->
                    <div class="block bg-[#EDE7F0] px-16" v-else>
                        <div class="pb-4">
                            <div>Function</div>
                            <select v-model="assignmentFunction" class="rounded-lg p-2">
                                <option selected disabled>Please choose...</option>
                                <option value="highlight">highlight</option>
                                <option value="context">context</option>
                                <option value="connect">connect</option>
                            </select>
                        </div>
                    
                        <!-- Component -->
                        <div v-if="assignmentFunction !== 'context' && assignmentFunction !== null" class="pb-4">
                            <div for="base-input" class="text-sm font-medium text-gray-900">
                                Gogoboard's port
                            </div>
                            <select v-model="assignmentPort" class="rounded-lg p-2">
                                <option selected disabled>Gogoboard ports</option>
                                <option value="allinput">All input</option>
                                <option value="input1">input 1</option>
                                <option value="input2">input 2</option>
                                <option value="input3">input 3</option>
                                <option value="input4">input 4</option>
                                <option value="alloutput">All output</option>
                                <option value="output1">output 1</option>
                                <option value="output2">output 2</option>
                                <option value="output3">output 3</option>
                                <option value="output4">output 4</option>
                                <option value="allservo">All servo</option>
                                <option value="servo1">servo 1</option>
                                <option value="servo2">servo 2</option>
                                <option value="servo3">servo 3</option>
                                <option value="servo4">servo 4</option>
                                <option value="allcon">All configurable</option>
                                <option value="con1">configurable 1</option>
                                <option value="con2">configurable 2</option>
                                <option value="con3">configurable 3</option>
                                <option value="i2c">I2C</option>
                                <option value="chian">chian</option>
                                <option value="uart">UART</option>
                            </select>

                        </div>
                        
                        <!-- Description -->
                        <div v-if="assignmentFunction !== 'connect' && assignmentFunction !== null" class="pb-4">
                            <div for="small-input" class="text-sm font-medium text-gray-900">
                                Context
                            </div>
                            <textarea maxlength="75"v-model="assignmentContext" id="textarea" 
                            rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mb-2"></textarea>
                        </div>

                        <!-- External Component -->
                        <div v-if="assignmentFunction === 'connect' && assignmentFunction !== null" class="pb-4">
                            <div>
                                External Component
                            </div>
                            <select v-model="assignmentExternalComponent" class="rounded-lg p-2">
                                <option selected disabled>External Component</option>
                                <option value="leverswitch">Lever Switch</option>
                                <option value="button">Button</option>
                                <option value="buttonSet">Button Set</option>
                                <option value="proximity">Proximity</option>
                                <option value="lightsensor">Light Sensor</option>
                                <option value="tempsensor">Digital TEMP Sensor</option>
                                <option value="groveextension">Grove Extension</option>
                                <option value="temprelativehumidity">Temp/Relative/Humidity</option>
                                <option value="soilhumiditysensor">Soil Humidity Sensor</option>
                                <option value="led">LED</option>
                                <option value="groveterminalblock">Grove Terminal Block</option>
                                <option value="rainsensor">Rain Sensor</option>
                                <option value="motorgear">Motor Gear</option>
                                <option value="plasticwheels">Plastic wheels</option>
                                <option value="servomotor">Servo Motor</option>
                            </select>
                        </div>
                        
                        <!-- Buttons -->
                        <div class="flex justify-center">
                            <button @click="cancelInstruction" class="items-center text-white bg-[#D65F5F] hover:bg-white-800 focus:ring-4 focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 m-6 p-8">Cancel</button>
                            <button 
                                class="items-center text-white bg-[#50C878] hover:bg-white-800 focus:ring-4 focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 m-6 p-8" @click="saveInstructionForm">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Post form submission -->
        <div class="gap-8 py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6" v-else>
            <!-- 1st column -->
                <div class="object-none self-start w-325 h-325 text-center text-sm" v-if="mobileAppURL !== '' && mobileAppURL !== false ">
                    <v-lazy-image src="/tick-circle.svg" class="mx-auto mb-4"/>
                    <div class="text-lg">
                      <div class="py-6">
                		    Saved! 
                      </div>

		      <!-- QRcode -->
		      <div class="grid justify-items-center pb-6" v-if="mobileAppURL_qrcode !== false">
				    <img :src="mobileAppURL_qrcode" class="p-4 bg-[#322653]"/>
		      </div>


		      <!-- Copy to Clipboard -->
                      <div class="relative bg-[#322653] mb-6 p-2">
                        <input v-model="mobileAppURL" class="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" disabled readonly>
                        <button v-on:click="copyLink()" class="absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 bg-[#322653] hover:bg-white rounded-lg p-4 inline-flex items-center justify-center">
                          <span id="default-icon">
                            <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
                            </svg>
                          </span>
                        </button>
                      </div>

		      <!-- Back to Library -->
		      <RouterLink to="/mylibrary">
			      <button class="w-[325px] h-[80px] bg-[#322653] p-5 rounded-lg text-white text-lg hover:bg-slate-500 ">Back to Library</button>
		      </RouterLink>
                    </div>
                </div>
                <div class="object-none self-center w-325 h-325 text-center text-sm" v-else>
                    <v-lazy-image src="/error.jpg" class="mx-auto mb-4"/>
                    <p> 
                        This assignment is yet to have mobile app's URL.
                        Please create url via mobile application and try to refetch again.
                    </p>
                </div>


            <!-- 2nd column -->
                <!-- Show the instructions -->
                <div v-if="mobileAppURL !== '' && mobileAppURL !== false" class="self-start" >
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
                              <span class="text-gray-700 text-xs font-medium px-2 py-1 rounded-full mr-2">{{ key }}</span>
                              <span class="text-lg font-medium text-purple-700">{{ getStepFunctionDetails(key) }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                <div v-else>
                    <button v-on:click="getMobileAppURL()"> Re-fetch the URL</button>
                    <p>using this ID to assign the URL to the assignment: </p>
                    <div class="w-full max-w-[26rem]">
                      <div class="relative">
                        <label for="npm-install-copy-text" class="sr-only">Label</label>
                        <input v-model="assignment_id" id="npm-install-copy-text" type="text" class="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4" disabled readonly>
                        <button data-copy-to-clipboard-target="npm-install-copy-text" class="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 hover:bg-gray-100 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border">
                          <span id="default-message" class="inline-flex items-center">
                            <svg class="w-3 h-3 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
                            </svg>
                            <span class="text-xs font-semibold">Copy</span>
                        </span>
                        <span id="success-message" class="hidden inline-flex items-center">
                          <svg class="w-3 h-3 text-blue-700 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                          </svg>
                          <span class="text-xs font-semibold text-blue-700">Copied</span>   
                        </span>
                      </button>
                    </div>
                </div>
              </div>
          </div>
    </div>
</template>

<script>
import VLazyImage from "v-lazy-image";
import ImageMap from 'image-map';
import qs from 'qs';
import { useToast } from "vue-toastification";
import copy from 'copy-to-clipboard';

export default {
    components: {
      "v-lazy-image": VLazyImage
    },
    props: {
      id: String
    },
    data() {
        return {
            assignment_id: null,
            areas: [
          		{ alt: 'input1', title: 'input1', coords: "200,452,155,413", shape: 'rect' },
          		{ alt: 'input2', title: 'input2', coords: "200,454,252,409", shape: 'rect' },
          		{ alt: 'input3', title: 'input3', coords: "252,407,298,454", shape: 'rect' },
          		{ alt: 'input4', title: 'input4', coords: "299,414,349,451", shape: 'rect' },
          		{ alt: 'output1', title: 'output1', coords: "304,50,343,83", shape: 'rect' },
          		{ alt: 'output2', title: 'output2', coords: "252,44,294,79", shape: 'rect' },
          		{ alt: 'output3', title: 'output3', coords: "206,46,243,80", shape: 'rect' },
          		{ alt: 'output4', title: 'output4', coords: "155,47,196,81", shape: 'rect' }
	          ],
            areaClicked: null,
	          // boolean to view form.
            formCreating: false,
	    
	          // ar creation's instructure.
            assignmentFunction: null,
            assignmentPort: null,
            assignmentContext: null,
            assignmentExternalComponent: null,
            focusDeleteInstruction: null,
            saveConfirmationModal: false,
            finishDownload: false,

            // this value will ensure how many instruction have existed.
            currentIndex: 0,

            // POST datas
            assignmentName: "",
            description: "",
            ref_url: "",
            creator_id: "",
            steps: new Map(),
            isExist: false,

            isAssignmentSubmit: false,
            mobileAppURL: "",
      	    mobileAppURL_qrcode: ""
       };
    },
    methods: {
        showModal() {
          const modal = document.getElementById('popup-modal');
          if (modal) {
            modal.classList.remove('hidden');
          }
        },
        hideModal() {
          const modal = document.getElementById('popup-modal');
          if (modal) {
            modal.classList.add('hidden');
          }
        },
        // fetch assignment's detail
        getAssignmentDetail() {
            this.$http.get("/getassignment/" + this.assignment_id)
            .then(response => {
                const data = response.data;
                console.log(data);
                this.assignmentName = data.assignment_name;
                this.creator_mail = data.creator_email;
		            this.ref_url = data.ref_url;
                this.steps = this.objectToMap(data.steps);

                // console.log("fetched name as: " + this.assignmentName+ ", fetch creator's mail as : " + this.creator_mail);

                this.displayInstructions();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                useToast().error(error.response.data.error)
            });
        },
        // get subMap with Map's key as indicator on eaches.
        getSubValue(key, subKey) {
            if(this.steps.has(key)) {
                return this.steps.get(key).get(subKey);
            }
        },
        handleAreaClick(index) {
            this.assignmentPort = this.areas[index].alt;
            this.areaClicked = index;
        },
        displayInstructionOrder() {
          if(this.currentIndex === 0) {
             return this.getInstructionAmount() + 1;
          }
          return this.currentIndex;
        },
        // Manage Assignment's Instruction
        openInstructionForm(index) {
            // if index is zero, that's mean this is the new instruction to be created.
            this.currentIndex = index;
            this.formCreating = true;

            // if index is not a zero, the instruction presence to be edited the existing one.
            if(index > 0) {
                this.assignmentFunction = this.getSubValue(index, "function");
                this.assignmentPort = this.getSubValue(index, "port");
                this.assignmentContext = this.getSubValue(index, "context");
            }
        },
        isFormValid() {
            if(this.assignmentFunction === "highlight") {
                return (this.assignmentPort !== null) && (this.assignmentContext !== null);
            } else if (this.assignmentFunction === "connect") {
                return (this.assignmentPort !== null) && (this.assignmentExternalComponent !== null);
            } else if(this.assignmentFunction === "context") {
                return this.assignmentContext !== null;
            } 
        },
        closeInstruction() {
            // prevent unexpected error for next operation.
            this.formCreating = false;
            this.assignmentFunction = null;
            this.assignmentPort = null;
            this.assignmentContext = null;
            this.assignmentExternalComponent = null;
            this.currentIndex = 0;
        },
        cancelInstruction() {
            useToast().error("Instruction Cancelled.");
            this.closeInstruction();
        },
        saveInstructionForm() {
            var elementIndex = this.currentIndex;
            
            if(!this.isFormValid) {
                return useToast().error("Please complete the detail propery.");
            }
            
            // element is a zero, proceed to create the new instruction.
            if (elementIndex === 0) {
                elementIndex = this.getInstructionAmount() + 1;
            }

            let stepsInfo = new Map();
            stepsInfo.set("function", this.assignmentFunction);
            
            if(this.assignmentFunction === "highlight") {
                stepsInfo.set("component", this.assignmentPort);
                stepsInfo.set("context", this.assignmentContext);
            } else if (this.assignmentFunction === "connect") {
                stepsInfo.set("component", this.assignmentPort);
                stepsInfo.set("externalComponent", this.assignmentExternalComponent);
            } else {
                stepsInfo.set("context", this.assignmentContext);
            }

            // add map element
            this.steps.set(elementIndex, stepsInfo);
            useToast().success("Instruction Created");
            // reset values in form.
            this.closeInstruction();
        },
        displayInstructions() {
            // display the map as object
            function mapToObject(map) {
                const out = {};
                map.forEach((value, key) => {
                    out[key] = value instanceof Map ? mapToObject(value) : value;
                });
                return out;
            }

            const stepsObject = mapToObject(this.steps);
            console.log(JSON.stringify({steps: stepsObject}, null, 2));
        },
        getInstructionAmount() {
            return this.steps.size;
        },
        // delete existing steps
        deleteInstruction(key) {
            this.steps.delete(key);
            
            // reassign the order of all instructions.
            if(this.steps.size > 0) {
              this.reassignKeys();
            }
            useToast().info('instruction deleted.');
            this.focusDeleteInstruction = 0;
        },
        reassignKeys() {
            const newSteps = new Map();
            let index = 1;
            this.steps.forEach((value) => {
                newSteps.set(index, value);
                index++;
            });
            this.steps = newSteps;
        },
        moveInstructionUp(key) {
            // the indicated key won't be the first and not the only one
            const entries = Array.from(this.steps.entries());
            const index = entries.findIndex(entry => entry[0] === key);
            if (index > 0) { // Ensure there is a previous item to swap with
                [entries[index], entries[index - 1]] = [entries[index - 1], entries[index]]; // Swap with previous
                this.steps = new Map(entries.map(([k, v], i) => [i + 1, v])); // Convert array back to Map
            }
        },
        moveInstructionDown(key) {
          const entries = Array.from(this.steps.entries());
          const index = entries.findIndex(entry => entry[0] === key);
          // Ensure the current item is not the last one
          if (index < entries.length - 1) {
            // Swap current item with the next item
            const temp = entries[index + 1];
            entries[index + 1] = entries[index];
            entries[index] = temp;

            // Re-construct the map directly from the updated entries
            const newSteps = new Map();
            entries.forEach(([k, v], i) => {
                newSteps.set(i + 1, v);
            });
            this.steps = newSteps;
          }
        },
        submitAssignment() {
            // Close confirmation modal.
            this.saveConfirmationModal = false;
            
            if(this.assignmentName === null || this.assignmentName === "" || this.getInstructionAmount === 0) {
              return useToast().error("Please complete the Assignment ID or create the instruction atleast one.");
            }
            // convert the "steps" map into nested object
            let stepsObject = {};
            this.steps.forEach((subMap, key) => {
                let subMapObject = {};
                subMap.forEach((value, subKey) => {
                    subMapObject[subKey] = value;
                });
                stepsObject[key] = subMapObject;
            });

            let data = {
                "assignment_name": this.assignmentName,
                "creator_id": this.creator_id,
                "description": this.description,
                "ref_url": this.ref_url,
                "steps": JSON.stringify(stepsObject)
            };
	          
            const jwtToken = JSON.parse(localStorage.getItem('userInfo')).token; 
            // console.log(jwtToken);
            const config = {
              headers: { 
                'Authorization': `Bearer ${jwtToken}`
              }
            };

            // Edit the assignment in database.
            if(this.isExist) {
                this.$http.put("/modify/"+this.assignment_id, qs.stringify(data), config)
                    .then(response => {
                        useToast().success("edit completed.");
                        this.getMobileAppURL();
                  			this.getMobileAppQRCode();
                    })
                    .catch(error => {
                        useToast().error(error.response.data.message);
                    });    
            } else {
		          this.$http.post("create", qs.stringify(data), config)
                    .then(response => {
                        useToast().success("assignment creating completed.");
                  			this.assignment_id = response.data;
                        this.getMobileAppURL();
                  			this.getMobileAppQRCode();
                    })
                    .catch(error => {
                        useToast().error(error.response.data.message);
                    });
            }
        },
        // Return them as text for overall displays.
        getStepFunctionDetails(index) {
          // Convert the step number to a string if it's passed as a number
          const step = this.steps.get(index);
          let stepInfo = "";
          console.log(typeof step + "\n" + step);
          if (step) {
            console.log(`Details of step ${index}:`);
            for (let [key, value] of step.entries()) {
              if (value instanceof Map) {
                  for (let [subKey, subValue] of value.entries()) {
                      stepInfo += `| ${subKey}: ${subValue} `;
                      console.log(`${subKey}: ${subValue}`);
                  }
              } else {
                  stepInfo += `| ${key}: ${value} `;
                  console.log(`${key}: ${value}`);
              }
            }
            return stepInfo;
          } else {
            console.log(`Step ${index} not found.`);
          }
        },
        objectToMap(obj) {
          const result = new Map();
          Object.keys(obj).forEach(key => {
            const value = obj[key];
            console.log(`Key: ${key}, Type of value: ${typeof value}, Value: ${JSON.stringify(value, null, 2)}`);
        
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
        resizeImageMaps() {
          ImageMap('img[usemap]');
        },
        async copyLink() {
          try {
            await copy(this.mobileAppURL);
            useToast().success("Copied");
          } catch($e) {
            useToast().error('Cannot copy: ' + $e);
          }
        },
	getMobileAppQRCode() {
		this.$http.get("/getqrcode/" + this.assignment_id)
			.then((response) => {
				this.mobileAppURL_qrcode = response.data;
			})
			.catch((err) => {
				useToast().error(err.response.data.error);
			});
	}
    },
    mounted() {
        this.resizeImageMaps();
    },
    created() {
        if (this.id) {
            this.assignment_id = this.id;
            this.getAssignmentDetail();
            this.isExist = true;
        }

        this.creator_id = JSON.parse(localStorage.getItem('userInfo'))._id;
    }
};
</script>

<style>
rect.hoverable
{
    fill: transparent;
    stroke:gray; /* Replace with none if you like */
    stroke-width: 4;
    cursor: pointer;
}

rect.hoverable:hover
{
    fill:black;   
}
</style>
