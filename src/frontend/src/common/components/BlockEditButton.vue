<template>
  <button class="edit" :type="type" @click="$emit('click')">
    <span class="visually-hidden"><slot /></span>
  </button>
</template>

<script>
export default {
  name: "BlockEditButton",
  props: {
    type: {
      type: String,
      default: "button",
    },
  },
};
</script>

<style lang="scss">
.edit {
  display: block;
  overflow: hidden;

  width: 32px;
  height: 32px;

  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;
  background-color: $white;
  background-image: url("~@/assets/img/edit.svg");
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    box-shadow: $shadow-light;
  }

  &:active {
    box-shadow: $shadow-large;
  }

  &:focus {
    box-shadow: $shadow-regular;
  }
}
</style>
