import Vue from "vue";
import {
  SET_ADDRESSES,
  ADD_ADDRESS,
  UPDATE_ADDRESS,
  DELETE_ADDRESS,
  UPDATE_ORDER,
  LOGIN,
  LOGOUT,
} from "@/store/mutation-types";
import { adaptUserData, createAddress, adaptAddress } from "@/common/helpers";

export default {
  namespaced: true,
  state: {
    user: null,
    addresses: [],
  },
  getters: {
    getUserAttribute(state) {
      return (attr) => (state.user ? state.user[attr] : "");
    },
  },
  mutations: {
    [LOGIN](state, user) {
      state.user = user;
    },
    [LOGOUT](state) {
      state.user = null;
    },
    [SET_ADDRESSES](state, addresses) {
      state.addresses = addresses.map(adaptAddress);
    },
    [ADD_ADDRESS](state, address) {
      state.addresses = [...state.addresses, address];
    },
    [UPDATE_ADDRESS](state, address) {
      const index = state.addresses.indexOf(address);

      Vue.set(state.addresses, index, address);
    },
    [DELETE_ADDRESS](state, id) {
      state.addresses = state.addresses.filter((address) => address.id !== id);
    },
  },
  actions: {
    async login({ dispatch }, credentials) {
      const data = await this.$api.auth.login(credentials);
      this.$jwt.saveToken(data.token);
      this.$api.auth.setAuthHeader();
      dispatch("getMe");
    },

    async logout({ commit }, sendRequest = true) {
      if (sendRequest) {
        await this.$api.auth.logout();
      }
      this.$jwt.destroyToken();
      this.$api.auth.setAuthHeader();
      commit(LOGOUT);
      commit(
        `Cart/${UPDATE_ORDER}`,
        {
          userId: null,
          phone: "",
          address: createAddress(),
        },
        { root: true }
      );
    },

    async getMe({ commit, dispatch }) {
      try {
        const data = await this.$api.auth.getMe();
        commit(LOGIN, adaptUserData(data));
        commit(
          `Cart/${UPDATE_ORDER}`,
          {
            userId: data.id,
            phone: data.phone,
          },
          { root: true }
        );

        dispatch("getAddresses");
      } catch {
        dispatch("logout", false);
      }
    },

    async getAddresses({ commit }) {
      const addresses = await this.$api.addresses.get();
      commit(SET_ADDRESSES, addresses);
    },

    async addAddress({ commit }, address) {
      try {
        const data = await this.$api.addresses.post(address);
        commit(ADD_ADDRESS, data);
        this.$notifier.success("Адрес успешно добавлен");

        return data;
      } catch {
        this.$notifier.error("Не удалось добавить адрес");
        return {};
      }
    },

    async updateAddress({ commit }, address) {
      try {
        await this.$api.addresses.put(address);
        commit(UPDATE_ADDRESS, address);
        this.$notifier.success("Адрес успешно обновлён");
      } catch {
        this.$notifier.error("Не удалось обновить адрес");
      }
    },

    async deleteAddress({ commit }, id) {
      try {
        await this.$api.addresses.delete(id);
        commit(DELETE_ADDRESS, id);
        this.$notifier.success("Адрес успешно удалён");
      } catch {
        this.$notifier.error("Не удалось удалить адрес");
      }
    },
  },
};
