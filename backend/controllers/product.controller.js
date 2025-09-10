const Product = require('../models/product.model');

exports.getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const result = await Product.findAll(page, pageSize);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { ProductName, CategoryId } = req.body;

    if (!ProductName || !CategoryId) {
      return res.status(400).json({ error: "ProductName and CategoryId are required" });
    }

    const [result] = await Product.create(ProductName, CategoryId);
    res.json({ id: result.insertId, ProductName, CategoryId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { ProductName, CategoryId } = req.body;

    if (!ProductName || !CategoryId) {
      return res.status(400).json({ error: "ProductName and CategoryId are required" });
    }

    await Product.update(id, ProductName, CategoryId);
    res.json({ message: "Product updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.delete(id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
