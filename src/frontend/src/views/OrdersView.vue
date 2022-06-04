<template>
  <div class="orders">
    <OrderCard
      v-for="(order, i) of orders"
      :key="`order-${i}`"
      class="orders__card"
      :content="content"
      :currentOrder="order"
      @deleteOrder="deleteOrder"
      @changeOrder="changeOrder"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { DELETE_ORDER, CHANGE_ORDER } from "@/store/mutation-types";
import OrderCard from "@/modules/orders/components/OrderCard.vue";

export default {
  name: "OrdersView",
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
  methods: {
    ...mapMutations("Cart", {
      changeOrder: CHANGE_ORDER,
    }),
    ...mapMutations("Orders", {
      deleteOrder: DELETE_ORDER,
    }),
  },
};
</script>

<style lang="scss">
.orders__card {
  margin-bottom: 32px;
}
</style>
