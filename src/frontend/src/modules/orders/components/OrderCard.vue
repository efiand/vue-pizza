<template>
  <BaseSheet class="order">
    <div class="order__wrapper">
      <div class="order__number">Заказ #{{ currentOrder.id }}</div>

      <div class="order__sum">
        Сумма заказа:
        <OrderPrice
          class="order__price"
          :content="content"
          :pizzas="currentOrder.pizzas"
          :misc="currentOrder.misc"
        >
        </OrderPrice>
      </div>

      <BaseButton
        class="order__button"
        bordered
        :data-test="`delete-order-${currentOrder.id}`"
        @click="$emit('deleteOrder', currentOrder)"
      >
        Удалить
      </BaseButton>

      <BaseButton
        class="order__button"
        :data-test="`repeat-order-${currentOrder.id}`"
        @click="repeatHandler"
      >
        Повторить
      </BaseButton>
    </div>

    <ul class="order__list" v-if="currentOrder.pizzas.length">
      <li
        class="order__item"
        v-for="pizza of currentOrder.pizzas"
        :key="pizza.name"
      >
        <ProductCard :content="content" :pizza="pizza">
          <p class="order__price">
            {{ pizza.counter > 1 ? `${pizza.counter}x` : "" }}
            <OrderPrice
              :content="content"
              :pizzas="[pizza]"
              :custom-counter="1"
            >
            </OrderPrice>
          </p>
        </ProductCard>
      </li>
    </ul>

    <ul class="order__additional" v-if="misc.length">
      <li
        class="order__misc"
        v-for="{ id, image, name, price, quantity } of misc"
        :key="id"
      >
        <BasePicture
          className="left"
          :srcset="[image]"
          :alt="name"
          width="20"
          height="30"
          remote
        />
        <p class="order__misc-content">
          <span class="order__misc-name">{{ name }}</span>
          <b class="order__misc-price">
            {{ quantity > 1 ? `${quantity}x` : "" }}{{ price }} ₽
          </b>
        </p>
      </li>
    </ul>

    <p class="order__address" v-if="address">Адрес доставки: {{ address }}</p>
  </BaseSheet>
</template>

<script>
import { cloneDeep } from "lodash";
import { findItemById } from "@/common/utils";
import { formatAddress } from "@/modules/profile/helpers";
import OrderPrice from "@/modules/orders/components/OrderPrice.vue";
import ProductCard from "@/modules/product/components/ProductCard.vue";

export default {
  name: "OrderCard",

  components: {
    OrderPrice,
    ProductCard,
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
  },

  computed: {
    misc() {
      return this.currentOrder.misc
        .filter(({ quantity }) => quantity)
        .map(({ miscId, quantity }) => ({
          ...findItemById(this.content.misc, miscId),
          quantity,
        }));
    },

    address() {
      if (!this.currentOrder.address) {
        return null;
      }

      return formatAddress(this.currentOrder.address);
    },
  },

  methods: {
    repeatHandler() {
      const newOrder = cloneDeep(this.currentOrder);
      delete newOrder.id;

      this.$emit("repeatOrder", newOrder);
    },
  },
};
</script>

<style lang="scss" scoped>
.order__wrapper {
  display: flex;
  align-items: center;

  padding: 6px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);
}

.order__number {
  margin-right: auto;
  font-weight: 700;
  font-size: 14px;
}

.order__sum {
  @include b-s14-h16;

  margin-right: 16px;
}

.order__button {
  margin-left: 16px;
  padding: 8px 26px;
}

.order__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}

.order__item {
  display: flex;

  width: 310px;
  margin-right: 33px;
  margin-bottom: 32px;
}

.order__price {
  @include b-s16-h19;

  margin: 0 0 0 32px;
  font-size: 14px;

  white-space: nowrap;
}

.order__additional {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 5px;
  padding-left: 80px;
}

.order__misc {
  @include b-s11-h16;

  width: 130px;
  margin-right: 24px;
  margin-bottom: 10px;
}

.order__misc-price {
  display: block;
}

.order__misc-content {
  margin: 0;
}

.order__address {
  @include l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba($green-500, 0.1);
}
</style>
