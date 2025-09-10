const pool = require('../db');

module.exports = {
  async findAll(page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize;

    const [rows] = await pool.query(
      `SELECT p.ProductId, p.ProductName, c.CategoryId, c.CategoryName
       FROM products p
       JOIN categories c ON p.CategoryId = c.CategoryId
       LIMIT ? OFFSET ?`,
      [pageSize, offset]
    );

    const [[{ count }]] = await pool.query("SELECT COUNT(*) as count FROM products");

    return {
      data: rows,
      total: count,
      currentPage: page,
      totalPages: Math.ceil(count / pageSize)
    };
  },

  async create(productName, categoryId) {
    return pool.query(
      "INSERT INTO products (ProductName, CategoryId) VALUES (?, ?)",
      [productName, categoryId]
    );
  },

  async update(id, productName, categoryId) {
    return pool.query(
      "UPDATE products SET ProductName=?, CategoryId=? WHERE ProductId=?",
      [productName, categoryId, id]
    );
  },

  async delete(id) {
    return pool.query("DELETE FROM products WHERE ProductId=?", [id]);
  }
};
