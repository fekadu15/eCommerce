import axios from "axios";
import API from "./axios";
import type { RegisterBody, LoginBody, AuthResponse, ApiError } from "../types/auth"; 

export const registerUser = async (userData: RegisterBody): Promise<AuthResponse> => {
  try {
    const response = await API.post<AuthResponse>("/auth/register", userData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw (error.response?.data as ApiError) || { message: "Registration failed" };
    }
    throw { message: "Something went wrong" } as ApiError;
  }
};

export const loginUser = async (userData: LoginBody): Promise<AuthResponse> => {
  try {
    const response = await API.post<AuthResponse>("/auth/login", userData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw (error.response?.data as ApiError) || { message: "Login failed" };
    }
    throw { message: "Something went wrong" } as ApiError;
  }
};