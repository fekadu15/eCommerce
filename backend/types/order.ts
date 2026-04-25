export type OrderStatus = "pending" | "in_transit" | "shipped" | "delivered" | "cancelled";
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

export interface Order {
  _id: string;
  user: any; 
  items: Array<{
    product: any; 
    _id: string;
  }>;
  totalPrice: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  clientSecret: string | null;
  loading: boolean;
  error: string | null;
}
export interface SellerOrderStats {
  totalOrders: number;
  pendingFulfillment: number;
  inTransit: number;
  totalRevenue: number;
}