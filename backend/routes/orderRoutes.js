const express = require("express");
const router = express.Router();

const { checkout } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.post("/checkout", protect, checkout);

module.exports = router;