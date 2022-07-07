<template>
  <select class="select" :name="name" v-model="currentValue">
    <option v-for="{ id, name } in options" :key="id" :value="id">
      {{ name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "BlockSelect",

  props: {
    options: {
      type: Array,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      default: "",
    },
  },

  computed: {
    currentValue: {
      get() {
        return this.value;
      },

      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style lang="scss">
.select {
  @include r-s16-h19;

  display: block;

  margin: 0;
  padding: 8px 16px;
  padding-right: 30px;

  cursor: pointer;
  transition: 0.3s;

  color: $black;
  border: 1px solid $purple-400;
  border-radius: 8px;
  outline: none;
  background-color: $silver-100;
  background-image: url("~@/assets/img/select.svg");
  background-repeat: no-repeat;
  background-position: right 8px center;

  font-family: inherit;

  appearance: none;

  &:hover {
    border-color: $orange-100;
  }

  &:focus {
    border-color: $green-500;
  }
}
</style>
