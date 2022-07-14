<template>
  <BaseSheet class="additional-item">
    <p class="additional-item__description">
      <BasePicture
        class="additional-item__img"
        :srcset="[misc.image]"
        :alt="misc.name"
        width="39"
        height="60"
        remote
      />
      <span class="additional-item__title">{{ misc.name }}</span>
    </p>

    <div class="additional-item__wrapper">
      <BaseCounter
        class="additional-item__counter"
        v-model.number="misc.quantity"
        secondary-style
        @input="$emit('input', $event)"
      />

      <div class="additional-item__price">
        <b>× {{ getPrice(misc) }} ₽</b>
      </div>
    </div>
  </BaseSheet>
</template>

<script>
import { spacifyNumber } from "@/common/utils";

export default {
  name: "CartMiscList",

  props: {
    misc: {
      type: Object,
      required: true,
    },
  },

  methods: {
    getPrice({ quantity, price }) {
      return spacifyNumber(quantity * price);
    },
  },
};
</script>

<style lang="scss" scoped>
.additional-item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding-top: 15px;
  padding-bottom: 15px;
}

.additional-item__description {
  display: flex;
  align-items: flex-start;

  margin: 0;
  margin-bottom: 8px;
}

.additional-item__title {
  @include b-s14-h16;

  display: inline;

  width: 100px;
  margin-right: 15px;
}

.additional-item__img {
  margin-right: 10px;
  margin-left: 15px;
}

.additional-item__wrapper {
  display: flex;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.additional-item__counter {
  width: 54px;
  margin-right: auto;
}

.additional-item__price {
  @include b-s16-h19;
}
</style>
