<template>
  <ul class="cart-list">
    <CartListItem
      class="cart-list__item"
      v-for="(pizza, i) of pizzas"
      :key="`pizza-${i}`"
      :content="content"
      :index="i"
      :pizza="pizza"
      @input="changePizzas"
    />
  </ul>
</template>

<script>
import CartListItem from "@/modules/cart/components/CartListItem.vue";

export default {
  name: "CartList",

  components: { CartListItem },

  props: {
    content: {
      type: Object,
      required: true,
    },

    pizzas: {
      type: Array,
      required: true,
    },
  },

  methods: {
    changePizzas(pizza) {
      const pizzas = this.pizzas.slice();
      const currentIndex = pizzas.findIndex(({ name }) => name === pizza.name);

      if (pizza.quantity < 1) {
        pizzas.splice(currentIndex, 1);
      } else {
        pizzas[currentIndex] = pizza;
      }

      this.$emit("changePizzas", pizzas);
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-list {
  @include clear-list;

  padding: 15px 0;
}

.cart-list__item {
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>
