<template>
  <main class="content">
    <form action="#" method="post" @submit.prevent>
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <BuilderDoughSelector
              className="sheet__content"
              :dough="currentPizza.dough"
              @change="currentPizza.dough = $event"
            />
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <BuilderSizeSelector
              className="sheet__content"
              :sizes="currentPizza.sizes"
              @change="currentPizza.sizes = $event"
            />
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <BuilderIngredientsSelector
              className="sheet__content"
              :sauces="currentPizza.sauces"
              :ingredients="currentPizza.ingredients"
              @changeSauces="currentPizza.sauces = $event"
              @changeIngredients="currentPizza.ingredients = $event"
            />
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
              v-model="currentPizza.name"
            />
          </label>

          <div class="content__constructor">
            <BuilderPizzaView
              :pizza="currentPizza"
              @change="currentPizza = $event"
            />
          </div>

          <div class="content__result">
            <p>Итого: {{ price }} ₽</p>
            <button
              type="button"
              class="button"
              :disabled="!isReady"
              @click="addPizza"
            >
              Готовьте!
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import { cloneDeep } from "lodash";
import { DEFAULT_PIZZA_SIZE } from "@/common/constants";
import {
  makeCheckable,
  findCheckedItem,
  accumulateSumByKey,
} from "@/common/utils";
import { dough, sauces, ingredients, sizes } from "@/static/pizza.json";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";

const initialPizza = {
  name: "",
  dough: dough.map(makeCheckable),
  sauces: sauces.map(makeCheckable),
  ingredients: ingredients.map((ingredient) => ({
    ...ingredient,
    quantity: 0,
  })),
  sizes: sizes.map((size) => ({
    ...size,
    checked: size.alias === DEFAULT_PIZZA_SIZE,
  })),
};

export default {
  name: "IndexView",
  components: {
    BuilderPizzaView,
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
  },
  data() {
    return {
      currentPizza: cloneDeep(initialPizza),
    };
  },
  computed: {
    checkedIngredients() {
      return this.currentPizza.ingredients.filter(({ quantity }) => quantity);
    },
    isReady() {
      return (
        this.currentPizza.name &&
        this.currentPizza.ingredients.some(({ quantity }) => quantity)
      );
    },
    price() {
      const { dough, sauces, sizes } = this.currentPizza;
      const doughSum = accumulateSumByKey(dough, "price");
      const saucesSum = accumulateSumByKey(sauces, "price");
      const ingredientsSum = accumulateSumByKey(
        this.checkedIngredients,
        "price",
        (item) => item.quantity
      );
      const { multiplier } = findCheckedItem(sizes);

      return (doughSum + saucesSum + ingredientsSum) * multiplier;
    },
  },
  methods: {
    addPizza() {
      this.$emit("order", {
        ...this.currentPizza,
        price: this.price,
      });

      this.currentPizza = cloneDeep(initialPizza);
    },
  },
};
</script>
