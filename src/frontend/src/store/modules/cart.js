import { UPDATE_ORDER } from "@/store/mutation-types";
import { createOrder } from "@/common/helpers";

function backupOrder(data) {
  localStorage.setItem("currentOrder", JSON.stringify(data));
}

export default {
  namespaced: true,
  state: {
    currentOrder:
      JSON.parse(localStorage.getItem("currentOrder")) || createOrder(),
  },
  mutations: {
    [UPDATE_ORDER](state, addition) {
      state.currentOrder = {
        ...state.currentOrder,
        ...addition,
      };
      backupOrder(state.currentOrder);
    },
  },
};
