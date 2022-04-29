<template>
  <h2 class="subheading"><slot /></h2>
</template>

<script>
export default {
  name: "BlockSubheading",
};
</script>

<style lang="scss">
.subheading {
  margin: 0;

  @include b-s18-h21;
}
</style>
