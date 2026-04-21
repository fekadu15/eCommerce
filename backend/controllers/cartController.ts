import { Request, Response, NextFunction } from "express";
import Cart from "../models/Cart";
import {
  AddToCartBody,
  RemoveFromCartBody,
  ICartPopulated
} from "../types/cart";
import mongoose from "mongoose";
export const addToCart = async (
  req: Request<{}, {}, AddToCartBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user?._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user?._id,
        items: []
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
      
      if (cart.items[itemIndex].quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      }
    } else {
   
      cart.items.push({
        product: new mongoose.Types.ObjectId(productId),
        quantity
      });
    }

    await cart.save();

    const populatedCart = await cart.populate({
      path: "items.product",
      model: "Product" 
    });

    res.json(populatedCart);
  } catch (error) {
    next(error);
  }
};

export const getCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cart = (await Cart.findOne({ user: req.user?._id })
      .populate("items.product")) as ICartPopulated | null;

    res.json(cart);
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (
  req: Request<{}, {}, RemoveFromCartBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: req.user?._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    const populatedCart = await cart.populate({
      path: "items.product",
      model: "Product"
    });

    res.json(populatedCart);
  } catch (error) {
    next(error);
  }
};
