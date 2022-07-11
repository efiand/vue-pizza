import { cloneDeep } from "lodash";
import Vuex from "vuex";
import store from "@/store";
import modules from "@/store/modules";
import { adaptContentEntity } from "@/common/helpers";
import { DOUGH, SAUCES, SIZES, INGREDIENTS, MISC } from "./data";
import { notify } from "@/plugins/vuex-plugins";

const [dough, sauces, sizes, ingredients, misc] = [
  DOUGH,
  SAUCES,
  SIZES,
  INGREDIENTS,
  MISC,
].map(adaptContentEntity);
export const content = { dough, sauces, sizes, ingredients, misc };

const initState = () => ({
  content,
});

export const generateMockStore = (actions) => {
  const modulesCopy = cloneDeep(modules);
  if (actions) {
    Object.entries(actions).forEach(([module, actions]) => {
      modulesCopy[module] = { ...modulesCopy[module], actions };
    });
  }

  return new Vuex.Store({
    state: initState(),
    mutations: store.mutations,
    modules: modulesCopy,
    plugins: [notify],
  });
};
