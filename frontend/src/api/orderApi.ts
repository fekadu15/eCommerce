import API from "./axios";
import { handleApiError } from "../utils/HandleApiError";
import type { Order, CheckoutBody, PaymentBody } from "../types/order";

export const checkout = async (data: CheckoutBody): Promise<Order> => {
  try {
    const res = await API.post<Order>("/orders/checkout", data);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createPaymentIntent = async (data: PaymentBody): Promise<{ clientSecret: string }> => {
  try {
    const res = await API.post<{ clientSecret: string }>("/orders/create-payment", data);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};


export const confirmPaymentOnServer = async (data: PaymentBody): Promise<{ message: string; order: Order }> => {
  try { 
    const res = await API.post<{ message: string; order: Order }>("/orders/pay", data);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getMyOrders = async (): Promise<Order[]> => {
  try {
    const res = await API.get<Order[]>("/orders/my-orders");
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const cancelOrder = async (orderId: string): Promise<{ message: string; order: Order }> => {
  try {
    const res = await API.put<{ message: string; order: Order }>(`/orders/${orderId}/cancel`);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
