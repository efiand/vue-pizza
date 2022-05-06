<template>
  <Component
    :is="layout"
    :content="content"
    :orders="orders"
    :currentOrder="currentOrder"
    :user="currentUser"
    @createPizza="currentOrder.pizzas.push($event)"
    @updatePizza="updatePizza"
    @changeAdditions="currentOrder.additions = $event"
    @changeDelivery="currentOrder.delivery = $event"
    @changeOrder="currentOrder = $event"
    @deleteOrder="orders.splice(orders.indexOf($event), 1)"
    @order="addOrder"
    @login="currentUser = user"
    @logout="currentUser = {}"
  />
</template>

<script>
import content from "@/static/pizza.json";
import additions from "@/static/misc.json";
import user from "@/static/user.json";
import { accumulateStructureByAliases } from "@/common/utils";

const DEFAULT_LAYOUT = "AppLayoutDefault";

function createOrder() {
  return {
    pizzas: [],
    additions: accumulateStructureByAliases(additions),
    delivery: {
      mode: "no",
      tel: "",
      street: "",
      house: "",
      apartment: "",
    },
  };
}

export default {
  name: "AppLayout",
  data() {
    return {
      content: {
        ...content,
        additions,
      },
      orders: [],
      currentOrder: createOrder(),
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
  methods: {
    updatePizza({ pizza, index }) {
      const { counter } = this.currentOrder.pizzas[index];

      this.currentOrder.pizzas[index] = {
        ...pizza,
        counter,
      };
    },
    addOrder() {
      this.orders.push(this.currentOrder);
      this.currentOrder = createOrder();
    },
  },
};
</script>
