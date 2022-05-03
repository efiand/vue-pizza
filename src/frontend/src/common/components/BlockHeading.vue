<template>
  <h1 class="heading"><slot /></h1>
</template>

<script>
export default {
  name: "BlockHeading",
};
</script>

<style lang="scss">
.heading {
  @include b-s36-h42;
}
</style>
