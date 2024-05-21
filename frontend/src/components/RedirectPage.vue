<template>
  <div class="justify justify-center">
    <button v-if="mobileAppURL !== null" @click="redirectApp()"> 
      Open App
    </button>
    <div v-else>
      This page didn't receive any url, please try again later.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobileAppURL: ''
    };
  },
  methods: {
   redirectApp() {
    // redirect to app
    window.location.href = this.mobileAppURL;
   }
  },
  created() {
    if(this.$route.query.url) {
      this.mobileAppURL = this.$route.query.url; 
    }
  }
}
</script>
