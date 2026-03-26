import { Request, Response } from "express";
import Product from "../models/Product";

export const createProduct = async (req: Request, res: Response ,next:any) => {
  try {
    const { name, description, price, stock, image } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      image,
      seller: (req as any).user._id
    });

    res.status(201).json(product);
  } catch (error: any) {
  next(error);
}
};

export const getProducts = async (req: Request, res: Response , next:any) => {
  try {
    const products = await Product.find().populate("seller", "name email");
    res.status(200).json(products);
  } catch (error: any) {
  next(error);
}
};

export const getProductById = async (req: Request, res: Response , next:any) => {
  try {
    const product = await Product.findById(req.params.id).populate("seller", "name email");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error: any) {
  next(error);
}
};

export const updateProduct = async (req: Request, res: Response , next:any) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.seller.toString() !== (req as any).user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { name, description, price, stock, image } = req.body;

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.image = image || product.image;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error: any) {
  next(error);
}
};

export const deleteProduct = async (req: Request, res: Response , next :any) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.seller.toString() !== (req as any).user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (error: any) {
  next(error);
}
};