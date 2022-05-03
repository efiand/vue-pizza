<template>
  <ul class="cart-list">
    <CartItem
      class="cart-list__item"
      v-for="pizza of pizzas"
      :key="pizza.name"
      :content="content"
      :pizza="pizza"
      @input="changePizzas"
    />
  </ul>
</template>

<script>
import { contentPropMixin } from "@/common/mixins";
import CartItem from "@/modules/cart/components/CartItem.vue";

export default {
  name: "CartList",
  mixins: [contentPropMixin],
  components: { CartItem },
  props: {
    pizzas: {
      type: Array,
      required: true,
    },
  },
  methods: {
    changePizzas(pizza) {
      const pizzas = this.pizzas.slice();
      const currentIndex = pizzas.findIndex(({ name }) => name === pizza.name);

      if (pizza.counter < 1) {
        pizzas.splice(currentIndex, 1);
      } else {
        pizzas[currentIndex] = pizza;
      }
      this.$emit("changePizzas", pizzas);
    },
  },
};
</script>

<style lang="scss">
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
