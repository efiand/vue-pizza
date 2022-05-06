import {
  findItemByAlias,
  accumulateSumByKey,
  spacifyNumber,
} from "@/common/utils.js";

export default {
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
    getFormattedPizzaPrice(pizza, counter = pizza.counter) {
      return spacifyNumber(this.getPizzaPrice(pizza, counter));
    },
  },
};
