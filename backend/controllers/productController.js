const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {

    const { name, description, price, stock, image } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      image,
      seller: req.user._id
    });

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getProducts = async (req, res) => {
  try {

    const products = await Product.find().populate("seller", "name email");

    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getProductById = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id).populate("seller", "name email");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { name, description, price, stock, image } = req.body;

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stock = stock || product.stock;
    product.image = image || product.image;

    const updatedProduct = await product.save();

    res.json(updatedProduct);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await product.deleteOne();

    res.json({ message: "Product removed" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};