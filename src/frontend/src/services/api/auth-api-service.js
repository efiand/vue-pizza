import JwtService from "@/services/jwt";
import axios from "@/plugins/axios";
import BaseApiService from "@/services/api/base-api-service";

export default class AuthApiService extends BaseApiService {
  setAuthHeader() {
    const token = JwtService.getToken();

    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  async login(params) {
    const { data } = await axios.post("login", params);
    return data;
  }

  async logout() {
    const { data } = await axios.delete("logout");
    return data;
  }

  async getMe() {
    const { data } = await axios.get("whoAmI");
    return data;
  }
}
