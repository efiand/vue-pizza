<template>
  <footer class="cart-footer">
    <CartMore class="cart-footer__more" />

    <p class="cart-footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>

    <div class="cart-footer__price">
      <b>
        Итого:
        <OrderPrice
          class="cart-footer__price-value"
          :content="content"
          :pizzas="currentOrder.pizzas"
          :misc="currentOrder.misc"
        />
      </b>
    </div>

    <div class="cart-footer__submit">
      <BlockButton type="submit" :disabled="!isValid || isSending">
        Оформить заказ
      </BlockButton>
    </div>
  </footer>
</template>

<script>
import OrderPrice from "@/modules/orders/components/OrderPrice.vue";
import CartMore from "@/modules/cart/components/CartMore.vue";

export default {
  name: "AppLayoutFooter",

  components: {
    OrderPrice,
    CartMore,
  },

  props: {
    content: {
      type: Object,
      required: true,
    },

    currentOrder: {
      type: Object,
      required: true,
    },

    isSending: {
      type: Boolean,
      default: false,
    },

    isValid: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.cart-footer {
  display: flex;
  align-items: center;

  margin-top: auto;
  padding: 25px 2.12%;

  background-color: rgba($green-500, 0.1);
}

.cart-footer__more {
  width: 220px;
  margin-right: 16px;
}

.cart-footer__text {
  @include l-s11-h13;

  color: rgba($black, 0.5);
}

.cart-footer__price {
  @include b-s24-h28;

  margin-right: 12px;
  margin-left: auto;
}

.cart-footer__submit {
  button {
    padding: 16px 14px;
  }
}
</style>
