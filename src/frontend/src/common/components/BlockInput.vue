<template>
  <label class="input" :class="{ 'input--big-label': bigLabel }">
    <span :class="{ 'visually-hidden': hideLabel }">{{ label }}</span>

    <input
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :readonly="readonly"
      :required="required && !readonly"
      v-model="currentValue"
    />
  </label>
</template>

<script>
export default {
  name: "BlockInput",

  props: {
    label: {
      type: String,
      required: true,
    },

    bigLabel: {
      type: Boolean,
      default: false,
    },

    hideLabel: {
      type: Boolean,
      default: false,
    },

    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      default: "text",
    },

    value: {
      type: String,
      required: true,
    },

    placeholder: {
      type: String,
      default: "",
    },

    readonly: {
      type: Boolean,
      default: false,
    },

    required: {
      type: Boolean,
      default: false,
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
.input {
  display: block;

  span {
    @include r-s14-h16;

    display: block;

    margin-bottom: 4px;
  }

  input {
    @include r-s16-h19;

    display: block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 16px;

    transition: 0.3s;

    color: $black;
    border: 1px solid $purple-400;
    border-radius: 8px;
    outline: none;
    background-color: $white;

    font-family: inherit;

    &:focus {
      border-color: $green-500;
    }
  }

  &:hover {
    input {
      border-color: $black;
    }
  }

  &--big-label {
    display: flex;
    align-items: center;

    span {
      @include b-s16-h19;

      margin-right: 16px;

      white-space: nowrap;
    }
  }
}
</style>
