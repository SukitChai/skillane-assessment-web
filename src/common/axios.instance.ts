import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { API_URL } from "../constants/axios.constant";
import { getAccessToken } from "../services/auth.service";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      if (config.headers)
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<{ message: string }>) => {
    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      window.location.pathname = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
