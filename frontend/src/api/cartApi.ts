import API from "./axios";
import { handleApiError } from "../utils/HandleApiError";
import type { ICart, AddToCartBody, RemoveFromCartBody } from "../types/cart";

export const getCart = async (): Promise<ICart | null> => {
  try {
    const res = await API.get<ICart | null>("/cart");
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
  
};

export const addToCart = async (data: AddToCartBody): Promise<ICart> => {
  try {
    const res = await API.post<ICart>("/cart", data);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const removeFromCart = async (data: RemoveFromCartBody): Promise<ICart> => {
  try {
    const res = await API.delete<ICart>("/cart", { data }); 
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};