<template>
  <picture>
    <source type="image/webp" v-if="webpset.length" :srcset="webpSrcset" />

    <img
      class="picture"
      :class="{ [`picture--${className}`]: className }"
      :src="remote ? srcset[0] : require(`@/assets/img/${srcset[0]}`)"
      :[attrSrcset]="imgSrcset"
      :alt="alt"
      :[attrWidth]="width"
      :[attrHeight]="height"
    />
  </picture>
</template>

<script>
import { accumulateSrc } from "@/common/helpers";

export default {
  name: "BasePicture",

  props: {
    srcset: {
      type: Array,
      required: true,
    },

    webpset: {
      type: Array,
      default: () => [],
    },

    className: {
      type: String,
      default: "",
    },

    alt: {
      type: String,
      default: "",
    },

    width: {
      type: String,
      default: "",
    },

    height: {
      type: String,
      default: "",
    },

    remote: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    imgSrcset() {
      return accumulateSrc(this.srcset.slice(1), 2);
    },

    webpSrcset() {
      return accumulateSrc(this.webpset);
    },

    attrSrcset() {
      return this.srcset.length > 1 ? "srcset" : null;
    },

    attrWidth() {
      return this.width ? "width" : null;
    },

    attrHeight() {
      return this.height ? "height" : null;
    },
  },
};
</script>

<style lang="scss" scoped>
.picture {
  display: block;

  &--left {
    float: left;

    margin-right: 7px;
  }

  &--userpic {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-right: 8px;

    vertical-align: middle;

    border-radius: 50%;
  }
}
</style>
