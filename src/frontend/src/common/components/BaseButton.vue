<template>
  <button
    class="button"
    :class="{
      'button--bordered': bordered,
      'button--transparent': transparent,
    }"
    :type="type"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "BaseButton",

  props: {
    type: {
      type: String,
      default: "button",
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    bordered: {
      type: Boolean,
      default: false,
    },

    transparent: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  @include b-s18-h21;

  font-family: inherit;
  padding: 16px 45px;
  cursor: pointer;
  transition: 0.3s;
  text-align: center;
  color: $white;
  border: 1px solid $green-500;
  border-radius: 8px;
  outline: none;
  background-color: $green-500;
  box-shadow: $shadow-medium;

  &:hover {
    background-color: $green-400;
    border-color: $green-400;
  }

  &:active {
    background-color: $green-600;
    border-color: $green-600;
  }

  &:focus {
    opacity: 0.5;
  }

  &:disabled {
    background-color: $green-300;
    border-color: $green-300;
    color: rgba($white, 0.2);
    cursor: default;
  }

  &--bordered {
    background-color: transparent;
    color: $black;
    box-shadow: none;

    &:hover {
      color: $green-500;
      background-color: transparent;
      border-color: $green-400;
    }

    &:active {
      color: $green-600;
      background-color: transparent;
    }

    &:disabled {
      opacity: 0.5;
    }
  }

  &--transparent {
    @include b-s14-h16;
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
    color: $black;

    &:hover:not(:active):not(:disabled) {
      color: $red-800;
      background-color: transparent;
      border-color: transparent;
    }

    &:active:not(:disabled) {
      color: $red-900;
      background-color: transparent;
      border-color: transparent;
    }

    &:disabled {
      opacity: 0.25;
    }
  }
}
</style>
