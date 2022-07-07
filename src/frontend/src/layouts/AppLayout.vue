<template>
  <Component
    :is="layout"
    :content="content"
    :user="user"
    :data-test="layoutName"
  />
</template>

<script>
import { mapState } from "vuex";

const DEFAULT_LAYOUT = "AppLayoutDefault";

export default {
  name: "AppLayout",

  computed: {
    ...mapState(["content"]),

    ...mapState("User", ["user"]),

    layoutName() {
      const { layout = DEFAULT_LAYOUT } = this.$route.meta || {};
      return layout;
    },

    layout() {
      const { layout = DEFAULT_LAYOUT } = this.$route.meta || {};
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
