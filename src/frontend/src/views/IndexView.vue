<template>
  <BlockContent class="index" title="Конструктор пиццы">
    <form
      class="index__body"
      action="#"
      method="post"
      @submit.prevent="addToCart"
    >
      <BlockSheet title="Выберите тесто">
        <div class="index__content">
          <BlockRadio
            v-for="option of content.dough"
            :key="`dough-${option.alias}`"
            :class="`index__dough-radio index__dough-radio--${option.alias}`"
            name="dough"
            :option="option"
            :checked="option.alias === pizza.dough"
            big
            @change="pizza.dough = option.alias"
          />
        </div>
      </BlockSheet>

      <BlockSheet title="Выберите размер">
        <div class="index__content">
          <BlockRadio
            v-for="option of content.sizes"
            :key="`size-${option.alias}`"
            :class="`index__size-radio index__size-radio--${option.alias}`"
            name="size"
            :option="option"
            :checked="option.alias === pizza.size"
            big
            @change="pizza.size = option.alias"
          />
        </div>
      </BlockSheet>

      <BlockSheet title="Выберите ингредиенты">
        <div class="index__content">
          <p>Основной соус:</p>
          <BlockRadio
            v-for="option of content.sauces"
            :key="`sauce-${option.alias}`"
            class="index__sauce-radio"
            name="sauce"
            :option="option"
            :checked="option.alias === pizza.sauce"
            @change="pizza.sauce = option.alias"
          />

          <BuilderFillingSelector
            :ingredients="content.ingredients"
            :value="pizza.ingredients"
            @input="pizza.ingredients = $event"
          />
        </div>
      </BlockSheet>

      <div>
        <BlockInput
          label="Название пиццы:"
          hideLabel
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
          <p>Итого: {{ pizzaPrice }} ₽</p>
          <BlockButton type="submit" :disabled="!isReady">
            Готовьте!
          </BlockButton>
        </div>
      </div>
    </form>

    <RouterView @login="$emit('login')" />
  </BlockContent>
</template>

<script>
import { cloneDeep } from "lodash";
import { accumulateStructureByAliases } from "@/common/utils";
import { contentPropMixin, pizzaPriceMixin } from "@/common/mixins";
import BuilderFillingSelector from "@/modules/builder/components/BuilderFillingSelector.vue";
import BuilderPizza from "@/modules/builder/components/BuilderPizza.vue";

export default {
  name: "IndexView",
  mixins: [contentPropMixin, pizzaPriceMixin],
  components: {
    BuilderPizza,
    BuilderFillingSelector,
  },
  props: {
    currentOrder: {
      type: Object,
      required: true,
    },
  },
  data() {
    const { pizzaName = "" } = this.$route.query;
    const changedPizza = this.currentOrder.pizzas.find(
      ({ name }) => name === pizzaName
    );
    if (!changedPizza && pizzaName) {
      this.$router.push({ query: {} });
    }

    return {
      changedPizza,
      pizza: changedPizza ? cloneDeep(changedPizza) : this.createPizza(),
    };
  },
  computed: {
    isReady() {
      return (
        this.pizza.name &&
        Object.values(this.pizza.ingredients).some((quantity) => quantity)
      );
    },
    pizzaPrice() {
      return this.getFormattedPizzaPrice(this.pizza, 1);
    },
  },
  methods: {
    addToCart() {
      if (this.changedPizza) {
        this.$emit("updatePizza", {
          pizza: this.pizza,
          index: this.currentOrder.pizzas.indexOf(this.changedPizza),
        });
        this.$router.push("/cart");
      } else {
        this.$emit("createPizza", this.pizza);
      }

      this.pizza = this.createPizza();
    },
    createPizza() {
      return {
        name: "",
        ingredients: accumulateStructureByAliases(this.content.ingredients),
        dough: "light",
        sauce: "tomato",
        size: "normal",
        counter: 1,
      };
    },
  },
};
</script>

<style lang="scss">
.index {
  width: 920px;
}

.index__body {
  display: grid;
  grid-template-columns: 1fr 373px;
  gap: 30px 20px;
}

.index__content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 16px 18px 18px;
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
