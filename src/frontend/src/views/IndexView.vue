<template>
  <main class="index">
    <BlockHeading>Конструктор пиццы</BlockHeading>

    <form
      class="index__body"
      action="#"
      method="post"
      @submit.prevent="addToCart"
    >
      <BlockSheet title="Выберите тесто">
        <BlockRadio
          v-for="option of dough"
          :key="`dough-${option.alias}`"
          :class="`index__dough-radio index__dough-radio--${option.alias}`"
          name="dough"
          :option="option"
          :checked="option.alias === pizza.dough"
          big
          @change="pizza.dough = option.alias"
        />
      </BlockSheet>

      <BlockSheet title="Выберите размер">
        <BlockRadio
          v-for="option of sizes"
          :key="`size-${option.alias}`"
          :class="`index__size-radio index__size-radio--${option.alias}`"
          name="size"
          :option="option"
          :checked="option.alias === pizza.size"
          big
          @change="pizza.size = option.alias"
        />
      </BlockSheet>

      <BlockSheet title="Выберите ингредиенты">
        <p>Основной соус:</p>
        <BlockRadio
          v-for="option of sauces"
          :key="`sauce-${option.alias}`"
          class="index__sauce-radio"
          name="sauce"
          :option="option"
          :checked="option.alias === pizza.sauce"
          @change="pizza.sauce = option.alias"
        />

        <BuilderFillingSelector
          :ingredients="ingredients"
          :value="pizza.ingredients"
          @input="pizza.ingredients = $event"
        />
      </BlockSheet>

      <div>
        <BlockInput
          title="Название пиццы"
          placeholder="Введите название пиццы"
          name="pizza_name"
          v-model="pizza.name"
        />

        <BuilderPizza
          class="index__pizza"
          :dough="pizza.dough"
          :size="pizza.size"
          :sauce="pizza.sauce"
          :ingredients="pizza.ingredients"
          @change="pizza.ingredients = $event"
        />

        <div class="index__result">
          <p>Итого: {{ price }} ₽</p>
          <BlockButton type="submit" :disabled="!isReady">
            Готовьте!
          </BlockButton>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import { dough, sauces, ingredients, sizes } from "@/static/pizza.json";
import { findItemByAlias, accumulateSumByKey } from "@/common/utils.js";
import BlockHeading from "@/common/components/BlockHeading.vue";
import BlockSheet from "@/common/components/BlockSheet.vue";
import BlockRadio from "@/common/components/BlockRadio.vue";
import BlockInput from "@/common/components/BlockInput.vue";
import BlockButton from "@/common/components/BlockButton.vue";
import BuilderFillingSelector from "@/modules/builder/components/BuilderFillingSelector.vue";
import BuilderPizza from "@/modules/builder/components/BuilderPizza.vue";

function createPizza() {
  return {
    name: "",
    ingredients: ingredients.reduce((obj, { alias }) => {
      obj[alias] = 0;
      return obj;
    }, {}),
    dough: "light",
    sauce: "tomato",
    size: "normal",
  };
}

export default {
  name: "IndexView",
  components: {
    BlockHeading,
    BlockSheet,
    BlockRadio,
    BlockInput,
    BlockButton,
    BuilderPizza,
    BuilderFillingSelector,
  },
  data() {
    return {
      dough,
      sauces,
      ingredients,
      sizes,
      pizza: createPizza(),
    };
  },
  computed: {
    isReady() {
      return (
        this.pizza.name &&
        Object.values(this.pizza.ingredients).some((quantity) => quantity)
      );
    },
    price() {
      const { dough, sauce, size, ingredients } = this.pizza;
      const doughPrice = findItemByAlias(this.dough, dough).price;
      const saucesPrice = findItemByAlias(this.sauces, sauce).price;
      const ingredientsPrice = accumulateSumByKey(
        this.ingredients,
        "price",
        ({ alias }) => ingredients[alias]
      );
      const { multiplier } = findItemByAlias(this.sizes, size);

      return (doughPrice + saucesPrice + ingredientsPrice) * multiplier;
    },
  },
  methods: {
    addToCart() {
      this.$emit("order", {
        ...this.pizza,
        price: this.price,
      });

      this.pizza = createPizza();
    },
  },
};
</script>

<style lang="scss">
.index {
  width: 920px;
  margin: 0 auto;
  padding: 20px 2.12% 30px;
}

.index__body {
  display: grid;
  grid-template-columns: 1fr 373px;
  gap: 30px 20px;
  padding-top: 15px;
}

.index__dough-radio {
  margin-right: 40px;

  input {
    margin-right: 14px;
  }

  &--light input {
    background-image: url("~@/assets/img/dough-light.svg");
  }

  &--large input {
    background-image: url("~@/assets/img/dough-large.svg");
  }
}

.index__size-radio {
  & + & {
    margin-left: 30px;
  }

  input {
    margin-right: 10px;
    background-color: $green-100;
    background-image: url("~@/assets/img/diameter.svg");
  }

  &--small input {
    background-size: 18px;
  }

  &--normal input {
    background-size: 29px;
  }
}

.index__sauce-radio {
  margin-left: 24px;

  &:first-of-type {
    margin-left: 16px;
  }
}

.index__pizza {
  margin: 25px auto;
  width: 315px;
  height: 315px;
}

.index__result {
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
  }
}
</style>
