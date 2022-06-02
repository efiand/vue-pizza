<template>
  <Component
    :is="layout"
    :content="content"
    :orders="orders"
    :user="currentUser"
    @deleteOrder="orders.splice(orders.indexOf($event), 1)"
    @order="addOrder"
    @login="currentUser = user"
    @logout="currentUser = {}"
  />
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { RESET_ORDER } from "@/store/mutation-types";
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
      orders: [],
      user,
      currentUser: {},
    };
  },
  computed: {
    layout() {
      const { layout = DEFAULT_LAYOUT } = this.$route.meta;
      return () => import(`@/layouts/${layout}.vue`);
    },
    ...mapState("Cart", ["currentOrder"]),
  },
  methods: {
    ...mapMutations("Cart", {
      resetOrder: RESET_ORDER,
    }),
    addOrder() {
      this.orders.push(this.currentOrder);
      this.resetOrder();
    },
  },
};
</script>
