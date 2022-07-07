<template>
  <AppDrop
    class="pizza"
    :class="`pizza--foundation--${doughId}-${sauceId} pizza--size--${sizeId}`"
    @drop="onDrop"
  >
    <BuilderPizzaFilling
      v-for="{ quantity, ingredientId } in ingredients"
      :key="`filling-${ingredientId}`"
      :id="ingredientId"
      :quantity="quantity"
      :data-test="`filling-${ingredientId}`"
    />
  </AppDrop>
</template>

<script>
import { MAX_INGREDIENT_QUANTITY } from "@/common/constants";
import BuilderPizzaFilling from "@/modules/builder/components/BuilderPizzaFilling.vue";

export default {
  name: "BuilderPizza",

  components: {
    BuilderPizzaFilling,
  },

  props: {
    doughId: {
      type: Number,
      required: true,
    },

    sauceId: {
      type: Number,
      required: true,
    },

    sizeId: {
      type: Number,
      required: true,
    },

    ingredients: {
      type: Array,
      required: true,
    },
  },

  methods: {
    onDrop({ ingredientId }) {
      const ingredients = this.ingredients.slice();
      const targetIngredient = this.ingredients.find(
        (item) => item.ingredientId === ingredientId
      );

      if (targetIngredient.quantity >= MAX_INGREDIENT_QUANTITY) {
        return;
      }

      targetIngredient.quantity++;
      this.$emit("change", ingredients);
    },
  },
};
</script>

<style lang="scss">
.pizza {
  position: relative;
  background-size: 100%;

  &--foundation--1-1 {
    background-image: url("~@/assets/img/foundation/small-creamy.svg");
  }

  &--foundation--1-2 {
    background-image: url("~@/assets/img/foundation/small-tomato.svg");
  }

  &--foundation--2-1 {
    background-image: url("~@/assets/img/foundation/big-creamy.svg");
  }

  &--foundation--2-2 {
    background-image: url("~@/assets/img/foundation/big-tomato.svg");
  }

  &--size--1 {
    transform: scale(0.9);
  }

  &--size--3 {
    transform: scale(1.1);
  }
}
</style>
