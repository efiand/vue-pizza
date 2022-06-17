import notificationTypes from "@/common/enums/notification-types";

export default class Notifier {
  #store;

  constructor(store) {
    this.#store = store;
  }

  info(text) {
    return this.#store.dispatch("Notifications/create", {
      text,
      type: notificationTypes.INFO,
    });
  }

  success(text) {
    return this.#store.dispatch("Notifications/create", {
      text,
      type: notificationTypes.SUCCESS,
    });
  }

  error(text) {
    return this.#store.dispatch("Notifications/create", {
      text,
      type: notificationTypes.ERROR,
    });
  }

  warning(text) {
    return this.#store.dispatch("Notifications/create", {
      text,
      type: notificationTypes.WARNING,
    });
  }

  delete(id) {
    this.#store.dispatch("Notifications/delete", id);
  }
}
