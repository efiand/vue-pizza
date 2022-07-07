<template>
  <div id="app">
    <AppLayout />

    <AppNotifications />
  </div>
</template>

<script>
import { setAuth } from "@/common/helpers";
import AppLayout from "@/layouts/AppLayout.vue";
import AppNotifications from "@/common/components/AppNotifications";

export default {
  name: "App",

  components: {
    AppLayout,
    AppNotifications,
  },

  created() {
    window.onerror = function (msg, url, line, col, error) {
      console.error(error);
    };

    if (this.$jwt.getToken()) {
      setAuth(this.$store);
    }

    this.$store.dispatch("init");
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
