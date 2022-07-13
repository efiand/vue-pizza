import { uniqueId } from "lodash";
import { ADD_NOTIFICATION, DELETE_NOTIFICATION } from "@/store/mutation-types";
import { MESSAGE_LIVE_TIME } from "@/common/constants";

export default {
  namespaced: true,
  state: {
    notifications: [],
  },
  mutations: {
    [ADD_NOTIFICATION](state, notification) {
      state.notifications = [...state.notifications, notification];
    },
    [DELETE_NOTIFICATION](state, id) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== id
      );
    },
  },
  actions: {
    create({ commit }, { ...notification }) {
      const id = uniqueId();

      const uniqueNotification = {
        ...notification,
        id,
      };
      commit(ADD_NOTIFICATION, uniqueNotification);
      setTimeout(() => commit(DELETE_NOTIFICATION, id), MESSAGE_LIVE_TIME);

      return id;
    },
    delete({ commit }, id) {
      commit(DELETE_NOTIFICATION, id);
    },
  },
};
