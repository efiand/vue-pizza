<template>
  <span>{{ orderPrice }} ₽</span>
</template>

<script>
import { findItemById, spacifyNumber } from "@/common/utils";

export default {
  name: "OrderPrice",
  props: {
    content: {
      type: Object,
      required: true,
    },
    pizzas: {
      type: Array,
      required: true,
    },
    misc: {
      type: Array,
      default: () => [],
    },
    customCounter: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    orderPrice() {
      const pizzasPrice = this.pizzas.reduce(
        (sum, pizza) =>
          sum + this.getPizzaPrice(pizza, this.customCounter || pizza.quantity),
        0
      );
      const miscPrice = this.misc.length
        ? this.misc.reduce((sum, { miscId, quantity }) => {
            const { price } = findItemById(this.content.misc, miscId);
            return sum + price * quantity;
          }, 0)
        : 0;

      return spacifyNumber(pizzasPrice + miscPrice);
    },
  },
  methods: {
    getPizzaPrice({ doughId, sauceId, sizeId, ingredients }, quantity) {
      const doughPrice = findItemById(this.content.dough, doughId).price;
      const saucesPrice = findItemById(this.content.sauces, sauceId).price;
      const ingredientsPrice = ingredients.reduce(
        (sum, { ingredientId, quantity }) => {
          const { price } = findItemById(
            this.content.ingredients,
            ingredientId
          );
          return sum + price * quantity;
        },
        0
      );
      const { multiplier } = findItemById(this.content.sizes, sizeId);

      const sum = doughPrice + saucesPrice + ingredientsPrice;
      return sum * multiplier * quantity;
    },
  },
};
</script>
