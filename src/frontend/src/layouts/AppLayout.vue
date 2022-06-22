<template>
  <Component :is="layout" :content="content" :user="user" />
</template>

<script>
import { mapState } from "vuex";

const DEFAULT_LAYOUT = "AppLayoutDefault";

export default {
  name: "AppLayout",
  computed: {
    ...mapState(["content"]),
    ...mapState("User", ["user"]),
    layout() {
      const { layout = DEFAULT_LAYOUT } = this.$route.meta;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
