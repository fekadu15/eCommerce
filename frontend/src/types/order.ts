import type { Product, ApiError } from "./product";

export type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";
export type PaymentStatus = "pending" | "paid" | "failed";
export type PaymentMethod = "card" | "cash";

export interface IOrderItem {
  _id: string;
  product: Product;
  quantity: number;
}

export interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  items: IOrderItem[];
  totalPrice: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutBody {
  paymentMethod: PaymentMethod;
  selectedItems: string[]; 
}

export interface PaymentBody {
  orderId: string;
}

export interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  clientSecret: string | null;
  loading: boolean;
  error: string | null;
}