<template>
  <div>
    <AppLayoutHeader :content="content" :user="user" />

    <Transition
      name="slide"
      :appear="$route.path !== '/login'"
      appear-class="slide-appear"
      appear-active-class="slide-appear-active"
    >
      <RouterView v-if="content" :content="content" :user="user" />
    </Transition>
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
