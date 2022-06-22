import Vue from "vue";
import JWTService from "@/services/jwt";
import Notifier from "@/plugins/notifier";
import store from "@/store";
import { createResources } from "@/common/helpers";

const plugins = {
  install(Vue) {
    Vue.prototype.$notifier = new Notifier(store);
    Vue.prototype.$api = createResources(Vue.prototype.$notifier);
    Vue.prototype.$jwt = JWTService;
  },
};

Vue.use(plugins);
