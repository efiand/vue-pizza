<template>
  <h2 class="subheading"><slot /></h2>
</template>

<script>
export default {
  name: "BaseSubheading",
};
</script>

<style lang="scss" scoped>
.subheading {
  margin: 0;

  @include b-s18-h21;
}
</style>
