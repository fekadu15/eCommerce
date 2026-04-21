
import type { Product } from "./product";

export interface ICartItem {
  product: Product;
  quantity: number;
  _id: string;
}

export interface ICart {
  _id: string;
  user: string;
  items: ICartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface CartState {
  cart: ICart | null;
  loading: boolean;
  error: string | null;
}

export interface AddToCartBody {
  productId: string;
  quantity: number;
}

export interface RemoveFromCartBody {
  productId: string;
}