<template>
  <RouterLink class="logo" to="/">
    <BasePicture
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
  name: "BaseLogo",

  data() {
    return {
      logoText: Message.LOGO,
    };
  },
};
</script>
