<template>
  <li class="cart-item">
    <ProductCard class="cart-item__product" :content="content" :pizza="pizza" />

    <BlockCounter
      class="cart-item__counter"
      v-model.number="pizza.quantity"
      secondaryStyle
      @input="addPizza"
    />

    <div class="cart-item__price">
      <b>
        <OrderPrice :content="content" :pizzas="[pizza]" />
      </b>
    </div>

    <div class="cart-item__button">
      <RouterLink class="cart-item__edit" :to="`/?i=${index}`">
        Изменить
      </RouterLink>
    </div>
  </li>
</template>

<script>
import OrderPrice from "@/modules/orders/components/OrderPrice.vue";
import ProductCard from "@/modules/product/components/ProductCard.vue";

export default {
  name: "CartItem",
  components: { OrderPrice, ProductCard },
  props: {
    content: {
      type: Object,
      required: true,
    },
    pizza: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  methods: {
    addPizza(quantity) {
      this.$emit("input", {
        ...this.pizza,
        quantity,
      });
    },
  },
};
</script>

<style lang="scss">
.cart-item {
  display: flex;
  align-items: flex-start;

  padding-right: 15px;
  padding-bottom: 15px;
  padding-left: 15px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  &:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }
}

.cart-item__product {
  flex-grow: 1;

  margin-right: auto;
}

.cart-item__counter {
  width: 54px;
  margin-right: auto;
  margin-left: 20px;
}

.cart-item__price {
  min-width: 100px;
  margin-right: 36px;
  margin-left: 10px;

  text-align: right;

  b {
    @include b-s16-h19;
  }
}

.cart-item__edit {
  @include l-s11-h13;

  display: inline-block;
  padding: 1px 4px;
  color: inherit;
  cursor: pointer;
  transform: translateY(-2px);
  transition: 0.3s;
  outline: none;

  &:hover {
    color: $green-500;
  }

  &:active {
    color: $green-600;
  }

  &:focus {
    color: $green-400;
  }
}
</style>
