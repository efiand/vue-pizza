import axios from "@/plugins/axios";

export default class BaseApiService {
  constructor(notifier) {
    if (!axios.$notifier) {
      axios.$notifier = notifier;
    }
  }
}
