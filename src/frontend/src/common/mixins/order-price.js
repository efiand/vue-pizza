import { findItemByAlias, spacifyNumber } from "@/common/utils";
import contentPropMixin from "@/common/mixins/content-prop";
import pizzaPriceMixin from "@/common/mixins/pizza-price";

export default {
  mixins: [contentPropMixin, pizzaPriceMixin],
  props: {
    currentOrder: {
      type: Object,
      required: true,
    },
  },
  computed: {
    orderPrice() {
      const pizzasPrice = this.currentOrder.pizzas.reduce(
        (sum, pizza) => sum + this.getPizzaPrice(pizza),
        0
      );
      const additionsPrice = Object.entries(this.currentOrder.additions).reduce(
        (sum, [alias, counter]) => {
          const addition = findItemByAlias(this.content.additions, alias);
          return sum + addition.price * counter;
        },
        0
      );

      return pizzasPrice + additionsPrice;
    },
    formattedOrderPrice() {
      return spacifyNumber(this.orderPrice);
    },
  },
};
