import axios from "axios";
import { API_URL } from "@/common/constants";

const DEFAUT_MESSAGE = "Возникла ошибка при выполнении запроса к серверу";

const axiosInstance = axios.create({
  baseURL: `${API_URL}/`,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    axiosInstance.$notifier.error(
      err?.response?.data?.error?.message || DEFAUT_MESSAGE
    );

    return Promise.reject(err);
  }
);

export default axiosInstance;
