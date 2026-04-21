import { Request, Response, NextFunction } from "express";
import Cart from "../models/Cart";
import Order from "../models/Order";
import User from "../models/User";
import Product from "../models/Product";
import { ICartPopulated } from "../types/cart";
import { CheckoutBody, PaymentBody, UpdateOrderStatusBody } from "../types/order";
import { createPaymentIntent } from "../utils/paymentService";
import { sendOrderEmail } from "../utils/emailService";

export const checkout = async (
  req: Request<{}, {}, CheckoutBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { paymentMethod, selectedItems } = req.body;

    if (!paymentMethod) {
      return res.status(400).json({ message: "Payment method is required" });
    }

    if (!selectedItems || selectedItems.length === 0) {
      return res.status(400).json({ message: "No items selected for checkout" });
    }

    const cart = (await Cart.findOne({ user: req.user?._id }).populate(
      "items.product"
    )) as ICartPopulated | null;

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const itemsToOrder = cart.items.filter((item) =>
      selectedItems.includes(item._id.toString())
    );

    if (itemsToOrder.length === 0) {
      return res.status(400).json({ message: "Selected items not found in cart" });
    }

    let subtotal = 0;
    for (const item of itemsToOrder) {
      const product = item.product;

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}`,
        });
      }

      subtotal += product.price * item.quantity;
    }

    const tax = subtotal * 0.08;
    const shipping = subtotal > 0 ? 20 : 0;
    const finalTotal = subtotal + tax + shipping;

    for (const item of itemsToOrder) {
      const product = await Product.findById(item.product._id);
      if (product) {
        product.stock -= item.quantity;
        await product.save();
      }
    }
 
    const order = await Order.create({
      user: req.user?._id,
      items: itemsToOrder.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalPrice: finalTotal,
      paymentMethod,
      paymentStatus: "pending",
    });

    const populatedOrder = await Order.findById(order._id).populate("items.product");

    cart.items = cart.items.filter(
      (item) => !selectedItems.includes(item._id.toString())
    );
    await cart.save();

    res.status(201).json(populatedOrder);
  } catch (error) {
    next(error);
  }
};

export const createPayment = async (
  req: Request<{}, {}, PaymentBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const paymentIntent = await createPaymentIntent(order.totalPrice);

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(error);
  }
};

export const processPayment = async (
  req: Request<{}, {}, PaymentBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.paymentStatus = "paid";
    order.paidAt = new Date();

    await order.save();

  
    const updatedOrder = await Order.findById(order._id).populate("items.product");

    const user = await User.findById(order.user);
    if (user) {
      await sendOrderEmail(
        user.email,
        order._id.toString(),
        order.totalPrice
      );
    }

    res.json({
      message: "Payment successful",
      order: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.find({ user: req.user?._id })
      .populate("items.product")
      .sort({ createdAt: -1 }); 

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (
  req: Request<{ id: string }, {}, UpdateOrderStatusBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};
export const cancelOrder = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.user.toString() !== req.user?._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to cancel this order" });
    }

  
    if (order.status !== "pending") {
      return res.status(400).json({ message: "Only pending orders can be cancelled" });
    }

  
    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock += item.quantity; 
        await product.save();
      }
    }

    order.status = "cancelled";
    const updatedOrder = await order.save();

    res.json({ message: "Order cancelled and stock updated", order: updatedOrder });
  } catch (error) {
    next(error);
  }
};