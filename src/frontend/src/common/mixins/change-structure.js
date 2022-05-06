export default {
  methods: {
    changeStructure(alias, quantity) {
      this.$emit("input", {
        ...this.value,
        [alias]: quantity,
      });
    },
  },
};
