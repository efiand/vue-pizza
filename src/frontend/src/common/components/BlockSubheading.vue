<template>
  <h2 class="subheading">{{ title }}</h2>
</template>

<script>
export default {
  name: "BlockSubsubheading",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.subheading {
  margin: 0;

  @include b-s18-h21;
}
</style>
