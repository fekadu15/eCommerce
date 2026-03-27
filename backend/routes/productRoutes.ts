import express from "express";
const router = express.Router();
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productController";

import { protect, isSeller } from "../middleware/authMiddleware";


router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, isSeller, updateProduct);
router.delete("/:id", protect, isSeller, deleteProduct);

router.post("/", protect, isSeller, createProduct);

export default router;