<template>
  <span>{{ orderPrice }} ₽</span>
</template>

<script>
import {
  accumulateSumByKey,
  findItemByAlias,
  spacifyNumber,
} from "@/common/utils";

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
    additions: {
      type: Object,
      default: () => ({ cola: 0, potato: 0, sauce: 0 }),
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
          sum + this.getPizzaPrice(pizza, this.customCounter || pizza.counter),
        0
      );
      const additionsPrice = Object.entries(this.additions).reduce(
        (sum, [alias, counter]) => {
          const addition = findItemByAlias(this.content.additions, alias);
          return sum + addition.price * counter;
        },
        0
      );

      return spacifyNumber(pizzasPrice + additionsPrice);
    },
  },
  methods: {
    getPizzaPrice(
      { dough, sauce, size, ingredients, counter },
      customCounter = counter
    ) {
      const doughPrice = findItemByAlias(this.content.dough, dough).price;
      const saucesPrice = findItemByAlias(this.content.sauces, sauce).price;
      const ingredientsPrice = accumulateSumByKey(
        this.content.ingredients,
        "price",
        ({ alias }) => ingredients[alias]
      );
      const { multiplier } = findItemByAlias(this.content.sizes, size);
      const sum = doughPrice + saucesPrice + ingredientsPrice;

      return sum * multiplier * customCounter;
    },
  },
};
</script>
