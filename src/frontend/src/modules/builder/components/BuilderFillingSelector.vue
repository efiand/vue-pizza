<template>
  <div class="filling">
    <p>Начинка:</p>

    <ul class="filling__list">
      <li
        v-for="{ alias, name } of ingredients"
        :key="alias"
        class="filling__item"
      >
        <AppDrag
          :transferData="{ ingredient: alias }"
          :draggable="value[alias] < max"
        >
          <span :class="`filling__name filling__name--${alias}`">
            {{ name }}
          </span>
        </AppDrag>

        <BlockCounter
          class="filling__counter"
          v-model.number="value[alias]"
          :max="max"
          @input="changeStructure(alias, $event)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { MAX_INGREDIENT_QUANTITY } from "@/common/constants";
import { changeStructureMixin } from "@/common/mixins";

export default {
  name: "BuilderFillingSelector",
  mixins: [changeStructureMixin],
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      max: MAX_INGREDIENT_QUANTITY,
    };
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
  }

  &--tomatoes::before {
    background-image: url("~@/assets/img/filling/tomatoes.svg");
  }

  &--ananas::before {
    background-image: url("~@/assets/img/filling/ananas.svg");
  }

  &--bacon::before {
    background-image: url("~@/assets/img/filling/bacon.svg");
  }

  &--blue_cheese::before {
    background-image: url("~@/assets/img/filling/blue_cheese.svg");
  }

  &--cheddar::before {
    background-image: url("~@/assets/img/filling/cheddar.svg");
  }

  &--chile::before {
    background-image: url("~@/assets/img/filling/chile.svg");
  }

  &--ham::before {
    background-image: url("~@/assets/img/filling/ham.svg");
  }

  &--jalapeno::before {
    background-image: url("~@/assets/img/filling/jalapeno.svg");
  }

  &--mozzarella::before {
    background-image: url("~@/assets/img/filling/mozzarella.svg");
  }

  &--mushrooms::before {
    background-image: url("~@/assets/img/filling/mushrooms.svg");
  }

  &--olives::before {
    background-image: url("~@/assets/img/filling/olives.svg");
  }

  &--onion::before {
    background-image: url("~@/assets/img/filling/onion.svg");
  }

  &--parmesan::before {
    background-image: url("~@/assets/img/filling/parmesan.svg");
  }

  &--salami::before {
    background-image: url("~@/assets/img/filling/salami.svg");
  }

  &--salmon::before {
    background-image: url("~@/assets/img/filling/salmon.svg");
  }
}

.filling__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}
</style>
