<template>
  <BaseContent :title="title" />
</template>

<script>
import { Message } from "@/common/constants";

export default {
  name: "NotFoundView",

  data() {
    return {
      title: Message.PAGE_NOT_FOUND,
    };
  },
};
</script>
