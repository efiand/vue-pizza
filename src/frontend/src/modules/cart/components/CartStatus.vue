<template>
  <div class="cart-status">
    <BaseSubheading class="cart-status__title">
      Спасибо за заказ
    </BaseSubheading>

    <p class="cart-status__text">
      Мы начали готовить Ваш заказ, скоро привезём его вам &semi;&rpar;
    </p>

    <BaseButton class="cart-status__button" @click="$emit('close')">
      Отлично, я жду!
    </BaseButton>
  </div>
</template>

<script>
export default {
  name: "CartStatus",
};
</script>

<style lang="scss" scoped>
.cart-status {
  text-align: center;
}

.cart-status__text {
  margin-top: 24px;
  margin-bottom: 24px;
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
