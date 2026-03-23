const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const { protect, isSeller } = require("../middleware/authMiddleware");


router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, isSeller, updateProduct);
router.delete("/:id", protect, isSeller, deleteProduct);

router.post("/", protect, isSeller, createProduct);

module.exports = router;