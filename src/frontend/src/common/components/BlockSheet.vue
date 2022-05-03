<template>
  <div class="sheet">
    <BlockSubheading v-if="title" class="sheet__title">
      {{ title }}
    </BlockSubheading>

    <slot />
  </div>
</template>

<script>
export default {
  name: "BlockSheet",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
.sheet {
  font-size: 16px;
  line-height: 19px;
  border-radius: 8px;
  box-shadow: $shadow-light;

  p {
    margin: 0;
  }
}

.sheet__title {
  padding: 15px 18px 8px;
  border-bottom: 1px solid rgba($green-500, 0.1);
}
</style>
