<template>
  <AppDrop
    class="pizza"
    :class="`pizza--foundation--${pizza.dough}-${pizza.sauce} pizza--size--${pizza.size}`"
    @drop="onDrop"
  >
    <BuilderPizzaFilling
      v-for="(quantity, alias) in pizza.ingredients"
      :key="alias"
      :alias="alias"
      :quantity="quantity"
    />
  </AppDrop>
</template>

<script>
import { MAX_INGREDIENT_QUANTITY } from "@/common/constants";
import AppDrop from "@/common/components/AppDrop.vue";
import BuilderPizzaFilling from "@/modules/builder/components/BuilderPizzaFilling.vue";

export default {
  name: "BuilderPizza",
  components: {
    AppDrop,
    BuilderPizzaFilling,
  },
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onDrop({ ingredient }) {
      if (this.pizza.ingredients[ingredient] >= MAX_INGREDIENT_QUANTITY) {
        return;
      }

      this.pizza.ingredients[ingredient]++;
      this.$emit("change", this.pizza.ingredients);
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
