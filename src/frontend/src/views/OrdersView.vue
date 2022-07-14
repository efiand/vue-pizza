<template>
  <div class="orders">
    <BaseHeading class="orders__title">
      {{ $route.meta.title }}
    </BaseHeading>

    <template v-if="orders.length">
      <OrderCard
        v-for="(order, i) of orders"
        :key="`order-${i}`"
        class="orders__card"
        :content="content"
        :current-order="order"
        @deleteOrder="deleteOrder"
        @repeatOrder="repeatOrder"
      />
    </template>

    <p v-else class="orders__empty">У вас нет ни одного заказа</p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { UPDATE_ORDER } from "@/store/mutation-types";
import OrderCard from "@/modules/orders/components/OrderCard.vue";

export default {
  name: "OrdersView",

  meta: {
    layout: "AppLayoutWithSidebar",
    title: "История заказов",
  },

  components: {
    OrderCard,
  },

  props: {
    content: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState("Orders", ["orders"]),
  },

  beforeCreate() {
    this.$store.dispatch("Orders/getOrders");
  },

  methods: {
    ...mapActions("Orders", ["deleteOrder"]),

    repeatOrder(additions) {
      this.$store.commit(`Cart/${UPDATE_ORDER}`, additions);
      this.$router.push("/cart");
    },
  },
};
</script>

<style lang="scss" scoped>
.orders__card {
  margin-bottom: 32px;
}

.orders__title {
  margin: 0 0 27px;
}
</style>
