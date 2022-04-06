<template>
  <div class="sheet__content ingredients">
    <div class="ingredients__sauce">
      <p>Основной соус:</p>

      <RadioButton
        v-for="sauce of sauces"
        :key="`sauce-${sauce.id}`"
        className="radio ingredients__input"
        name="sauce"
        :value="sauce.alias"
        :label="sauce.name"
        :checked="sauce.checked"
        @change="changeSauces(sauce)"
      />
    </div>

    <div class="ingredients__filling">
      <p>Начинка:</p>

      <ul class="ingredients__list">
        <li
          v-for="ingredient in ingredients"
          :key="ingredient.id"
          class="ingredients__item"
        >
          <AppDrag
            :transferData="{ ingredient: ingredient.alias }"
            :draggable="ingredient.quantity < max"
          >
            <span :class="`filling filling--${ingredient.alias}`">
              {{ ingredient.name }}
            </span>
          </AppDrag>

          <ItemCounter
            :quantity="ingredient.quantity"
            :max="max"
            @change="changeIngredients(ingredient, $event)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { MAX_INGREDIENT_QUANTITY } from "@/common/constants";
import { changeRadio } from "@/common/utils";
import RadioButton from "@/common/components/RadioButton.vue";
import ItemCounter from "@/common/components/ItemCounter.vue";
import AppDrag from "@/common/components/AppDrag.vue";

export default {
  name: "BuilderIngredientsSelector",
  components: {
    RadioButton,
    ItemCounter,
    AppDrag,
  },
  props: {
    className: {
      type: String,
      default: "",
    },
    sauces: {
      type: Array,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      max: MAX_INGREDIENT_QUANTITY,
    };
  },
  methods: {
    changeSauces(sauce) {
      this.$emit("changeSauces", changeRadio(this.sauces, sauce));
    },
    changeIngredients(ingredient, quantity) {
      ingredient.quantity = quantity;
      this.$emit("changeIngredients", this.ingredients);
    },
  },
};
</script>

<style lang="scss">
.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}
</style>
