<template>
  <div class="cart-status">
    <BlockSubheading class="cart-status__title">
      Спасибо за заказ
    </BlockSubheading>

    <p>Мы начали готовить Ваш заказ, скоро привезём его вам &semi;&rpar;</p>

    <BlockButton class="cart-status__button" @click="$emit('close')">
      Отлично, я жду!
    </BlockButton>
  </div>
</template>

<script>
export default {
  name: "CartStatus",
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
  width: 100%;
  padding: 15px 32px;
}
</style>
