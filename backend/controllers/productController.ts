import { Request, Response, NextFunction } from "express";
import {Types} from "mongoose";
import Product, { IProduct } from "../models/Product";
import {
  CreateProductBody,
  UpdateProductBody,
  CreateReviewBody
} from "../types/product";
type ProductFilter = {
  seller?: {
    $ne?: Types.ObjectId;
  };
};
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
export const getSellerProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find({ seller: req.user?._id });
    res.status(200).json(products);
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
    const filter: ProductFilter = {};

    if (req.user?._id) {
      filter.seller = { $ne: req.user._id };
    }

    const products = await Product.find(filter).populate(
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

export const createProductReview = async (
  req: Request<{ id: string }, {}, CreateReviewBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { rating, title, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user?._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: "You have already reviewed this product" });
    }

    const review = {
      name: req.user?.name || "Anonymous",
      rating: Number(rating),
      title,
      comment,
      user: req.user?._id,
    };

    product.reviews.push(review as any);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ 
      message: "Review added successfully", 
      product 
    });
  } catch (error) {
    next(error);
  }
};