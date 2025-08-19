<template>
  <section class="min-h-screen">
    <!-- Delete Assignment Modal -->
    <div
      v-if="idToDelete !== null"
      class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden w-full bg-black/50"
    >
      <div class="relative p-4 w-screen max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow-2xl">
          <button
            @click="idToDelete = null"
            type="button"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="p-4 md:p-5 text-center">
            <svg
              class="mx-auto mb-4 text-gray-400 w-12 h-12"
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
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 class="mb-5 text-lg font-normal text-gray-500">
              Are you sure you want to Delete this assignment?
            </h3>
            <button
              @click="deleteAssignment(idToDelete)"
              type="button"
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              Yes, I'm sure
            </button>
            <button
              @click="idToDelete = null"
              type="button"
              class="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="assignments.length == 0"
      class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16"
    >
      <h1
        class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl"
      >
        You haven't create any course
      </h1>
      <p
        class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48"
      >
        You can start to create one right here.
      </p>
      <div
        class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0"
      >
        <a
          href="/assignmentcreation"
          class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          Get started
          <svg
            class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
        <a
          href="/"
          class="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-70"
        >
          Learn more
        </a>
      </div>
    </div>

    <!-- If creator's assignment is present -->
    <div v-else class="py-4 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
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
            placeholder="Filter By Name..."
            required
            :readonly="nameFilter"
          />
        </div>
        <!-- Filter operations buttons -->
        <div v-show="!nameFilter" class="flex justify-center mx-auto">
          <button
            @click="setNameFilter()"
            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
          >
            Name
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
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="m11.25 4.75-6.5 6.5m0-6.5 6.5 6.5"></path>
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
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 border-[#322653]">
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
            <tbody class="border-[#322653]">
              <tr
                class="bg-white border-b"
                v-for="assignment in assignments"
                :key="assignment._id"
                v-show="isValidFilter(assignment.assignment_name)"
              >
                <!-- Name -->
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {{ assignment.assignment_name }}
                  <span class="text-gray-400 text-sm">
                    {{ assignment.description }}
                  </span>
                </th>

                <!-- Created Date -->
                <td class="px-6 py-4">{{ assignment.modified_date }}</td>

                <!-- App URL -->
                <td class="px-6 py-4">{{ assignment.mobileapp_url }}</td>

                <!-- Reference -->
                <td class="px-6 py-4">{{ assignment.ref_url }}</td>

                <!-- View Assignment -->
                <td class="text-right">
                  <!-- Buttons Row -->
                  <div class="flex justify-center mx-auto my-2">
                    <!-- Edit Button -->
                    <router-link
                      :to="{ path: '/assignmentcreation/' + assignment._id }"
                    >
                      <h5
                        class="w-[62px] h-[62px] border border-black inline-flex items-center px-5 py-4 text-sm font-medium text-center text-white rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300"
                      >
                        <v-lazy-image
                          class="w-5 h-5 md-5 pd-5"
                          src="/edit_image.svg"
                        />
                      </h5>
                    </router-link>
                    <!-- Remove Button -->
                    <button v-on:click="idToDelete = assignment._id">
                      <h5
                        class="w-[62px] h-[62px] border border-black inline-flex items-center px-5 py-4 text-sm font-medium text-center text-white rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300"
                      >
                        <v-lazy-image
                          class="w-5 h-5 md-5 pd-5"
                          src="/delete_image.svg"
                        />
                      </h5>
                    </button>
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
          v-bind:key="assignment"
          v-for="assignment in assignments"
          v-show="isValidFilter(assignment.assignment_name)"
        >
          <!-- Topic -->
          <div class="max-w-sm h-full p-6 bg-white border border-gray-200 rounded-lg shadow">
            <h2>{{ assignment.assignment_name }}</h2>

            <!-- Description -->
            <p class="font-normal text-sm text-gray-700 whitespace-pre-line">
              {{ assignment.description ? assignment.description : "\n"}}
            </p>

            <!-- URL -->
            <p
              class="font-normal text-gray-500"
              v-if="assignment.mobileapp_url != null"
            >
              <a :href="assignment.mobileapp_url">the assignment url</a>
            </p>

            <p class="font-normal text-gray-500 pb-8">
              {{ assignment.modified_date }}
            </p>

            <!-- Buttons Row -->
            <div class="flex justify-end space-x-2 mt-4">
              <!-- Edit Button -->
              <router-link
                :to="{ path: '/assignmentcreation/' + assignment._id }"
              >
                <h5
                  class="border border-black inline-flex items-center px-5 py-4 text-sm font-medium text-center text-white rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  <v-lazy-image
                    class="w-5 h-5 md-5 pd-5"
                    src="/edit_image.svg"
                  />
                </h5>
              </router-link>
              <!-- Remove Button -->
              <button v-on:click="idToDelete = assignment._id">
                <h5
                  class="border border-black inline-flex items-center px-5 py-4 text-sm font-medium text-center text-white rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  <v-lazy-image
                    class="w-5 h-5 md-5 pd-5"
                    src="/delete_image.svg"
                  />
                </h5>
              </button>
            </div>
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
      idToDelete: null,

      isTableView: true, // display as Card in false values.

      inputFilter: "",
      nameFilter: null,

      isNameAscend: true,
      isDateAscend: true,
    };
  },
  created: function () {
    this.emitter.emit("restrict-unauthorize");
    this.fetchAssignment();
  },
  methods: {
    fetchAssignment() {
      this.$http
        .get(
          "/getassignmentbyuser/" +
            JSON.parse(localStorage.getItem("userInfo"))._id,
        )
        .then((response) => {
          const assignments = response.data;

          // declare each assignment's date created.
          for (let assignment of assignments) {
            assignment.modified_date = this.formatDate(
              assignment.modified_date ?? assignment.created_date,
            );
          }

          this.assignments = assignments;
        });
    },

    deleteAssignment(id) {
      const jwtToken = JSON.parse(localStorage.getItem("userInfo")).token;

      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      this.$http
        .delete("/delete/" + id, config)
        .then((response) => {
          this.assignments = this.assignments.filter(
            (assignment) => assignment._id !== id,
          );
          this.idToDelete = null;
        })
        .catch((error) => {
          var errMsg = error.response.data.message.toString();
          if (
            errMsg === "No token Received." ||
              errMsg === "Outdated or Invalid token"
          ) {
            this.emitter.emit("signout");
            this.$router.replace({ path: "/signin" });
          }
          console.error("Error deleting the assignment", errMsg);
        });
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
      } else {
        this.isDateAscend = !this.isDateAscend;
      }

      // multiply the sort result to return both as ascending value and descending value.
      const absVal = (-1) ** isAcdn * -1;

      this.assignments.sort((a, b) => {
        let valA;
        let valB;

        // type to be sort could be name, date.
        if (type === "name") {
          valA = a.assignment_name.toLowerCase().replace(/\s/g, "");
          valB = b.assignment_name.toLowerCase().replace(/\s/g, "");
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

    cancelFilter() {
      this.nameFilter = null;
    },

    clearFilter() {
      this.inputFilter = null;
      this.cancelFilter();
    },

    isValidFilter(name) {
      const filtering = name.toLowerCase().replace(/\s/g, "");

      if (
        this.nameFilter &&
          filtering.includes(this.nameFilter.toLowerCase().replace(/\s/g, ""))
      ) {
        return true;
      } else if (!this.nameFilter) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
