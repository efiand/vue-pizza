<template>
  <div>
    <AppLayoutHeader
      :content="content"
      :user="user"
      @logout="$emit('logout')"
    />

    <main class="layout">
      <AppSidebar class="layout__sidebar" />

      <div class="layout__content">
        <BlockHeading class="layout__title">
          {{ $route.meta.title }}
        </BlockHeading>

        <RouterView :content="content" :user="user" />
      </div>
    </main>
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader.vue";
import AppSidebar from "@/layouts/AppSidebar.vue";

export default {
  name: "AppLayoutWithSidebar",
  components: {
    AppLayoutHeader,
    AppSidebar,
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

<style lang="scss">
.layout__sidebar {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 180px;
  height: 100%;
}

.layout__content {
  padding-top: 22px;
  padding-right: 2.12%;
  padding-left: 200px;
}

.layout__title {
  margin: 0 0 27px;
}
</style>
