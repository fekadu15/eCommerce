const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");


exports.checkout = async (req, res) => {
  try {

    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalPrice = 0;

    for (let item of cart.items) {

      if (item.product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${item.product.name}`
        });
      }

      totalPrice += item.product.price * item.quantity;
    }

    for (let item of cart.items) {
      const product = await Product.findById(item.product._id);
      product.stock -= item.quantity;
      await product.save();
    }

  
    const order = await Order.create({
      user: req.user._id,
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      })),
      totalPrice
    });

    cart.items = [];
    await cart.save();

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};