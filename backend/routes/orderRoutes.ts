import express from "express";
const router = express.Router();

import {
  checkout,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  processPayment,
  createPayment
} from "../controllers/orderController";
import { protect, isAdmin } from "../middleware/authMiddleware";

router.post("/checkout", protect, checkout);
router.get("/my-orders", protect, getMyOrders);
router.post("/pay", protect, processPayment);
router.get("/", protect, isAdmin, getAllOrders);
router.put("/:id", protect, isAdmin, updateOrderStatus);
router.post("/create-payment", protect, createPayment);
export default router;