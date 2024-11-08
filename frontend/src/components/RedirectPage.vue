<template>
  <div
    class="flex justify justify-center items-center align-middle content-center h-dvh"
  >
    <button
      class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      v-if="mobileAppURL !== null"
      @click="redirectApp()"
    >
      Open App
    </button>
    <div v-else>This page didn't receive any url, please try again later.</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobileAppURL: "",
    };
  },
  methods: {
    redirectApp() {
      window.location.href = this.mobileAppURL;
    },
  },
  created() {
    if (this.$route.query.url) {
      this.mobileAppURL = this.$route.query.url;
    }
  },
};
</script>
