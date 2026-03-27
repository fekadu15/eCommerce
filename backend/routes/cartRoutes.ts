import express from "express";
const router = express.Router();

import {
  addToCart,
  getCart,
  removeFromCart
} from "../controllers/cartController";

import { protect } from"../middleware/authMiddleware";

router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.delete("/", protect, removeFromCart);

export default router;