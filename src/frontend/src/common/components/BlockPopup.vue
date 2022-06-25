<template>
  <div class="popup">
    <BlockClose @close="$emit('close')">Закрыть попап.</BlockClose>

    <slot />
  </div>
</template>

<script>
export default {
  name: "BlockPopup",
};
</script>

<style lang="scss">
.popup {
  @include pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 420px;
  padding: 64px 95px;

  background-color: $white;
  box-shadow: $shadow-light;

  &::before,
  &::after {
    position: absolute;

    width: 48px;
    height: 48px;

    content: "";

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  &::before {
    top: 15px;
    left: 15px;

    background-image: url("~@/assets/img/filling/ananas.svg");
  }

  &::after {
    right: 15px;
    bottom: 15px;

    background-image: url("~@/assets/img/filling/tomatoes.svg");
  }
}
</style>
