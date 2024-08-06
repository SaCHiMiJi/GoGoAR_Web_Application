<template>
  <section class="bg-gray-50">
    <div class="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0" v-if="!isPasswordReset">  
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
        <div class="flex items-center p-4 text-2xl font-semibold bg-[#322653] text-gray-300 rounded-xl">
          <v-lazy-image class="mx-auto h-12 w-12" src="/weblogo.svg" alt="logo"/>
        </div>

        <!-- First Page for Starting Sent OTP -->
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8" v-if="!isOTPSent">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Reset Your Password
          </h1>

          <form class="space-y-4 md:space-y-6" @submit.prevent="sendOTP">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
              <input v-model="email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required>
            </div>
            <button type="submit" class="border border-black w-full text-dark bg-white hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Send OTP
            </button>
          </form>
        </div>

        <!-- Second Page for OTP sending -->
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8" v-else>
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Complete your new password
          </h1>

          <form class="space-y-4 md:space-y-6" @submit.prevent="validateRegister">
            <!-- Email -->
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
              <input v-model="email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required readonly>
            </div>

            <!-- Password -->
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
              <div class="relative">
                <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required>
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

            <!-- Confirm Password -->
            <div>
              <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
              <div class="relative">
                <input v-model="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10" required>
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

            <!-- OTP -->
            <div>
              <div class="flex items-center justify-center gap-3">
                <input
                  type="text" v-model="otpPartition1" ref="otp1"
                  class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  maxlength="1" @input="moveFocus(1)" />
                <input
                  type="text" v-model="otpPartition2" ref="otp2"
                  class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  maxlength="1" @input="moveFocus(2)" />
                <input
                  type="text" v-model="otpPartition3" ref="otp3"
                  class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  maxlength="1" @input="moveFocus(3)" />
                <input
                  type="text" v-model="otpPartition4" ref="otp4"
                  class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  maxlength="1" @input="moveFocus(4)" />
                <input
                  type="text" v-model="otpPartition5" ref="otp5"
                  class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  maxlength="1" @input="moveFocus(5)" />
                <input
                  type="text" v-model="otpPartition6" ref="otp6"
                  class="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  maxlength="1" @input="moveFocus(6)" />
              </div>            
            </div>

            <!-- Reset Password button -->
            <button class="border border-black w-full text-dark bg-white hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" v-on:click="resetPassword">
              Reset Password
            </button>
            <p class="text-sm font-light text-gray-500">
              One Time Password not found? <button v-on:click="sendOTP" class="font-medium text-primary-600 hover:underline">Try again</button>
            </p>
          </form>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center px-6 py-4 mx-auto md:h-screen lg:py-0" v-else>
       <h2 class="text-2xl font-bold text-gray-900 mb-4">Password Reset Successful</h2>
       <p class="text-gray-700 mb-4">You've reset your password, you can continue to sign in</p>
       <a href="/signin" class="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign In Here</a>
    </div>
  </section>
</template>

<script>
import VLazyImage from "v-lazy-image";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import qs from 'qs';

export default {
  components: {
      "v-lazy-image": VLazyImage,
  },
	data() {
		return {
			email: "",
			password: "",
      confirmPassword: "",
      otp: "",
      otpPartition1: "",
      otpPartition2: "",
      otpPartition3: "",
      otpPartition4: "",
      otpPartition5: "",
      otpPartition6: "",

      showPassword: false,
      showConfirmPassword: false,
      isOTPSent: false,

      isPasswordReset: false,
		}
	},
	methods: {
    refillEmail() {
      isOTPSent = false;
      password = "";
      otp = "";
    },

		sendOTP() {
			const emailJSON = qs.stringify({
				"email": this.email
			});

			this.$http.post("/send-otp", emailJSON)
				.then((res) => {
					useToast().success("OTP have sent to your email");
          this.isOTPSent = true;
				})
				.catch((error) => {
					useToast().error(error.response.data.message);
				});
		},

    resetPassword() {
      // combine the OTP
      this.otp = this.otpPartition1 + this.otpPartition2 + this.otpPartition3 + this.otpPartition4 + this.otpPartition5 + this.otpPartition6;

      // validate the confirmation password.
      if(this.password !== this.password) {
        return useToast().error('you mistyped the confirmary password');
      }

      const resetPasswordDetails = qs.stringify({
        "email": this.email,
        "newPassword": this.password,
        "otp": this.otp
      });

      this.$http.post("/forgotpassword", resetPasswordDetails)
				.then((res) => {
          useToast().success("Your password has been reset");
          this.isPasswordReset = true;
				})
				.catch((error) => {
					useToast().error(error.response.data.message);
				});
    },
    moveFocus(partition) {
      if (this[`otpPartition${partition}`].length === 1 && partition < 6) {
        const nextPartition = partition + 1;
        this.$nextTick(() => {
          const nextInput = this.$refs[`otp${nextPartition}`];
          if (nextInput) {
            nextInput.focus();
          } else {
            console.error(`No input found for partition ${nextPartition}`);
          }
        });
      }
    },
	}
}

</script>
