<template>
  <div>
    <AppLayoutHeader :content="content" :user="user" />

    <RouterView v-if="content" :content="content" :user="user" />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader.vue";

export default {
  name: "AppLayoutDefault",
  components: {
    AppLayoutHeader,
  },
  props: {
    content: {
      type: Object,
      default: null,
    },
    user: {
      type: Object,
      default: null,
    },
  },
};
</script>
