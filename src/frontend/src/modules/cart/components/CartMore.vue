<template>
  <RouterLink class="cart-more" to="/">Хочу еще одну</RouterLink>
</template>

<script>
export default {
  name: "CartMore",
};
</script>

<style lang="scss" scoped>
.cart-more {
  box-sizing: border-box;
  padding: 16px 0;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  color: inherit;
  text-align: center;
  border: 1px solid $green-500;
  border-radius: 8px;
  outline: none;
  transition: 0.3s;

  &:hover {
    color: $green-500;
  }

  &:active {
    color: $green-600;
    border-color: $green-600;
  }

  &:focus {
    opacity: 0.5;
  }

  &::before {
    content: "";
    background-image: url("~@/assets/img/button-arrow.svg");
    background-position: center;
    background-repeat: no-repeat;
    margin-right: 16px;
    width: 18px;
    height: 18px;
    display: inline-block;
    vertical-align: middle;
    transform: translateY(-1px);
  }
}
</style>
