<template>
  <main class="content">
    <BlockHeading class="content__title">{{ title }}</BlockHeading>

    <slot />
  </main>
</template>

<script>
export default {
  name: "BlockContent",

  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
.content {
  margin: 0 auto;
  padding: 20px 2.12% 30px;
}

.content__title {
  margin: 0 0 15px;
}
</style>
