<template>
  <RouterLink class="logo" to="/">
    <BlockPicture
      :srcset="['logo.svg']"
      :alt="logoText"
      width="90"
      height="40"
    />
  </RouterLink>
</template>

<script>
import { Message } from "@/common/constants";

export default {
  name: "BlockLogo",

  data() {
    return {
      logoText: Message.LOGO,
    };
  },
};
</script>

<style lang="scss">
.logo {
  img {
    display: block;
  }
}
</style>
