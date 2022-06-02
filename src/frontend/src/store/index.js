import Vue from "vue";
import Vuex from "vuex";
import Auth from "./modules/auth";
import Builder from "./modules/builder";
import Cart from "./modules/cart";
import Orders from "./modules/orders";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    Auth,
    Builder,
    Cart,
    Orders,
  },
});
