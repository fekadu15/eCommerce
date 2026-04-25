import API from "./axios";
import { handleApiError } from "../utils/HandleApiError";
import type { 
  Order, 
  CheckoutBody, 
  PaymentBody ,
  SellerOrderStats,
 OrderStatus
} from "../types/order";

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

export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const res = await API.get<Order[]>("/orders");
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

export const getSellerOrders = async (): Promise<Order[]> => {
  try {
    const res = await API.get<Order[]>("/orders/seller");
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getSellerStats = async (): Promise<SellerOrderStats> => {
  try {
    const res = await API.get<SellerOrderStats>("/orders/seller/stats");
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
export const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<Order> => {
  try {
    const res = await API.put<Order>(`/orders/${orderId}/status`, { status });
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};