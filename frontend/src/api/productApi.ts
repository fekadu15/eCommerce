import API from "./axios";
import { handleApiError } from "../utils/HandleApiError";
import type { Product, CreateReviewBody } from "../types/product";

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const res = await API.get<Product[]>("/products");
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getMyProducts = async (): Promise<Product[]> => {
  try {
    const res = await API.get<Product[]>("/products/mine");
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

export const addReview = async (
  productId: string, 
  reviewData: CreateReviewBody
): Promise<{ message: string; product: Product }> => {
  try {
    const res = await API.post<{ message: string; product: Product }>(
      `/products/${productId}/reviews`, 
      reviewData
    );
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};