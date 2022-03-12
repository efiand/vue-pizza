<template>
  <div id="app">
    <Index />
  </div>
</template>

<script>
import Index from "@/views/Index.vue";

export default {
  name: "App",
  components: {
    Index,
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
