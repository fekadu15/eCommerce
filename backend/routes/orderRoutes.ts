import express from "express";
const router = express.Router();

import {
  checkout,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} from "../controllers/orderController";

import { protect, isAdmin } from "../middleware/authMiddleware";

router.post("/checkout", protect, checkout);
router.get("/my-orders", protect, getMyOrders);

router.get("/", protect, isAdmin, getAllOrders);
router.put("/:id", protect, isAdmin, updateOrderStatus);

export default router;