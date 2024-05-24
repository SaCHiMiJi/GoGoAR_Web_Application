<template>
<div>
<section class="bg-gray-50">
  <div v-if="isRegistered === false" class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
          Flowbite    
      </a>
      <div class="w-full bg-white rounded-lg shaded md:mt-0 sm:max-w-md xl:p-0">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Create an account
              </h1>
              <form class="space-y-4 md:space-y-6" @submit.prevent action="#">
		 <!-- username -->
                  <div>
                      <label class="block mb-2 text-sm font-medium text-gray-900">Your username</label>
                      <input v-model="username" type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="yourname" required="">
                  </div>
		  <!-- email -->
		  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                      <input v-model="email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required="">
                  </div>
		  
		  <!-- password -->
		  <div>
    			<label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
			<div class="relative">
				<input v-model="password" :type="showPassword ? 'text' : 'password'" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10" required>
				        <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 flex items-center px-2">
				            <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
			        	        <path d="M10 3c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 14a6 6 0 110-12 6 6 0 010 12z"/>
			                	<path d="M10 5a5 5 0 000 10A5 5 0 0010 5z"/>
				            </svg>
				            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
						<path d="M3.055 13.045A8 8 0 0116.945 6.055L10 10 3.055 13.045zm.666 1.665A10 10 0 0017.278 8.278L10 10 3.721 16.721zM10 8a2 2 0 100 4 2 2 0 000-4z"/>
            				    </svg>
				        </button>
    			</div>
		</div>

		<!-- confirm password -->
		<div>
		    <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
		    <div class="relative">
		        <input v-model="confirmaryPassword" :type="showConfirmPassword ? 'text' : 'password'" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10" required>
		        <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute inset-y-0 right-0 flex items-center px-2">
		            <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                		<path d="M10 3c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 14a6 6 0 110-12 6 6 0 010 12z"/>
		                <path d="M10 5a5 5 0 000 10A5 5 0 0010 5z"/>
            		    </svg>
		            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                		<path d="M3.055 13.045A8 8 0 0116.945 6.055L10 10 3.055 13.045zm.666 1.665A10 10 0 0017.278 8.278L10 10 3.721 16.721zM10 8a2 2 0 100 4 2 2 0 000-4z"/>
		            </svg>
		        </button>
		    </div>
		</div>
		
		<!-- Register request button -->
		<button class="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
		@click="validateRegister()" >Create an account</button>
                <p class="text-sm font-light text-gray-500">
                	Already have an account? <a href="/signin" class="font-medium text-primary-600 hover:underline">Signin here</a>
                </p>
		</form>
		</div>
	</div>
</div>
  <!-- Post submission panel -->
  <div v-else class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
  	<div>
		You have registered successfully!
		please login to continue.
	</div>
	<div>
	<button @click="$router.replace({ path: '/signin'}) ">
			Login
		</button>
	</div>
  </div>
</section>  

<!-- Pop-up modal -->
<div v-if="showPopup" id="popup-modal" tabindex="-1" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow">
            <button @click="showPopup = false;" type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="p-4 md:p-5 text-center">
                <svg class="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 class="mb-5 text-lg font-normal text-gray-500">Are you sure you want to Sign-up with these information?</h3>
		<button @click="register" type="button" class="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    Yes, I'm sure
                </button>
                <button @click="showPopup = false" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">No, cancel</button>
            </div>
        </div>
    </div>
</div>

</div>
</template>

<script>
import { useToast } from "vue-toastification";
import qs from 'qs';

export default {
	setup() {
		const toast = useToast();
		return { toast };
	},
	data() {
		return {
			username: "",
			email: "",
			password: "",

			confirmaryPassword: "",
			showPassword: false,
            		showConfirmPassword: false,

			isRegistered: false,
			showPopup: false
		}
	},
	methods: {
		validateRegister() {
			// validate the email format.
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        		if (!emailRegex.test(this.email)) {
		        	return this.errorCard("Please enter a valid email address.");
			}
			
			if(this.password !== this.confirmaryPassword) {
				return this.errorCard("Your confirmary password is not the same, please retry again.")
			}
			
			this.showPopup = true;
		},
		register() {
			this.showPopup = false;

			 const registerDetail = qs.stringify({
                                "username": this.username,
                                "email": this.email,
                                "password": this.password
                        });

			this.$http.post("/register", registerDetail)
      .then((response) => {
					console.log(JSON.stringify(response.data));
          this.isRegistered = true;})
				.catch((error) => {
          this.errorCard(error.response.data.error);
        });
		},
		errorCard(message) {
			this.toast.error(message);			
		}
	}
}
</script>
