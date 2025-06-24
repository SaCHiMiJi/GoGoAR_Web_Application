<template>
  <section class="min-h-screen">
    <div
      v-show="assignments.length > 0"
      class="py-4 px-4 mx-auto max-w-screen-xl text-center lg:py-16"
    >
      <h1
        class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-5xl"
      >
        Our discovery here
      </h1>

      <!-- Introduction text -->
      <p
        class="text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 pb-8"
      >
        You can view the other course's instructions and URL application.
      </p>

      <!-- search filter bar -->
      <div class="max-w-md mx-auto">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only"
        >Search</label
        >
        <div class="relative mb-4">
          <div
            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <svg
              class="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            v-model="inputFilter"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Filter By Name or Creator..."
            required
            :readonly="nameFilter || creatorFilter"
          />
        </div>
        <!-- Filter operations buttons -->
        <div v-show="!nameFilter && !creatorFilter">
          <button
            @click="setNameFilter()"
            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Name
          </button>
          <button
            @click="setCreatorFilter()"
            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Creator
          </button>
        </div>
        <div v-show="nameFilter" class="flex justify-center mx-auto">
          <button
            @click="clearFilter()"
            class="flex justify-center items-center text-white bg-red-700 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 hover:text-black"
          >
            <span>Name</span>
            <svg
              class="w-4 h-4 ml-2"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path d="m11.25 4.75-6.5 6.5m0-6.5 6.5 6.5" />
              </g>
            </svg>
          </button>
        </div>
        <div v-show="creatorFilter" class="flex justify-center mx-auto">
          <button
            @click="clearFilter()"
            class="flex justify-center items-center text-white bg-red-700 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 hover:text-black"
          >
            <span>Creator</span>
            <svg
              class="w-4 h-4 ml-2"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path d="m11.25 4.75-6.5 6.5m0-6.5 6.5 6.5" />
              </g>
            </svg>
          </button>
        </div>
      </div>

      <!-- toggle view button -->
      <div class="flex justify-end rounded-md" role="group">
        <button
          @click="isTableView = true"
          class="p-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M1 4h14v2H1zM1 7h14v2H1zM1 10h14v2H1z" />
          </svg>
        </button>
        <button
          @click="isTableView = false"
          class="p-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M2 2h4v4H2zM10 2h4v4h-4zM2 10h4v4H2zM10 10h4v4h-4z" />
          </svg>
        </button>
      </div>

      <!-- Table view -->
      <div
        v-if="isTableView"
        class="py-2 mx-auto max-w-screen-2xl text-center lg:py-8"
      >
        <div class="relative overflow-x-auto sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead class="text-l text-white uppercase bg-[#322653]">
              <!-- Topic -->
              <tr>
                <th scope="col" class="px-6 py-3">
                  <div
                    @click="sortAscending('name', !isNameAscend)"
                    class="p-2 flex items-center hover:text-[#322653] hover:bg-white"
                  >
                    Name
                    <a>
                      <svg
                        class="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
                        />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div
                    @click="sortAscending('creator', !isCreatorAscend)"
                    class="p-2 flex items-center hover:text-[#322653] hover:bg-white"
                  >
                    Creator
                    <a>
                      <svg
                        class="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
                        />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div
                    @click="sortAscending('date', !isDateAscend)"
                    class="p-2 flex items-center hover:text-[#322653] hover:bg-white"
                  >
                    Modified
                    <a>
                      <svg
                        class="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"
                        />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">App URL</div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">Reference</div>
                </th>

                <th scope="col" class="px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>

            <!-- Content -->
            <tbody>
              <tr
                class="bg-white border-b"
                v-for="assignment in assignments"
                :key="assignment._id"
                v-show="
                isValidFilter(
                  assignment.assignment_name,
                  assignment.creator_name,
                )
                "
              >
                <!-- Name -->
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap truncate"
                >
                  {{ assignment.assignment_name }}
                  <span class="text-gray-400 text-sm">{{
                    assignment.description.length > 25
                      ? assignment.description.substring(0, 25) + "..."
                      : assignment.description
                    }}</span>
                </th>

                <!-- Creator -->
                <td class="px-6 py-4">
                  {{ assignment.creator_name || "Loading..." }}
                </td>

                <!-- Created Date -->
                <td class="px-6 py-4">{{ assignment.modified_date }}</td>

                <!-- App URL -->
                <td class="px-6 py-4">{{ assignment.mobileapp_url }}</td>

                <!-- Reference -->
                <td class="px-6 py-4">{{ assignment.ref_url }}</td>

                <!-- View Assignment -->
                <td class="px-6 py-4 text-right">
                  <div class="flex justify-center">
                    <router-link
                      :to="{ path: '/assignmentview/' + assignment._id }"
                    >
                      <div
                        class="w-[56px] h-[56px] p-2 text-sm font-medium flex items-center text-black bg-white border border-black rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-eye mx-auto"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
                          />
                          <path
                            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                          />
                        </svg>
                      </div>
                    </router-link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Card View -->
      <div
        v-else
        class="grid gap-4 m-10"
        style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))"
      >
        <div
          class="form-row align-items-center text-left"
          v-for="assignment in assignments"
          :key="assignment._id"
          v-show="
          isValidFilter(assignment.assignment_name, assignment.creator_name)
          "
        >
          <div
            class="max-w-sm h-full p-6 bg-white border border-gray-200 rounded-lg shadow"
          >
            <h2>{{ assignment.assignment_name }}</h2>

            <p class="font-normal text-sm text-gray-700">
              {{ assignment.description }}
            </p>

            <p class="font-normal text-gray-500">
              <a :href="assignment.mobileapp_url">The assignment URL</a>
            </p>

            <p class="font-normal text-gray-700">
              Creator: {{ assignment.creator_name || "Loading..." }}
            </p>

            <p class="font-normal text-gray-500 pb-8">
              {{ assignment.modified_date }}
            </p>

            <div class="flex justify-end mt-2">
              <router-link :to="{ path: '/assignmentview/' + assignment._id }">
                <div
                  class="w-[62px] h-[62px] p-4 text-sm font-medium flex items-center text-black bg-white border border-black rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-eye mx-auto"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
                    />
                    <path
                      d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
                    />
                  </svg>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Display on no assignments presented -->
    <div
      v-show="assignments.length === 0"
      class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16"
    >
      <h1
        class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl"
      >
        There are no courses at the moment.
      </h1>
      <p
        class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48"
      >
        Wait for others to create one.
      </p>
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
      isTableView: true, // display as Card in false values.
      isLoad: true,

      inputFilter: "",
      nameFilter: null,
      creatorFilter: null,

      isNameAscend: true,
      isCreatorAscend: true,
      isDateAscend: true,
    };
  },
  created() {
    this.fetchAssignments();
  },
  methods: {
    async getCreatorName(creatorID) {
      try {
        const response = await this.$http.get("/getcreatorname/" + creatorID);
        return response.data;
      } catch (error) {
        console.error("Error fetching creator name:", error);
        return "Unknown";
      }
    },
    async fetchAssignments() {
      try {
        const response = await this.$http.get("/getall");
        const assignments = response.data;

        // Fetch and assign creator names
        for (let assignment of assignments) {
          assignment.modified_date = this.formatDate(
            assignment.modified_date ?? assignment.created_date,
          );
        }

        this.assignments = assignments;
        this.isLoad = false;
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    },
    formatDate(dateStr) {
      const date = new Date(dateStr);

      // Extract the year, month, and day
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // getUTCMonth() returns month from 0-11, so add 1
      const day = String(date.getUTCDate()).padStart(2, "0");

      // Format the date as YYYY-MM-DD
      return `${year}-${month}-${day}`;
    },

    sortAscending(type, isAcdn) {
      if (this.isLoad) return;

      // update ascending value
      if (type === "name") {
        this.isNameAscend = !this.isNameAscend;
      } else if (type === "creator") {
        this.isCreatorAscend = !this.isCreatorAscend;
      } else {
        this.isDateAscend = !this.isDateAscend;
      }

      // multiply the sort result to return both as ascending value and descending value.
      const absVal = (-1) ** isAcdn * -1;

      this.assignments.sort((a, b) => {
        let valA;
        let valB;

        // type to be sort could be name, creator, date.
        if (type === "name") {
          valA = a.assignment_name.toLowerCase().replace(/\s/g, "");
          valB = b.assignment_name.toLowerCase().replace(/\s/g, "");
        } else if (type === "creator") {
          valA = a.creator_name.toLowerCase();
          valB = b.creator_name.toLowerCase();
        } else {
          valA = a.modified_date.toLowerCase();
          valB = b.modified_date.toLowerCase();
        }

        if (valA < valB) {
          return -1 * absVal;
        }
        if (valA > valB) {
          return 1 * absVal;
        }
        // remain the same.
        return 0;
      });
    },
    setNameFilter() {
      this.cancelFilter();
      this.nameFilter = this.inputFilter;
    },
    setCreatorFilter() {
      this.cancelFilter();
      this.creatorFilter = this.inputFilter;
    },
    cancelFilter() {
      this.nameFilter = null;
      this.creatorFilter = null;
    },
    clearFilter() {
      this.inputFilter = null;
      this.cancelFilter();
    },
    isValidFilter(name, creator) {
      const nameFilts = name.toLowerCase().replace(/\s/g, "");
      const creatorFilts = creator.toLowerCase().replace(/\s/g, "");

      if (
        this.nameFilter &&
          nameFilts.includes(this.nameFilter.toLowerCase().replace(/\s/g, ""))
      ) {
        return true;
      } else if (
        this.creatorFilter &&
          creatorFilts.includes(
            this.creatorFilter.toLowerCase().replace(/\s/g, ""),
          )
      ) {
        return true;
      } else if (!this.nameFilter && !this.creatorFilter) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
