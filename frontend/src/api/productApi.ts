import API from "./axios";
import { handleApiError } from "../utils/HandleApiError";
import type { Product } from "../types/product";

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const res = await API.get<Product[]>("/products");
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const res = await API.get<Product>(`/products/${id}`);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createProduct = async (data: Partial<Product>): Promise<Product> => {
  try {
    const res = await API.post<Product>("/products", data);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateProduct = async (id: string, data: Partial<Product>): Promise<Product> => {
  try {
    const res = await API.put<Product>(`/products/${id}`, data);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteProduct = async (id: string): Promise<{ message: string }> => {
  try {
    const res = await API.delete<{ message: string }>(`/products/${id}`);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};