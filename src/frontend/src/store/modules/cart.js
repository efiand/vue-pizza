import Vue from "vue";
import additions from "@/static/misc.json";
import { accumulateStructureByAliases } from "@/common/utils";
import {
  ADD_PIZZA,
  UPDATE_PIZZA,
  CHANGE_ORDER,
  CHANGE_ADDITIONS,
  CHANGE_DELIVERY,
  RESET_ORDER,
} from "@/store/mutation-types";

function createOrder() {
  return {
    pizzas: [],
    additions: accumulateStructureByAliases(additions),
    delivery: {
      mode: "no",
      tel: "",
      street: "",
      house: "",
      apartment: "",
    },
  };
}

export default {
  namespaced: true,
  state: {
    currentOrder: createOrder(),
  },
  mutations: {
    [ADD_PIZZA](state, pizza) {
      state.currentOrder.pizzas.push(pizza);
    },
    [UPDATE_PIZZA](state, { pizza, index }) {
      const { pizzas } = state.currentOrder;

      Vue.set(pizzas, index, {
        ...pizza,
        counter: pizzas[index].counter,
      });
    },
    [CHANGE_ORDER](state, newOrder) {
      state.currentOrder = newOrder;
    },
    [CHANGE_ADDITIONS](state, additions) {
      state.currentOrder.additions = additions;
    },
    [CHANGE_DELIVERY](state, delivery) {
      state.currentOrder.delivery = delivery;
    },
    [RESET_ORDER](state) {
      state.currentOrder = createOrder();
    },
  },
};
