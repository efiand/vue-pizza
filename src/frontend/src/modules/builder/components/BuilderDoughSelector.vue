<template>
  <div class="dough" :class="className">
    <RadioButton
      v-for="item of dough"
      :key="`dough-${item.id}`"
      :className="`dough__input dough__input--${item.alias}`"
      name="dough"
      :value="item.alias"
      :label="item.name"
      :description="item.description"
      :checked="item.checked"
      inputIsHidden
      @change="changeDough(item)"
    />
  </div>
</template>

<script>
import { changeRadio } from "@/common/utils";
import RadioButton from "@/common/components/RadioButton.vue";

export default {
  name: "BuilderDoughSelector",
  components: {
    RadioButton,
  },
  props: {
    className: {
      type: String,
      default: "",
    },
    dough: {
      type: Array,
      required: true,
    },
  },
  methods: {
    changeDough(item) {
      this.$emit("change", changeRadio(this.dough, item));
    },
  },
};
</script>

<style lang="scss">
.dough__input {
  position: relative;

  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;

  cursor: pointer;

  b {
    @include r-s16-h19;

    &::before {
      @include p_center-v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }

  span {
    @include l-s11-h13;

    display: block;
  }

  &--light {
    b {
      &::before {
        background-image: url("~@/assets/img/dough-light.svg");
      }
    }
  }

  &--large {
    b {
      &::before {
        background-image: url("~@/assets/img/dough-large.svg");
      }
    }
  }

  &:hover {
    b::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + b::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>
