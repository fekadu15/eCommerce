import express from "express";
const router = express.Router();
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProductReview,
  getSellerProducts
} from "../controllers/productController";

import { protect, isSeller } from "../middleware/authMiddleware";

router.get("/", getProducts);
router.get("/mine", protect, isSeller, getSellerProducts); 

router.get("/:id", getProductById);
router.put("/:id", protect, isSeller, updateProduct);
router.delete("/:id", protect, isSeller, deleteProduct);
router.post("/:id/reviews", protect, createProductReview);
router.post("/", protect, isSeller, createProduct);

export default router;