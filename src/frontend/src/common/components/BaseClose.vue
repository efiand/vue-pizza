<template>
  <div>
    <RouterLink
      v-if="to"
      class="close"
      :class="{ 'close--white': isWhite }"
      :to="to"
    >
      <span class="visually-hidden"><slot /></span>
    </RouterLink>

    <button
      v-else
      class="close"
      :class="{ 'close--white': isWhite }"
      @click="$emit('close')"
    >
      <span class="visually-hidden"><slot /></span>
    </button>
  </div>
</template>

<script>
export default {
  name: "BaseClose",

  props: {
    to: {
      type: String,
      default: null,
    },

    isWhite: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 25px;
  height: 25px;
  cursor: pointer;
  transition: 0.3s;
  text-decoration: none;
  color: $black;
  border-radius: 50%;
  outline: none;
  background-color: transparent;
  border: none;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;

    width: 25px;
    height: 2px;

    content: "";

    border-radius: 2px;
    background-color: $black;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.5;
  }

  &:focus {
    &::before,
    &::after {
      background-color: $orange-100;
    }
  }

  &--white {
    &::before,
    &::after {
      background-color: $white;
    }
  }
}
</style>
