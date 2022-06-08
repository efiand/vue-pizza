<template>
  <Component
    :is="layout"
    :content="content"
    :user="currentUser"
    @login="login"
    @logout="logout"
  />
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { LOGIN, LOGOUT } from "@/store/mutation-types";
import content from "@/static/pizza.json";
import additions from "@/static/misc.json";

const DEFAULT_LAYOUT = "AppLayoutDefault";

export default {
  name: "AppLayout",
  data() {
    return {
      content: {
        ...content,
        additions,
      },
    };
  },
  computed: {
    ...mapState("Auth", ["currentUser"]),
    layout() {
      const { layout = DEFAULT_LAYOUT } = this.$route.meta;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
  methods: {
    ...mapMutations("Auth", {
      login: LOGIN,
      logout: LOGOUT,
    }),
  },
};
</script>
