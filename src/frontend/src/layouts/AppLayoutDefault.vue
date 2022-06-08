<template>
  <div>
    <AppLayoutHeader
      :content="content"
      :user="user"
      @logout="$emit('logout')"
    />

    <RouterView :content="content" :user="user" @login="$emit('login')" />
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
      required: true,
    },
    user: {
      type: Object,
    },
  },
};
</script>
