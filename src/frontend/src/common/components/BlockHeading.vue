<template>
  <h1 class="heading">{{ title }}</h1>
</template>

<script>
export default {
  name: "BlockHeading",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.heading {
  margin: 0;

  @include b-s36-h42;
}
</style>
