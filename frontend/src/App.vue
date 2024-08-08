<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();
})
</script>

<template>
  <div id="app">
    <nav class="bg-[#322653] border-gray-200 sticky top-0 z-[100]">
      <div class="w-full flex flex-wrap items-center justify-between p-4">
        <!-- Left Logo -->
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/weblogo.svg" class="h-[54px]" alt="Gogoboard Logo" />
        </a>

        <!-- Dropdown on mobile device -->
        <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>

        <!-- Navigation Buttons -->
        <div class="hidden w-full md:block md:w-auto flex flex-col" id="navbar-default">
          <RouterLink to="/discovery">
            <button class="mx-4 text-white bg-[#322653] hover:bg-white hover:text-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none">Discovery</button>
          </RouterLink>

          <!-- Available Page for Authenticated User -->
          <RouterLink to="/signup" v-show="!userInfo">
            <button class="mx-4 text-white bg-[#322653] hover:bg-white hover:text-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none">Sign Up</button>
          </RouterLink>
          <RouterLink to="/signin" v-show="!userInfo">
            <button class="mx-4 text-white bg-[#322653] hover:bg-white hover:text-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none">Sign In</button>
          </RouterLink>

          <!-- Authenticated User Options -->
          <RouterLink v-show="userInfo" to="/assignmentcreation">
            <button class="mx-4 text-white bg-[#322653] hover:bg-white hover:text-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none">AR creation</button>
          </RouterLink>
          <RouterLink v-show="userInfo" to="/mylibrary">
            <button class="mx-4 text-white bg-[#322653] hover:bg-white hover:text-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none">My Library</button>
          </RouterLink>

          <button v-if="userInfo"
          @click="toggleDropdown" ref="button" type="button" class="mx-4 border-2 border-white text-white bg-[#322653] hover:bg-white hover:text-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none" id="user-menu-button" aria-expanded="false">
            <span class="sr-only">Open user menu</span>
            {{ getCreatorName() }}
          </button>
          <!-- Dropdown menu -->
          <div :class="{'hidden': !isDropdownOpen, 'block': isDropdownOpen}" ref="dropdown" class="absolute right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow" id="user-dropdown">
            <div class="px-4 py-3">
              <span class="block text-sm text-gray-900">{{ getCreatorName() }}</span>
              <span class="block text-sm text-gray-500 truncate">{{ getCreatorEmail() }}</span>
            </div>
            <ul class="py-2" aria-labelledby="user-menu-button">
              <li>
                <RouterLink to="/resetpassword">
                  <button class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">Reset Password</button>
                </RouterLink>
              </li>
              <li>
                <button @click="openModal" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">Sign Out</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Sign out Modal -->
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden w-full bg-black/50">
        <div class="relative p-4 w-screen max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow-2xl">
            <button @click="closeModal" type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="p-4 md:p-5 text-center">
              <svg class="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
              <h3 class="mb-5 text-lg font-normal text-gray-500">Are you sure you want to sign out?</h3>
              <button @click="signOut" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                Yes, I'm sure
              </button>
              <button @click="closeModal" type="button" class="py-2.5 px-5 ml-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDropdownOpen: false,
      isModalOpen: false,
      userInfo: null,
    };
  },
  created() {
    this.checkUser();
    this.emitter.on("check-user", () => {
    	this.checkUser();
    });
    this.emitter.on("restrict-unauthorize", () =>{
	    if(localStorage.getItem('userInfo') === null) {
    		this.router.replace({ path:"/login" });
    	}
    });
  },
  methods: {
   toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    signOut() {
      this.$router.replace({ path:"/" });
      this.isDropdownOpen = false;
      this.closeModal();
      localStorage.removeItem('userInfo');
      this.userInfo = null;
    },
    checkUser() {
      const storedUserInfo = localStorage.getItem('userInfo');
      this.userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
    },
    handleClickOutside(event) {
      const dropdown = this.$refs.dropdown;
      const button = this.$refs.button;
      if(dropdown && button) {
        if (!dropdown.contains(event.target) && !button.contains(event.target)) {
          this.isDropdownOpen = false;
        }
      }
    },
    getCreatorEmail() {
      if(!this.userInfo) {
        return '';
      }

      return this.userInfo.creator_email;
    },
    getCreatorName() {
      if(!this.userInfo) {
        return '';
      }

      return this.userInfo.creator_username;
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>
