<template>
  <label class="radio">
    <input
      class="radio__input"
      :class="{
        'radio__input--big': big,
        'radio__input--small': !big,
        [`radio__input--${className}`]: className,
      }"
      type="radio"
      :name="name"
      :value="option.id"
      :checked="checked"
      @change="$emit('change')"
    />

    <span>
      {{ option.name }}
      <small v-if="option.description" class="radio__description">
        {{ option.description }}
      </small>
    </span>
  </label>
</template>

<script>
export default {
  name: "BaseRadio",

  props: {
    name: {
      type: String,
      required: true,
    },

    option: {
      type: Object,
      required: true,
    },

    checked: {
      type: Boolean,
      default: false,
    },

    big: {
      type: Boolean,
      default: false,
    },

    className: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.radio {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.radio__input {
  margin-right: 8px;
  border-radius: 50%;
  outline: none;
  transition: 0.3s;
  appearance: none;
  cursor: pointer;

  &--big {
    width: 36px;
    height: 36px;
    margin-right: 14px;
    background-image: var(--bg, none);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    .radio:hover &,
    &:focus {
      box-shadow: $shadow-regular;
    }

    &:checked {
      box-shadow: $shadow-large;
    }
  }

  &--small {
    width: 20px;
    height: 20px;
    border: 1px solid $purple-400;

    &:checked {
      border-width: 6px;
      border-color: $green-500;
    }

    &:disabled {
      border-color: $purple-400;
      background-color: $silver-200;

      &:checked {
        border-color: $purple-400;
      }
    }

    .radio:hover &,
    &:focus {
      &:not(:checked):not(:disabled) {
        border-color: $purple-800;
      }
    }
  }

  &--size-1,
  &--size-2,
  &--size-3 {
    margin-right: 10px;
    background-color: $green-100;
  }

  &--size-1 {
    background-size: 18px;
  }

  &--size-2 {
    background-size: 29px;
  }
}

.radio__description {
  display: block;
  font-weight: 300;
  font-size: 11px;
  line-height: 13px;
}
</style>
