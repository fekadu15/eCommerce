import { Request, Response } from "express";
import Cart from "../models/Cart";

export const addToCart = async (req: Request, res: Response ,next:any) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: (req as any).user._id });

    if (!cart) {
      cart = await Cart.create({
        user: (req as any).user._id,
        items: []
      });
    }

    const itemIndex = cart.items.findIndex(
      (item: any) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity } as any);
    }

    await cart.save();
    res.json(cart);
  } catch (error: any) {
  next(error);
}
};

export const getCart = async (req: Request, res: Response , next:any) => {
  try {
    const cart = await Cart.findOne({ user: (req as any).user._id })
      .populate("items.product");

    res.json(cart);
  } catch (error: any) {
  next(error);
}
};

export const removeFromCart = async (req: Request, res: Response , next:any) => {
  try {
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: (req as any).user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item: any) => item.product.toString() !== productId
    );

    await cart.save();
    res.json(cart);
  } catch (error: any) {
  next(error);
}
};