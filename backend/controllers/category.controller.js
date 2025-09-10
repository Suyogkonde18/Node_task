const Category = require('../models/category.model');

exports.getAll = async (req, res) => {
  try {
    const data = await Category.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { CategoryName } = req.body;
    if (!CategoryName) {
      return res.status(400).json({ error: "CategoryName is required" });
    }

    await Category.create(CategoryName);
    res.json({ message: "Category created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { CategoryName } = req.body;

    if (!CategoryName) {
      return res.status(400).json({ error: "CategoryName is required" });
    }

    await Category.update(id, CategoryName);
    res.json({ message: "Category updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.delete(id);
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
