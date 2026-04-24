import axios from "axios";
import API from "./axios";
import type { 
  RegisterBody, 
  LoginBody, 
  AuthResponse, 
  ApiError, 
  UserInfo, 
  UpdateProfileBody,
  Address 
} from "../types/auth"; 

const formatApiError = (error: unknown, fallback: string): ApiError => {
  if (axios.isAxiosError(error)) {
    return (error.response?.data as ApiError) || { message: fallback };
  }
  return { message: "An unexpected error occurred" };
};

export const registerUser = async (userData: RegisterBody): Promise<AuthResponse> => {
  try {
    const response = await API.post<AuthResponse>("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw formatApiError(error, "Registration failed");
  }
};

export const loginUser = async (userData: LoginBody): Promise<AuthResponse> => {
  try {
    const response = await API.post<AuthResponse>("/auth/login", userData);
    return response.data;
  } catch (error) {
    throw formatApiError(error, "Login failed");
  }
};

export const updateProfile = async (userData: UpdateProfileBody): Promise<UserInfo> => {
  try {
    const response = await API.patch<UserInfo>("/auth/profile", userData);
    return response.data;
  } catch (error) {
    throw formatApiError(error, "Failed to update profile settings");
  }
};

export const getProfile = async (): Promise<UserInfo> => {
  try {
    const response = await API.get<UserInfo>("/auth/profile");
    return response.data;
  } catch (error) {
    throw formatApiError(error, "Could not fetch user profile");
  }
};

export const addUserAddress = async (addressData: Omit<Address, "_id">): Promise<UserInfo> => {
  try {
    const response = await API.post<UserInfo>("/auth/address", addressData);
    return response.data;
  } catch (error) {
    throw formatApiError(error, "Failed to add new address");
  }
};

export const removeUserAddress = async (addressId: string): Promise<UserInfo> => {
  try {
    const response = await API.delete<UserInfo>(`/auth/address/${addressId}`);
    return response.data;
  } catch (error) {
    throw formatApiError(error, "Failed to remove address");
  }
};

export const updateExistingAddress = async (
  addressId: string, 
  addressData: Partial<Address>
): Promise<UserInfo> => {
  try {
    const response = await API.put<UserInfo>(`/auth/address/${addressId}`, addressData);
    return response.data;
  } catch (error) {
    throw formatApiError(error, "Failed to update address");
  }
};