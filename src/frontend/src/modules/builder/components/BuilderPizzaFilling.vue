<template>
  <div>
    <div
      v-for="i in quantity"
      :key="i"
      class="pizza-filling"
      :class="{
        [`pizza-filling--${alias}`]: true,
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
    alias: {
      type: String,
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

  &--ananas {
    background-image: url("~@/assets/img/filling-big/ananas.svg");
  }

  &--bacon {
    background-image: url("~@/assets/img/filling-big/bacon.svg");
  }

  &--blue_cheese {
    background-image: url("~@/assets/img/filling-big/blue_cheese.svg");
  }

  &--cheddar {
    background-image: url("~@/assets/img/filling-big/cheddar.svg");
  }

  &--chile {
    background-image: url("~@/assets/img/filling-big/chile.svg");
  }

  &--ham {
    background-image: url("~@/assets/img/filling-big/ham.svg");
  }

  &--jalapeno {
    background-image: url("~@/assets/img/filling-big/jalapeno.svg");
  }

  &--mozzarella {
    background-image: url("~@/assets/img/filling-big/mozzarella.svg");
  }

  &--mushrooms {
    background-image: url("~@/assets/img/filling-big/mushrooms.svg");
  }

  &--olives {
    background-image: url("~@/assets/img/filling-big/olives.svg");
  }

  &--onion {
    background-image: url("~@/assets/img/filling-big/onion.svg");
  }

  &--parmesan {
    background-image: url("~@/assets/img/filling-big/parmesan.svg");
  }

  &--salami {
    background-image: url("~@/assets/img/filling-big/salami.svg");
  }

  &--salmon {
    background-image: url("~@/assets/img/filling-big/salmon.svg");
  }

  &--tomatoes {
    background-image: url("~@/assets/img/filling-big/tomatoes.svg");
  }
}
</style>
