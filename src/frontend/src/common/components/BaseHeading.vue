<template>
  <h1 class="heading"><slot /></h1>
</template>

<script>
export default {
  name: "BaseHeading",
};
</script>

<style lang="scss" scoped>
.heading {
  @include b-s36-h42;
}
</style>
