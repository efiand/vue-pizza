<template>
  <BlockSheet class="order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #11199929</b>
      </div>

      <div class="order__sum">
        <span>
          Сумма заказа:
          <OrderPrice
            :content="content"
            :pizzas="currentOrder.pizzas"
            :additions="currentOrder.additions"
          />
        </span>
      </div>

      <div class="order__button">
        <BlockButton bordered @click="$emit('deleteOrder', currentOrder)">
          Удалить
        </BlockButton>
      </div>
      <div class="order__button">
        <BlockButton @click="repeatHandler"> Повторить </BlockButton>
      </div>
    </div>

    <ul v-if="currentOrder.pizzas.length" class="order__list">
      <li
        v-for="pizza of currentOrder.pizzas"
        :key="pizza.name"
        class="order__item"
      >
        <ProductCard :content="content" :pizza="pizza" />

        <p class="order__price">
          {{ pizza.counter > 1 ? `${pizza.counter}x` : "" }}
          <OrderPrice :content="content" :pizzas="[pizza]" :customCounter="1" />
        </p>
      </li>
    </ul>

    <ul v-if="additions.length" class="order__additional">
      <li v-for="{ alias, name, price, counter } of additions" :key="alias">
        <BlockPicture
          :srcset="[`${alias}.svg`]"
          :alt="name"
          width="20"
          height="30"
        />
        <p>
          <span>{{ name }}</span>
          <b>{{ counter > 1 ? `${counter}x` : "" }}{{ price }} ₽</b>
        </p>
      </li>
    </ul>

    <p class="order__address">Адрес доставки: {{ address }}</p>
  </BlockSheet>
</template>

<script>
import { cloneDeep } from "lodash";
import { findItemByAlias } from "@/common/utils";
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
    additions() {
      return Object.entries(this.currentOrder.additions)
        .filter(([, counter]) => counter)
        .map(([alias, counter]) => ({
          ...findItemByAlias(this.content.additions, alias),
          counter,
        }));
    },
    address() {
      return formatAddress(this.currentOrder.delivery);
    },
  },
  methods: {
    repeatHandler() {
      this.$emit("changeOrder", cloneDeep(this.currentOrder));
      this.$router.push("/cart");
    },
  },
};
</script>

<style lang="scss">
.order__wrapper {
  display: flex;
  align-items: center;

  padding: 6px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  b {
    font-size: 14px;
  }

  span {
    @include b-s14-h16;
  }

  button {
    padding: 8px 26px;
  }
}

.order__number {
  margin-right: auto;
}

.order__sum {
  margin-right: 16px;
}

.order__button {
  margin-left: 16px;
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

  white-space: nowrap;
}

.order__additional {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 5px;
  padding-left: 80px;

  li {
    @include b-s11-h16;

    width: 130px;
    margin-right: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  img {
    float: left;

    margin-right: 7px;
  }

  b {
    display: block;
  }
}

.order__address {
  @include l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba($green-500, 0.1);
}
</style>
