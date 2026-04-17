export type OrderStatus = "pending" | "shipped" | "delivered";
export type PaymentStatus = "pending" | "paid" | "failed";
export type PaymentMethod = "card" | "cash";

export interface CheckoutBody {
  paymentMethod: PaymentMethod;
  selectedItems: string[];
}

export interface PaymentBody {
  orderId: string;
}

export interface UpdateOrderStatusBody {
  status: OrderStatus;
}