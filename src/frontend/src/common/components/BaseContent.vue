<template>
  <main class="content">
    <BaseHeading class="content__title">{{ title }}</BaseHeading>

    <slot />
  </main>
</template>

<script>
export default {
  name: "BaseContent",

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
