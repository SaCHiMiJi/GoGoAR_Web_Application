<template>
  <div id="app">
    <nav class="bg-[#322653] border-gray-200">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      	<!-- Left Logo -->
      	<a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        	<img src="/weblogo.svg" class="h-8" alt="Gogoboard Logo" />
	</a>

      	<!-- Dropdown on mobile -->
        <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>

        <!-- Navigation Buttons -->
	<div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            
	    <RouterLink to="/">
	    	<button class="justify justify-items-center text-white bg-[#322653] hover:bg-white hover:text-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">My Discovery</button>
	    </RouterLink>

	    <!-- Available Page for Authenticated User -->
	    <ul v-if="!userInfo">
	    	    <RouterLink to="/signup">
        		    <button class="justify justify-items-center text-white bg-[#322653] hover:bg-white hover:text-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">Sign Up</button>
	            </RouterLink>

		    <RouterLink to="/signin">
        	    	<button class="justify justify-items-center text-white bg-[#322653] hover:bg-white hover:text-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">Sign In</button>
	            </RouterLink>
	    </ul>
	    <!-- Sign out -->
	    <ul v-else>
	    	<RouterLink to="/arcreation">
	              <button class="justify justify-items-center text-white bg-[#322653] hover:bg-white hover:text-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">AR creation</button>
        	</RouterLink>
	        <RouterLink to="/mylibrary">
              		<button class="justify justify-items-center text-white bg-[#322653] hover:bg-white hover:text-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">My Library</button>
		</RouterLink>
            	<button @click="signOut" class="justify justify-items-center text-white bg-[#322653] hover:bg-white hover:text-black focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">Sign Out</button>
		</ul>
          </ul>
        </div>
      </div>
    </nav>
    <router-view>
    </router-view>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { initFlowbite } from 'flowbite';

onMounted(() => {
	initFlowbite();
	})
</script>

<script>
export default {
  data() {
    return {
      userInfo: null
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
    signOut() {
      // Logic for signing out the user
      localStorage.removeItem('userInfo');
      this.userInfo = null;
    },
    checkUser() {
   	const storedUserInfo = localStorage.getItem('userInfo');
      	this.userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null; 
    }
  }
};
</script>
