import express from "express";
const router = express.Router();

import {
  checkout,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  processPayment,
  createPayment,
  cancelOrder,
  getSellerOrders,
  getSellerStats
} from "../controllers/orderController";
import { protect, isAdmin ,isSeller} from "../middleware/authMiddleware";

router.post("/checkout", protect, checkout);
router.get("/my-orders", protect, getMyOrders);
router.post("/pay", protect, processPayment);
router.put("/:id/cancel", protect, cancelOrder);
router.get("/", protect, isAdmin, getAllOrders);
router.put("/:id", protect, isAdmin, updateOrderStatus);
router.post("/create-payment", protect, createPayment);
router.get("/seller", protect, isSeller, getSellerOrders);
router.get("/seller/stats", protect, isSeller, getSellerStats);
router.put("/:id/status", protect, isSeller, updateOrderStatus);
export default router;