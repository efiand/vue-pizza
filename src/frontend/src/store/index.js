import Vue from "vue";
import Vuex from "vuex";
import { CREATE_CONTENT, UPDATE_ORDER } from "@/store/mutation-types";
import modules from "@/store/modules";
import { notify } from "@/plugins/vuex-plugins";
import { adaptContentEntity } from "@/common/helpers";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    content: null,
  },
  mutations: {
    [CREATE_CONTENT](state, content) {
      state.content = content;
    },
  },
  actions: {
    async init({ commit }) {
      const notificationId = await this.$notifier.info("Получение данных...");

      const [dough, sauces, sizes, ingredients, misc] = (
        await Promise.all([
          this.$api.dough.get(),
          this.$api.sauces.get(),
          this.$api.sizes.get(),
          this.$api.ingredients.get(),
          this.$api.misc.get(),
        ])
      ).map(adaptContentEntity);

      commit(CREATE_CONTENT, { dough, sauces, sizes, ingredients, misc });
      commit(`Cart/${UPDATE_ORDER}`, {
        misc: misc.map(({ id }) => ({
          miscId: id,
          quantity: 0,
        })),
      });

      this.$notifier.delete(notificationId);
    },
  },
  modules,
  plugins: [notify],
});
