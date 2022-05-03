<template>
  <div class="sidebar">
    <BlockLogo class="sidebar__logo" />

    <RouterLink
      v-for="{ name, meta, path } of sideRoutes"
      :key="name"
      class="sidebar__link"
      :class="{ 'sidebar__link--active': name === $route.name }"
      :to="path"
    >
      {{ meta.title }}
    </RouterLink>
  </div>
</template>

<script>
export default {
  name: "AppSidebar",
  computed: {
    sideRoutes() {
      const { routes } = this.$router.options;
      return routes.filter(
        ({ meta = {} }) => meta.layout === "AppLayoutWithSidebar"
      );
    },
  },
};
</script>

<style lang="scss">
.sidebar {
  background-color: rgba($green-500, 0.05);
}

.sidebar__logo {
  display: block;
  margin-bottom: 30px;
  padding-top: 10px;
  padding-bottom: 11px;
  background-color: $green-500;

  img {
    margin-left: 40px;
  }
}

.sidebar__link {
  @include b-s14-h16;

  display: block;

  padding: 8px 14px;

  transition: 0.3s;

  color: $black;

  &--active {
    background-color: rgba($green-500, 0.1);
  }

  &:hover {
    background-color: rgba($green-500, 0.2);
  }

  &:active {
    color: rgba($black, 0.5);
  }
}
</style>
