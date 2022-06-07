import { ADD_ORDER, DELETE_ORDER } from "@/store/mutation-types";

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  mutations: {
    [ADD_ORDER](state, newOrder) {
      state.orders.push(newOrder);
    },
    [DELETE_ORDER](state, order) {
      const index = state.orders.indexOf(order);

      if (index !== -1) {
        state.orders.splice(index, 1);
      }
    },
  },
};
