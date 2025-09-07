import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 60 * 1000,
  timeoutErrorMessage:
    "We are unable to connect to the server. Please try again later.",
});

const isServer = typeof window === "undefined";
const getAccessToken = async (): Promise<string | null> => {
  if (isServer) {
    const session = await getServerSession(authOptions);

    return session?.accessToken ?? null;
  } else {
    const session = await getSession();
    return session?.accessToken ?? null;
  }
};

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (!config.headers) {
      config.headers = {} as InternalAxiosRequestConfig["headers"];
    }

    const accessToken = await getAccessToken();

    config.headers["Content-Type"] = "application/json";
    config.headers["country"] = "IN";
    config.headers["lang"] = "en";

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

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
