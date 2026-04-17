import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";
import {
  CreateProductBody,
  UpdateProductBody
} from "../types/product";

export const createProduct = async (
  req: Request<{}, {}, CreateProductBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, price, stock, image } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      image,
      seller: req.user?._id
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find().populate(
      "seller",
      "name email"
    );

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "name email"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request<{ id: string }, {}, UpdateProductBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.seller.toString() !== req.user?._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { name, description, price, stock, image } = req.body;

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;
    if (image !== undefined) product.image = image;

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.seller.toString() !== req.user?._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await product.deleteOne();

    res.json({ message: "Product removed" });
  } catch (error) {
    next(error);
  }
};