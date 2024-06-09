<template>
  <div>
    <v-lazy-image src="/Home.png" class="w-full"/>
  </div>
</template>

<script>
  import VLazyImage from "v-lazy-image";

  export default {
    components: {
      "v-lazy-image": VLazyImage,
    }
  }
</script>
