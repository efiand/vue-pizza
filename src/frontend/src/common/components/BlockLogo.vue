<template>
  <RouterLink class="logo" to="/">
    <BlockPicture
      :srcset="['logo.svg']"
      alt="V!U!E! Pizza logo"
      width="90"
      height="40"
    />
  </RouterLink>
</template>

<script>
export default {
  name: "BlockLogo",
};
</script>

<style lang="scss">
.logo {
  img {
    display: block;
  }
}
</style>
