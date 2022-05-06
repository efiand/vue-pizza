<template>
  <picture>
    <source v-if="webpset.length" type="image/webp" :srcset="webpSrcset" />
    <img
      :src="require(`@/assets/img/${srcset[0]}`)"
      :[attrSrcset]="imgSrcset"
      :alt="alt"
      :[attrWidth]="width"
      :[attrHeight]="height"
    />
  </picture>
</template>

<script>
function accumulateSrc(srcset, firstIndex = 1) {
  return srcset
    .map(
      (filename, i) =>
        `${require(`@/assets/img/${filename}`)} ${i + firstIndex}x`
    )
    .join(", ");
}

export default {
  name: "BlockPicture",
  props: {
    srcset: {
      type: Array,
      required: true,
    },
    webpset: {
      type: Array,
      default: () => [],
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
