<template>
  <div>
    <v-lazy-image 
      src="/home_splited_1.png" 
      src-placeholder="/rolling_load.gif"
      :class="imageClass"
      @load="onLoad()"
      />

    <v-lazy-image 
      src="/home_splited_2.png" 
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
