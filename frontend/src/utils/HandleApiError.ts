import axios from "axios";
import type { ApiError } from "../types/product";

export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    return error.response?.data || { message: "Request failed" };
  }
  return { message: "Something went wrong" };
};