<template>
  <div>
    <div
      v-for="i in quantity"
      :key="i"
      class="pizza-filling"
      :class="{
        [`pizza-filling--ingredient--${id}`]: true,
        'pizza-filling--second': i === 2,
        'pizza-filling--third': i === 3,
      }"
    />
  </div>
</template>

<script>
export default {
  name: "BuilderPizzaFilling",
  props: {
    id: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.pizza-filling {
  position: absolute;
  top: 0;
  left: 0;

  display: block;

  width: 100%;
  height: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--second {
    transform: rotate(45deg);
  }

  &--third {
    transform: rotate(-45deg);
  }

  &--ingredient--1 {
    background-image: url("~@/assets/img/filling-big/mushrooms.svg");
  }

  &--ingredient--2 {
    background-image: url("~@/assets/img/filling-big/cheddar.svg");
  }

  &--ingredient--3 {
    background-image: url("~@/assets/img/filling-big/tomatoes.svg");
  }

  &--ingredient--4 {
    background-image: url("~@/assets/img/filling-big/salmon.svg");
  }

  &--ingredient--5 {
    background-image: url("~@/assets/img/filling-big/mozzarella.svg");
  }

  &--ingredient--6 {
    background-image: url("~@/assets/img/filling-big/parmesan.svg");
  }

  &--ingredient--7 {
    background-image: url("~@/assets/img/filling-big/salami.svg");
  }

  &--ingredient--8 {
    background-image: url("~@/assets/img/filling-big/ham.svg");
  }

  &--ingredient--9 {
    background-image: url("~@/assets/img/filling-big/ananas.svg");
  }

  &--ingredient--10 {
    background-image: url("~@/assets/img/filling-big/blue_cheese.svg");
  }

  &--ingredient--11 {
    background-image: url("~@/assets/img/filling-big/bacon.svg");
  }

  &--ingredient--12 {
    background-image: url("~@/assets/img/filling-big/onion.svg");
  }

  &--ingredient--13 {
    background-image: url("~@/assets/img/filling-big/chile.svg");
  }

  &--ingredient--14 {
    background-image: url("~@/assets/img/filling-big/jalapeno.svg");
  }

  &--ingredient--15 {
    background-image: url("~@/assets/img/filling-big/olives.svg");
  }
}
</style>
