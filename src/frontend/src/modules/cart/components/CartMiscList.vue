<template>
  <ul class="additional-list">
    <li
      class="additional-list__item"
      v-for="(misc, i) in mergedMisc"
      :key="misc.id"
    >
      <CartMiscListItem :misc="misc" @input="inputHandler($event, i)" />
    </li>
  </ul>
</template>

<script>
import CartMiscListItem from "@/modules/cart/components/CartMiscListItem.vue";

export default {
  name: "CartMiscList",

  components: { CartMiscListItem },

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

.additional-list__item {
  width: 200px;
  margin-right: 15px;
  margin-bottom: 15px;
}
</style>
