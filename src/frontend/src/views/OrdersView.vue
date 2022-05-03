<template>
  <div class="orders">
    <OrderCard
      v-for="(order, i) of orders"
      :key="`order-${i}`"
      class="orders__card"
      :content="content"
      :currentOrder="order"
      @deleteOrder="$emit('deleteOrder', $event)"
      @changeOrder="$emit('changeOrder', $event)"
    />
  </div>
</template>

<script>
import { contentPropMixin } from "@/common/mixins";
import OrderCard from "@/modules/orders/components/OrderCard.vue";

export default {
  name: "OrdersView",
  mixins: [contentPropMixin],
  components: {
    OrderCard,
  },
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.orders__card {
  margin-bottom: 32px;
}
</style>
