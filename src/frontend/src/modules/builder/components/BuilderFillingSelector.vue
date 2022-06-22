<template>
  <div class="filling">
    <p>Начинка:</p>

    <ul class="filling__list">
      <li
        v-for="(ingredient, i) of mergedIngredients"
        :key="ingredient.id"
        class="filling__item"
      >
        <AppDrag
          :transferData="{ ingredientId: ingredient.id }"
          :draggable="ingredient.quantity < max"
        >
          <span
            :class="`filling__name`"
            :style="`--bg: url(${ingredient.image})`"
          >
            {{ ingredient.name }}
          </span>
        </AppDrag>

        <BlockCounter
          class="filling__counter"
          v-model.number="ingredient.quantity"
          :max="max"
          @input="inputHandler($event, i)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { MAX_INGREDIENT_QUANTITY } from "@/common/constants";

export default {
  name: "BuilderFillingSelector",
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
    value: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      max: MAX_INGREDIENT_QUANTITY,
    };
  },
  computed: {
    mergedIngredients() {
      return this.ingredients.map((item) => {
        const { quantity } = this.value.find(
          ({ ingredientId }) => ingredientId === item.id
        );

        return {
          ...item,
          quantity,
        };
      });
    },
  },
  methods: {
    inputHandler(quantity, i) {
      const newValue = this.value.slice();
      newValue[i].quantity = quantity;

      this.$emit("input", newValue);
    },
  },
};
</script>

<style lang="scss">
.filling {
  width: 100%;

  p {
    margin-top: 24px;
    margin-bottom: 16px;
  }
}

.filling__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: -35px 0 0 -17px;
}

.filling__item {
  width: 100px;
  min-height: 40px;
  margin-top: 35px;
  margin-left: 17px;
}

.filling__name {
  @include r-s14-h16;

  position: relative;

  display: block;

  padding-left: 36px;

  &::before {
    @include p_center-v;

    display: block;

    width: 32px;
    height: 32px;

    content: "";

    border-radius: 50%;
    background-color: $white;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80% 80%;
    background-image: var(--bg);
  }
}

.filling__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}
</style>
