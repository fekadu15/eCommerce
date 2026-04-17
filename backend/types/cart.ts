import { Types } from "mongoose";
import { IProduct } from "../models/Product";
import { ICart } from "../models/Cart";

export interface AddToCartBody {
  productId: string;
  quantity: number;
}

export interface RemoveFromCartBody {
  productId: string;
}

export interface ICartItemPopulated {
  _id: Types.ObjectId;
  product: IProduct;
  quantity: number;
}

export interface ICartPopulated extends Omit<ICart, "items"> {
  items: ICartItemPopulated[];
}