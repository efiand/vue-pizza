<template>
  <Component
    :is="layout"
    :content="content"
    :user="currentUser"
    @login="currentUser = user"
    @logout="currentUser = {}"
  />
</template>

<script>
import content from "@/static/pizza.json";
import additions from "@/static/misc.json";
import user from "@/static/user.json";

const DEFAULT_LAYOUT = "AppLayoutDefault";

export default {
  name: "AppLayout",
  data() {
    return {
      content: {
        ...content,
        additions,
      },
      user,
      currentUser: {},
    };
  },
  computed: {
    layout() {
      const { layout = DEFAULT_LAYOUT } = this.$route.meta;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
