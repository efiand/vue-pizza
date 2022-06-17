import Vue from "vue";
import JWTService from "@/services/jwt";
import Notifier from "@/plugins/notifier";
import store from "@/store";
import { createResources } from "@/common/helpers";

const plugins = {
  install(Vue) {
    Vue.mixin({
      computed: {
        $jwt: () => JWTService,
        $notifier: () => new Notifier(store),
        $api() {
          return createResources(this.$notifier);
        },
      },
    });
  },
};

Vue.use(plugins);
