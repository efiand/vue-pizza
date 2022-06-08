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
import { findItemByAlias } from "@/common/utils";

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
      const { name } = findItemByAlias(this.content.dough, this.pizza.dough);
      return `${name.slice(0, -1).toLowerCase()}м`;
    },
    sauce() {
      const { name } = findItemByAlias(this.content.sauces, this.pizza.sauce);
      return name.toLowerCase();
    },
    size() {
      const { name } = findItemByAlias(this.content.sizes, this.pizza.size);
      return name;
    },
    ingredients() {
      return this.content.ingredients
        .filter(({ alias }) => this.pizza.ingredients[alias])
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
