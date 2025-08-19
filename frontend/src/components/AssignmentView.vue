<template>
  <div class="align-self-center;">
    <!-- view assignment's details and instructions -->
    <div
      class="mx-auto gap-8 items-start py-8 px-4 xl:gap-16 sm:grid md:grid md:grid-cols-2 lg:px-6 max-h-screen-xl max-w-screen-2xl"
      v-if="detailView" >
      <!-- Image container on 1st column -->
      <!-- class="sm:relative sm:flex-grow sm:flex sm:flex-col sm:items-center sm:justify-center sm:self-start" -->
      <div class="object-center mx-auto">
        <div class="">
          <v-lazy-image
            class="object-none self-center"
            src="/gogoboard.png"
            usemap="#image_map"
          />
          <!-- view the assignment's url -->
          <div class="flex justify-center mt-4">
            <button class="p-12 px-5 py-2.5 text-white bg-[#50C878] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm focus:outline-none"
              v-on:click="detailView=!detailView; getMobileAppURL();">
              Assignment URL
            </button>
          </div>
        </div>
      </div>

      <!-- Form container on 2nd column -->
      <div class="items-start">
        <!-- Assignment name -->
        <div class="bg-[#322653] rounded-md p-8">
          <div v-if="formCreating" class="flex justify-end">{{ displayInstructionOrder() }}</div>

          <label
            for="large-input"
            class="block mb-2 text-sm font-medium text-white"
            >Assignment Name</label>
          <input
            v-model="assignmentName"
            type="text"
            id="large-input"
            class="block w-full p-4 mb-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
            readonly/>
          <!-- Description -->
          <label
            for="large-input"
            class="block mb-2 text-sm font-medium text-white"
            >Description</label
          >
          <input
            v-model="description"
            type="text"
            id="large-input"
            class="block w-full p-4 mb-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
            readonly
          />

          <!-- Assignment Reference URL -->
          <label
            for="large-input"
            class="block mb-2 text-sm font-medium text-white"
            >Reference Link</label
          >
          <input
            v-model="ref_url"
            type="text"
            id="large-input"
            class="block w-full p-4 mb-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
            readonly
          />
        </div>

        <div class="mb-5 bg-[#EDE7F0] rounded-md p-8">
          <!-- Instruction View page -->
          <div>
            <div v-for="[key] in steps" :key="key">
              <div
                class="p-4 bg-gray-100 rounded-lg shadow-md flex items-center justify-between mb-2"
              >
                <div class="flex items-center">
                  <span
                    class="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full mr-2"
                    >{{ key }}</span
                  >
                  <span class="text-lg font-medium text-purple-700">{{
                    getStepFunctionDetails(key)
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- preview assignment's mobile url -->
    <div
      class="gap-8 items-start py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6"
      v-else
    >
      <!-- 1st column -->
      <div class="relative">
        <div
          v-if="mobileAppURL !== '' && mobileAppURL !== false"
          class="text-center"
        >
          <v-lazy-image src="/tick-circle.svg" class="mx-auto mb-4" />
          <div class="pb-6">Preview this Assignment.</div>

          <!-- QRcode -->
          <div
            class="grid justify-items-center pb-6"
            v-if="mobileAppURL_qrcode !== false"
          >
            <img :src="mobileAppURL_qrcode" class="bg-[#322653] p-4" />
          </div>

          <!-- Copy to Clipboard -->
          <!-- Preview Link -->
          <div class="mb-2"> Preview URL </div>
          <div class="relative bg-[#322653] mb-6 p-2">
            <input
              v-model="mobileAppURL"
              class="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              disabled
              readonly/>
            <button v-on:click="copyLink(mobileAppURL)"
              class="absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 bg-[#322653] hover:bg-white rounded-lg p-4 inline-flex items-center justify-center">
              <span id="default-icon">
                <svg
                  class="w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20">
                  <path
                    d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"
                  />
                </svg>
              </span>
            </button>
          </div>
          <!-- ID copy -->
          <div class="mb-2"> Assignment ID </div>
          <div class="relative bg-[#322653] mb-6 p-2">
            <input
              v-model="assignment_id"
              class="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              disabled
              readonly
            />
            <button
              v-on:click="copyLink(assignment_id)"
              class="absolute end-2 top-1/2 -translate-y-1/2 text-gray-500 bg-[#322653] hover:bg-white rounded-lg p-4 inline-flex items-center justify-center"
            >
              <span id="default-icon">
                <svg
                  class="w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path
                    d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"
                  />
                </svg>
              </span>
            </button>
          </div>

          <div>
            <!-- view the assignment's detail -->
            <button
              class="px-5 py-2.5 me-8 text-md text-white font-medium rounded-lg
              bg-[#50C878] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none"
              v-on:click="detailView = !detailView">
              Assignment Detail
            </button>

            <!-- navigate to the link -->
            <button
              class="mb-16 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              @click="redirectToLink()">
              Try Now
            </button>
          </div>
        </div>

        <div v-else class="text-center">
          <v-lazy-image class="mx-auto mb-4" src="/error.jpg" />
          <div>
            This assignment doesn't have an app's URL yet, Please wait for the
            author to add this app later.
          </div>
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

            <label
              for="large-input"
              class="block mb-2 text-sm font-medium text-white"
              >Assignment Name</label
            >
            <input
              v-model="assignmentName"
              type="text"
              id="large-input"
              class="block w-full p-4 mb-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
              readonly
            />
            <!-- Description -->
            <label
              for="large-input"
              class="block mb-2 text-sm font-medium text-white"
              >Description</label
            >
            <input
              v-model="description"
              type="text"
              id="large-input"
              class="block w-full p-4 mb-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
              readonly
            />

            <!-- Assignment Reference URL -->
            <label
              for="large-input"
              class="block mb-2 text-sm font-medium text-white"
              >Reference Link</label
            >
            <input
              v-model="ref_url"
              type="text"
              id="large-input"
              class="block w-full p-4 mb-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
              readonly
            />
          </div>

          <div class="mb-5 bg-[#EDE7F0] rounded-md p-8">
            <!-- Instruction View page -->
            <div>
              <div v-for="[key] in steps" :key="key">
                <div
                  class="p-4 bg-gray-100 rounded-lg shadow-md flex items-center justify-between mb-2"
                >
                  <div class="flex items-center">
                    <span
                      class="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full mr-2"
                      >{{ key }}</span
                    >
                    <span class="text-lg font-medium text-purple-700">{{
                      getStepFunctionDetails(key)
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- if assignment URL is absent, let the user manually fetch the data -->
        <div v-else class="text-center">
          <button
            v-on:click="getMobileAppURL()"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
          >
            Re-fetch the URL
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VLazyImage from "v-lazy-image";
import { useToast } from "vue-toastification";
import copy from "copy-to-clipboard";

export default {
  components: {
    "v-lazy-image": VLazyImage,
  },
  props: {
    id: String,
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
      mobileAppURL: "",
      mobileAppURL_qrcode: "",
    };
  },
  methods: {
    // fetch assignment's detail
    getAssignmentDetail() {
      this.$http
        .get("/getassignment/" + this.assignment_id)
        .then((response) => {
          const data = response.data;
          this.assignmentName = data.assignment_name;
          this.description = data.description;
          this.creator_id = data.creator_id;
          this.ref_url = data.ref_url;
          (this.mobileAppURL = data.mobileapp_url),
            (this.steps = this.objectToMap(data.steps));

          // this.displayInstructions();
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    // get subMap with Map's key as indicator on eaches.
    getSubValue(key, subKey) {
      if (this.steps.has(key)) {
        return this.steps.get(key).get(subKey);
      }
    },
    displayInstructionOrder() {
      if (this.currentIndex === 0) {
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
        for (let [key, value] of step.entries()) {
          stepInfo += `| ${value} `;
        }
        return stepInfo;
      } else {
        console.error(`Step ${index} not found.`);
      }
    },
    // the object receive from API server are mixed object, this view convert the object to map values.
    objectToMap(obj) {
      const result = new Map();
      Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (
          value &&
          typeof value === "object" &&
          !Array.isArray(value) &&
          value !== null
        ) {
          result.set(key, this.objectToMap(value)); // Recursively convert nested objects
        } else {
          result.set(key, value);
        }
      });
      return result;
    },
    getMobileAppURL() {
      this.isAssignmentSubmit = true;
      this.$http
        .get("/getredirectionurl/" + this.assignment_id)
        .then((response) => {
          this.mobileAppURL = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getQRCode() {
      this.$http
        .get("/getqrcode/" + this.assignment_id)
        .then((response) => {
          this.mobileAppURL_qrcode = response.data;
        })
        .catch((err) => {
          console.error(err.toString());
        });
    },
    copyLink(content) {
      try {
        copy(content);
        useToast().success("Copied");
      } catch ($e) {
        useToast().error("Cannot copy: " + $e);
      }
    },
    redirectToLink() {
      window.location.href = this.mobileAppURL;
    },
  },
  created() {
    if (this.id) {
      this.assignment_id = this.id;
      this.getAssignmentDetail();
      this.getQRCode();
      this.isExist = true;
    } else {
      console.error("Couldn't get the parameter");
    }
  },
};
</script>
