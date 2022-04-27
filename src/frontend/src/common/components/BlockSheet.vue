<template>
  <div class="sheet">
    <BlockSubheading class="sheet__title">{{ title }}</BlockSubheading>

    <div class="sheet__content">
      <slot />
    </div>
  </div>
</template>

<script>
import BlockSubheading from "@/common/components/BlockSubheading.vue";

export default {
  name: "BlockSheet",
  components: {
    BlockSubheading,
  },
  props: {
    title: {
      type: String,
      required: true,
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
}

.sheet__content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 16px 18px 18px;
  border-top: 1px solid rgba($green-500, 0.1);
}
</style>
