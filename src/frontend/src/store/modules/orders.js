import { ADD_ORDER, DELETE_ORDER } from "@/store/mutation-types";

export default {
  namespaced: true,
  state: {
    orders: [],
  },
  mutations: {
    [ADD_ORDER]({ orders }, newOrder) {
      orders.push(newOrder);
    },
    [DELETE_ORDER]({ orders }, order) {
      orders.splice(orders.indexOf(order), 1);
    },
  },
};
