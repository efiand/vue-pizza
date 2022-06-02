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
    [ADD_PIZZA]({ currentOrder }, pizza) {
      currentOrder.pizzas.push(pizza);
    },
    [UPDATE_PIZZA]({ currentOrder }, { pizza, index }) {
      const { counter } = currentOrder.pizzas[index];

      currentOrder.pizzas[index] = {
        ...pizza,
        counter,
      };
    },
    [CHANGE_ORDER](state, newOrder) {
      state.currentOrder = newOrder;
    },
    [CHANGE_ADDITIONS]({ currentOrder }, additions) {
      currentOrder.additions = additions;
    },
    [CHANGE_DELIVERY]({ currentOrder }, delivery) {
      currentOrder.delivery = delivery;
    },
    [RESET_ORDER](state) {
      state.currentOrder = createOrder();
    },
  },
};
