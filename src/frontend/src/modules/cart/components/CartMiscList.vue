<template>
  <ul class="additional-list">
    <BlockSheet v-for="(misc, i) in mergedMisc" :key="misc.id">
      <li class="additional-list__item">
        <p class="additional-list__description">
          <BlockPicture
            class="additional-list__img"
            :srcset="[misc.image]"
            :alt="misc.name"
            width="39"
            height="60"
            remote
          />
          <span>{{ misc.name }}</span>
        </p>

        <div class="additional-list__wrapper">
          <BlockCounter
            class="additional-list__counter"
            v-model.number="misc.quantity"
            secondaryStyle
            @input="inputHandler($event, i)"
          />

          <div class="additional-list__price">
            <b>× {{ spacifyNumber(misc.quantity * misc.price) }} ₽</b>
          </div>
        </div>
      </li>
    </BlockSheet>
  </ul>
</template>

<script>
import { spacifyNumber } from "@/common/utils";

export default {
  name: "CartMiscList",
  props: {
    misc: {
      type: Array,
      required: true,
    },
    value: {
      type: Array,
      required: true,
    },
  },
  computed: {
    mergedMisc() {
      return this.misc.map((item) => {
        const { quantity } = this.value.find(
          ({ miscId }) => miscId === item.id
        );

        return {
          ...item,
          quantity,
        };
      });
    },
  },
  methods: {
    spacifyNumber,
    inputHandler(quantity, i) {
      const newValue = this.value.slice();
      newValue[i].quantity = quantity;

      this.$emit("input", newValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.additional-list {
  @include clear-list;

  display: flex;
  flex-wrap: wrap;
}

.additional-list__description {
  display: flex;
  align-items: flex-start;

  margin: 0;
  margin-bottom: 8px;
}

.additional-list__item {
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
  padding-top: 15px;
  padding-bottom: 15px;

  span {
    @include b-s14-h16;

    display: inline;

    width: 100px;
    margin-right: 15px;
  }
}

.additional-list__img {
  margin-right: 10px;
  margin-left: 15px;
}

.additional-list__wrapper {
  display: flex;
  align-items: center;

  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding-top: 18px;
  padding-right: 15px;
  padding-left: 15px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.additional-list__counter {
  width: 54px;
  margin-right: auto;
}

.additional-list__price {
  @include b-s16-h19;
}
</style>
