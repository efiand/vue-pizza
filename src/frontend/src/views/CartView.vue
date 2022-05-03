<template>
  <form
    class="cart"
    action="test.html"
    method="post"
    @submit.prevent="$emit('order')"
  >
    <BlockContent class="cart__content" title="Корзина">
      <BlockSheet :class="{ cart__empty: !currentOrder.pizzas.length }">
        <CartList
          v-if="currentOrder.pizzas.length"
          :content="content"
          :pizzas="currentOrder.pizzas"
          @changePizzas="changeOrder"
        />
        <p v-else>В корзине нет ни одного товара</p>
      </BlockSheet>

      <div class="cart__additional">
        <CartAdditionalList
          :additions="content.additions"
          :value="currentOrder.additions"
          @input="$emit('changeAdditions', $event)"
        />
      </div>

      <div class="cart__form">
        <CartForm
          :delivery="currentOrder.delivery"
          @input="$emit('changeDelivery', $event)"
          @order="$emit('order')"
        />
      </div>
    </BlockContent>

    <CartFooter :content="content" :currentOrder="currentOrder" />
  </form>
</template>

<script>
import { contentPropMixin } from "@/common/mixins";
import CartList from "@/modules/cart/components/CartList.vue";
import CartAdditionalList from "@/modules/cart/components/CartAdditionalList.vue";
import CartForm from "@/modules/cart/components/CartForm.vue";
import CartFooter from "@/modules/cart/components/CartFooter.vue";

export default {
  name: "CartView",
  mixins: [contentPropMixin],
  components: {
    CartList,
    CartAdditionalList,
    CartForm,
    CartFooter,
  },
  props: {
    currentOrder: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      address: "",
    };
  },
  methods: {
    changeOrder(pizzas) {
      this.$emit("changeOrder", {
        ...this.currentOrder,
        pizzas,
      });
    },
  },
};
</script>

<style lang="scss">
.cart {
  display: flex;
  flex-direction: column;
  min-height: calc(
    100vh - 61px
  ); // Учитываем высоту хедера, чтобы прибить футер к низу
}

.cart__content {
  flex-grow: 1;
  width: 770px;
}

.cart__title {
  margin-bottom: 15px;
}

.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}

.cart__empty {
  padding: 20px 30px;
}
</style>
