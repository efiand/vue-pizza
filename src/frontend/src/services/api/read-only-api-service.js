import axios from "@/plugins/axios";
import BaseApiService from "@/services/api/base-api-service";

export default class ReadOnlyApiService extends BaseApiService {
  #resource;

  constructor(resource, notifier) {
    super(notifier);

    this.#resource = resource;
  }

  async get(config = {}) {
    const { data } = await axios.get(this.#resource, config);
    return data;
  }
}
