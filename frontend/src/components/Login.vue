<template>
  <section  class="min-h-screen bg-gray-50">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div class="w-full bg-white rounded-lg shaded md:mt-0 sm:max-w-md xl:p-0">
        <div
          class="flex items-center p-4 text-2xl font-semibold bg-[#322653] text-gray-300 rounded-xl"
        >
          <v-lazy-image
            class="mx-auto h-12 w-12"
            src="/weblogo.svg"
            alt="logo"
          />
        </div>
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
          >
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent action="#">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Your email</label
              >
              <input
                v-model="email"
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Password</label
              >
              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required=""
              />
            </div>
            <button
              @click="loginSubmission()"
              type="submit"
              class="border border-black w-full text-dark bg-white hover:bg-gray-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign in
            </button>
            <p class="text-sm font-light text-gray-500">
              Don’t have an account yet?
              <a
                href="/signup"
                class="font-medium text-primary-600 hover:underline"
                >Sign up</a
              >
            </p>
            <a
              href="/resetpassword"
              class="text-sm font-medium text-primary-600 hover:underline"
              >Forgot password?</a
            >
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VLazyImage from "v-lazy-image";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import qs from "qs";

export default {
  components: {
    "v-lazy-image": VLazyImage,
  },
  setup(props, { emit }) {
    const router = useRouter();

    const checkUser = () => {
      emit("check-user");
    };

    return { router, checkUser };
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    loginSubmission() {
      const loginDetail = qs.stringify({
        email: this.email,
        password: this.password,
      });

      this.$http
        .post("/login", loginDetail)
        .then((res) => {
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          useToast().success("Signin successfully.");
          this.emitter.emit("check-user");
          setTimeout(() => {
            this.router.replace({ path: "/" });
          }, 1000); // Wait 1 second before changing the route
        })
        .catch((error) => {
          useToast().error(error.response.data.error);
        });
    },
  },
};
</script>
