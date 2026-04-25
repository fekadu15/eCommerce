import mongoose, { Schema, Document, Model } from "mongoose";
import {
  OrderStatus,
  PaymentStatus,
  PaymentMethod
} from "../types/order";

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  totalPrice: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  paidAt?: Date;
  isVisibleToUser: boolean; 
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema: Schema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

const orderSchema: Schema<IOrder> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    items: [orderItemSchema],
    totalPrice: {
      type: Number,
      required: true
    },
   status: {
  type: String,
  enum: ["pending", "in_transit", "shipped", "delivered", "cancelled"], 
  default: "pending"
},
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending"
    },
    paymentMethod: {
      type: String,
      enum: ["card", "cash"],
      required: true
    },
    paidAt: {
      type: Date
    },
    isVisibleToUser: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const Order: Model<IOrder> = mongoose.model<IOrder>("Order", orderSchema);

export default Order;