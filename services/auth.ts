import { axiosInstance } from "./axiosInstance";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export interface AuthError {
  error: true;
  status: number;
  message: string;
}

export const loginUser = async (
  payload: LoginPayload
): Promise<AuthResponse | AuthError> => {
  try {
    const res = await axiosInstance.post<AuthResponse>(
      "/api/auth/login",
      payload
    );
    return res.data;
  } catch (err: any) {
    return {
      error: true,
      status: err.response?.status ?? 500,
      message: err.response?.data?.message || "Login failed",
    };
  }
};

export const registerUser = async (
  payload: RegisterPayload
): Promise<AuthResponse | AuthError> => {
  try {
    const res = await axiosInstance.post<AuthResponse>(
      "api/auth/register",
      payload
    );
    return res.data;
  } catch (err: any) {
    return {
      error: true,
      status: err.response?.status ?? 500,
      message: err.response?.data?.message || "Registration failed",
    };
  }
};
