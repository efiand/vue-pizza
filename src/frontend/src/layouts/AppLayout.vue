<template>
  <div>
    <AppLayoutHeader :orders="orders" />

    <IndexView @order="orders.push($event)" />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader.vue";
import IndexView from "@/views/IndexView.vue";

export default {
  name: "AppLayout",
  components: {
    AppLayoutHeader,
    IndexView,
  },
  data() {
    return {
      orders: [],
    };
  },
};
</script>
