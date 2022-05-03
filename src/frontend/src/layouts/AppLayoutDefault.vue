<template>
  <div>
    <AppLayoutHeader
      :content="content"
      :currentOrder="currentOrder"
      :user="user"
      @logout="$emit('logout')"
    />

    <RouterView
      :content="content"
      :orders="orders"
      :currentOrder="currentOrder"
      :user="user"
      @createPizza="$emit('createPizza', $event)"
      @updatePizza="$emit('updatePizza', $event)"
      @changeOrder="$emit('changeOrder', $event)"
      @changeAdditions="$emit('changeAdditions', $event)"
      @changeDelivery="$emit('changeDelivery', $event)"
      @order="$emit('order')"
      @login="$emit('login')"
    />
  </div>
</template>

<script>
import { contentPropMixin } from "@/common/mixins";
import AppLayoutHeader from "@/layouts/AppLayoutHeader.vue";

export default {
  name: "AppLayoutDefault",
  mixins: [contentPropMixin],
  components: {
    AppLayoutHeader,
  },
  props: {
    currentOrder: {
      type: Object,
      required: true,
    },
    orders: {
      type: Array,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>
