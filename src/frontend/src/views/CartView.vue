<template>
  <div class="cart">
    <form
      v-if="currentOrder.pizzas.length"
      class="cart__order"
      action="test.html"
      method="post"
      @submit.prevent="handleOrder"
    >
      <BaseContent class="cart__content" title="Корзина">
        <BaseSheet>
          <CartList
            class="cart__list"
            :content="content"
            :pizzas="currentOrder.pizzas"
            @changePizzas="updateOrder({ pizzas: $event })"
          />
        </BaseSheet>

        <div class="cart__additional">
          <CartMiscList
            :misc="content.misc"
            :value="currentOrder.misc"
            @input="updateOrder({ misc: $event })"
          />
        </div>

        <div class="cart__form">
          <CartForm
            :addresses="addresses"
            :address="currentOrder.address"
            :phone="currentOrder.phone"
            @changePhone="updateOrder({ phone: $event })"
            @changeAddress="updateOrder({ address: $event })"
            @updateAddress="updateAddress"
            @order="handleOrder"
          />
        </div>
      </BaseContent>

      <CartFooter
        class="cart__footer"
        :content="content"
        :current-order="currentOrder"
        :is-valid="isValid"
        :is-sending="isSending"
      />
    </form>

    <BaseContent v-else class="cart__content" title="Корзина">
      <BaseSheet class="cart__empty">
        <p>{{ emptyMessage }}</p>
      </BaseSheet>
    </BaseContent>

    <Transition name="fade" @after-leave="leaveCart">
      <BasePopup class="cart__popup" v-if="isSended" @close="isSended = false">
        <CartStatus @close="isSended = false" />
      </BasePopup>
    </Transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { ADD_ORDER, UPDATE_ORDER } from "@/store/mutation-types";
import { createOrder } from "@/common/helpers";
import { Message } from "@/common/constants";
import CartList from "@/modules/cart/components/CartList.vue";
import CartMiscList from "@/modules/cart/components/CartMiscList.vue";
import CartForm from "@/modules/cart/components/CartForm.vue";
import CartFooter from "@/modules/cart/components/CartFooter.vue";
import CartStatus from "@/modules/cart/components/CartStatus.vue";

export default {
  name: "CartView",

  components: {
    CartList,
    CartMiscList,
    CartForm,
    CartFooter,
    CartStatus,
  },

  props: {
    content: {
      type: Object,
      required: true,
    },

    user: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      isSending: false,
      isSended: false,
      emptyMessage: Message.EMPTY_CART,
    };
  },

  computed: {
    ...mapState("Profile", ["addresses"]),

    ...mapState("Cart", ["currentOrder"]),

    isValid() {
      return Boolean(
        this.currentOrder.phone &&
          (!this.currentOrder.address ||
            (this.currentOrder.address.street &&
              this.currentOrder.address.building))
      );
    },
  },

  methods: {
    ...mapMutations("Cart", {
      updateOrder: UPDATE_ORDER,
    }),

    ...mapMutations("Orders", {
      addOrder: ADD_ORDER,
    }),

    updateAddress(override) {
      this.$emit("updateOrder", {
        address: {
          ...this.currentOrder.address,
          ...override,
        },
      });
    },

    leaveCart() {
      this.$router.push(this.user ? "/orders" : "/");
    },

    async handleOrder() {
      this.isSending = true;

      const data = await this.$store.dispatch(
        "Orders/addOrder",
        this.currentOrder
      );
      this.isSending = false;

      if (data) {
        this.addOrder(this.currentOrder);
        this.isSended = true;
        this.updateOrder({
          ...createOrder(),
          misc: this.content.misc.map(({ id }) => ({
            miscId: id,
            quantity: 0,
          })),
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cart__order {
  display: flex;
  flex-direction: column;

  // Учитываем высоту хедера, чтобы прибить футер к низу
  min-height: calc(100vh - 61px);
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
