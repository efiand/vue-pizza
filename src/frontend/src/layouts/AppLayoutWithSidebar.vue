<template>
  <div>
    <AppLayoutHeader :content="content" :user="user" />

    <main class="layout">
      <template v-if="content && user">
        <AppSidebar class="layout__sidebar" />

        <div class="layout__content">
          <Transition
            name="slide"
            appear
            appear-class="slide-appear"
            appear-active-class="slide-appear-active"
          >
            <RouterView :content="content" :user="user" />
          </Transition>
        </div>
      </template>

      <div v-else class="layout__content">
        <p v-if="!user" key="fallback-deny">Доступ запрещён!</p>
        <p v-else key="fallback-error">Ошибка загрузки данных</p>
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
      default: null,
    },

    user: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
