import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 60 * 1000,
  timeoutErrorMessage:
    "We are unable to connect to the server. Please try again later.",
});

const getAccessToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = getAccessToken();

    if (!config.headers) {
      config.headers = {} as InternalAxiosRequestConfig["headers"];
    }

    config.headers["Content-Type"] = "application/json";
    config.headers["country"] = "IN";
    config.headers["lang"] = "en";
    if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if ([401, 403].includes(error?.response?.status ?? 0)) {
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };
