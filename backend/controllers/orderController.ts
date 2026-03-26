import { Request, Response } from "express";
import Cart from "../models/Cart";
import Order from "../models/Order";
import Product from "../models/Product";

export const checkout = async (req: Request, res: Response , next:any) => {
  try {
    const cart = await Cart.findOne({ user: (req as any).user._id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalPrice = 0;

    for (let item of cart.items) {
      const product = item.product as any;
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}`
        });
      }

      totalPrice += product.price * item.quantity;
    }

    for (let item of cart.items) {
      const product = await Product.findById((item.product as any)._id);
      if (product) {
        product.stock -= item.quantity;
        await product.save();
      }
    }

    const order = await Order.create({
      user: (req as any).user._id,
      items: cart.items.map((item: any) => ({
        product: item.product._id,
        quantity: item.quantity
      })),
      totalPrice
    });

    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error: any) {
  next(error);
}
};

export const getMyOrders = async (req: Request, res: Response, next:any) => {
  try {
    const userId = (req as any).user._id;

    const orders = await Order.find({ user: userId }).populate("items.product");

    res.status(200).json(orders);

  } catch (error: any) {
  next(error);
}
};

export const getAllOrders = async (req: Request, res: Response , next:any) => {
  try {

    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product");

    res.status(200).json(orders);

  } catch (error: any) {
  next(error);
}
};
export const updateOrderStatus = async (req: Request, res: Response , next:any) => {
  try {

    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;

    const updatedOrder = await order.save();

    res.json(updatedOrder);

  } catch (error: any) {
  next(error);
}
};