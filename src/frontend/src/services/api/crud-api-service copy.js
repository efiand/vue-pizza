import axios from "@/plugins/axios";
import ReadOnlyApiService from "@/services/api/read-only-api-service";

export default class CrudApiService extends ReadOnlyApiService {
  #resource;

  constructor(resource, notifier) {
    super(resource, notifier);

    this.#resource = resource;
  }

  async post(entity) {
    const { data } = await axios.post(this.#resource, entity);
    return data;
  }

  async put(entity) {
    const { data } = await axios.put(`${this.#resource}/${entity.id}`, entity);
    return data;
  }

  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }
}
