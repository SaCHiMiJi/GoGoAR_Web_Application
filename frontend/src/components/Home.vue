<template>
  <div>
    <v-lazy-image 
      src="/Home.png" 
      src-placeholder="/rolling_load.gif"
      :class="imageClass"
      @load="onLoad()"
      />
  </div>
</template>

<script>
  import VLazyImage from "v-lazy-image";

  export default {
    components: {
      "v-lazy-image": VLazyImage,
    },
    data() {
      return {
        imageClass: 'mx-auto mt-6',
      }
    },
    methods: {
      onLoad() {
        this.imageClass = "w-full"
      },
    }
  }
</script>
