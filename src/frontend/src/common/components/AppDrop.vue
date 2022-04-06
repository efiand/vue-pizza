<template>
  <div
    :class="className"
    @drop.stop="onDrop"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script>
import { DATA_TRANSFER_PAYLOAD } from "@/common/constants";

export default {
  name: "AppDrop",
  props: {
    className: {
      type: String,
      default: "",
    },
  },
  methods: {
    onDrop({ dataTransfer }) {
      if (!dataTransfer) {
        return;
      }
      const payload = dataTransfer.getData(DATA_TRANSFER_PAYLOAD);
      if (payload) {
        this.$emit("drop", JSON.parse(payload));
      }
    },
  },
};
</script>
