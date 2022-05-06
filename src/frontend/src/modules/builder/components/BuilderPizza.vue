<template>
  <AppDrop
    class="pizza"
    :class="`pizza--foundation--${dough}-${sauce} pizza--size--${size}`"
    @drop="onDrop"
  >
    <BuilderPizzaFilling
      v-for="(quantity, alias) in ingredients"
      :key="alias"
      :alias="alias"
      :quantity="quantity"
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
    dough: {
      type: String,
      required: true,
    },
    sauce: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    ingredients: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onDrop({ ingredient }) {
      const ingredients = { ...this.ingredients };

      if (ingredients[ingredient] >= MAX_INGREDIENT_QUANTITY) {
        return;
      }

      ingredients[ingredient]++;
      this.$emit("change", ingredients);
    },
  },
};
</script>

<style lang="scss">
.pizza {
  position: relative;
  background-size: 100%;

  &--foundation--large-creamy {
    background-image: url("~@/assets/img/foundation/big-creamy.svg");
  }

  &--foundation--large-tomato {
    background-image: url("~@/assets/img/foundation/big-tomato.svg");
  }

  &--foundation--light-creamy {
    background-image: url("~@/assets/img/foundation/small-creamy.svg");
  }

  &--foundation--light-tomato {
    background-image: url("~@/assets/img/foundation/small-tomato.svg");
  }

  &--size--small {
    transform: scale(0.9);
  }

  &--size--big {
    transform: scale(1.1);
  }
}
</style>
