<template>
  <div class="product">
    <BlockPicture
      :srcset="['product.svg']"
      :alt="pizza.name"
      width="56"
      height="56"
    />
    <div class="product__text">
      <h2>{{ pizza.name }}</h2>
      <ul>
        <li>{{ size }}, на {{ dough }} тесте</li>
        <li>Соус: {{ sauce }}</li>
        <li>Начинка: {{ ingredients }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { findItemById } from "@/common/utils";

export default {
  name: "ProductCard",
  props: {
    content: {
      type: Object,
      required: true,
    },
    pizza: {
      type: Object,
      required: true,
    },
  },
  computed: {
    dough() {
      const { name } = findItemById(this.content.dough, this.pizza.doughId);
      return `${name.slice(0, -1).toLowerCase()}м`;
    },
    sauce() {
      const { name } = findItemById(this.content.sauces, this.pizza.sauceId);
      return name.toLowerCase();
    },
    size() {
      const { name } = findItemById(this.content.sizes, this.pizza.sizeId);
      return name;
    },
    ingredients() {
      return this.content.ingredients
        .filter(
          ({ id }) =>
            this.pizza.ingredients.find(
              ({ ingredientId }) => ingredientId === id
            ).quantity
        )
        .map(({ name }) => name.toLowerCase())
        .join(", ");
    },
  },
};
</script>

<style lang="scss">
.product {
  display: flex;
  align-items: center;
}

.product__text {
  margin-left: 15px;

  h2 {
    @include b-s18-h21;

    margin-top: 0;
    margin-bottom: 10px;
  }

  ul {
    @include clear-list;
    @include l-s11-h13;
  }
}
</style>
