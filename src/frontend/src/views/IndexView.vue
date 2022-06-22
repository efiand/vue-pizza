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
            :key="`dough-${option.id}`"
            :class="`index__dough-radio`"
            :style="`--bg: url(${option.image})`"
            name="dough"
            :option="option"
            :checked="option.id === pizza.doughId"
            big
            @change="pizza.doughId = option.id"
          />
        </div>
      </BlockSheet>

      <BlockSheet title="Выберите размер">
        <div class="index__content">
          <BlockRadio
            v-for="option of content.sizes"
            :key="`size-${option.id}`"
            :class="`index__size-radio index__size-radio--${option.id}`"
            :style="`--bg: url(${option.image})`"
            name="size"
            :option="option"
            :checked="option.id === pizza.sizeId"
            big
            @change="pizza.sizeId = option.id"
          />
        </div>
      </BlockSheet>

      <BlockSheet title="Выберите ингредиенты">
        <div class="index__content">
          <p>Основной соус:</p>
          <BlockRadio
            v-for="option of content.sauces"
            :key="`sauce-${option.id}`"
            class="index__sauce-radio"
            name="sauce"
            :option="option"
            :checked="option.id === pizza.sauceId"
            @change="pizza.sauceId = option.id"
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
          :doughId="pizza.doughId"
          :sizeId="pizza.sizeId"
          :sauceId="pizza.sauceId"
          :ingredients="pizza.ingredients"
          @change="pizza.ingredients = $event"
        />

        <div class="index__result">
          <p>
            Итого:
            <OrderPrice
              :content="content"
              :pizzas="[pizza]"
              :customCounter="1"
            />
          </p>
          <BlockButton type="submit" :disabled="!isReady">
            Готовьте!
          </BlockButton>
        </div>
      </div>
    </form>

    <Transition appear appear-active-class="fade-appear-active">
      <RouterView />
    </Transition>
  </BlockContent>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { UPDATE_ORDER } from "@/store/mutation-types";
import { cloneDeep } from "lodash";
import BuilderFillingSelector from "@/modules/builder/components/BuilderFillingSelector.vue";
import BuilderPizza from "@/modules/builder/components/BuilderPizza.vue";
import OrderPrice from "@/modules/orders/components/OrderPrice.vue";

export default {
  name: "IndexView",
  components: {
    BuilderPizza,
    BuilderFillingSelector,
    OrderPrice,
  },
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      index: -1,
      pizza: this.createPizza(),
    };
  },
  computed: {
    ...mapState("Cart", ["currentOrder"]),
    isReady() {
      return (
        this.pizza.name &&
        this.pizza.ingredients.some(({ quantity }) => quantity)
      );
    },
  },
  created() {
    const { i = -1 } = this.$route.query;
    const index = parseInt(i, 10);
    if (index > -1) {
      this.pizza = cloneDeep(this.currentOrder.pizzas[index]);
      this.index = index;
    }
  },
  methods: {
    ...mapMutations("Cart", {
      updateOrder: UPDATE_ORDER,
    }),
    addToCart() {
      if (this.index > -1) {
        this.updateOrder({
          pizzas: this.currentOrder.pizzas.map((pizza, i) =>
            this.index === i ? this.pizza : pizza
          ),
        });
        this.$router.push("/cart");
      } else {
        this.updateOrder({
          pizzas: [...this.currentOrder.pizzas, this.pizza],
        });
      }

      this.pizza = this.createPizza();
    },
    createPizza() {
      return {
        name: "",
        sauceId: 2,
        doughId: 1,
        sizeId: 2,
        quantity: 1,
        ingredients: this.content.ingredients.map(({ id }) => ({
          ingredientId: id,
          quantity: 0,
        })),
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
}

.index__size-radio {
  & + & {
    margin-left: 30px;
  }

  input {
    margin-right: 10px;
    background-color: $green-100;
  }

  &--1 input {
    background-size: 18px;
  }

  &--2 input {
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
