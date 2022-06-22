import JWTService from "@/services/jwt";
import Notifier from "@/plugins/notifier";
import { createResources } from "@/common/helpers";

export function notify(store) {
  store.$jwt = JWTService;
  store.$notifier = new Notifier(store);
  store.$api = createResources(store.$notifier);
}
