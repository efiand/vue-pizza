<template>
  <div class="cart-status">
    <BlockSubheading class="cart-status__title">
      Спасибо за заказ
    </BlockSubheading>

    <p>Мы начали готовить Ваш заказ, скоро привезём его вам &semi;&rpar;</p>

    <RouterLink class="cart-status__button button" :to="to">
      Отлично, я жду!
    </RouterLink>
  </div>
</template>

<script>
export default {
  name: "CartStatus",
  props: {
    to: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.cart-status {
  text-align: center;

  p {
    margin-top: 24px;
    margin-bottom: 24px;
  }
}

.cart-status__title {
  font-size: 1.95em;
  line-height: 16px;
}

.cart-status__button {
  display: block;
  padding: 15px 32px;
}
</style>
