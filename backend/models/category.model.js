const pool = require('../db');

module.exports = {
  async findAll() {
    const [rows] = await pool.query("SELECT * FROM categories");
    return rows;
  },

  async create(name) {
    return pool.query("INSERT INTO categories (CategoryName) VALUES (?)", [name]);
  },

  async update(id, name) {
    return pool.query("UPDATE categories SET CategoryName=? WHERE CategoryId=?", [name, id]);
  },

  async delete(id) {
    return pool.query("DELETE FROM categories WHERE CategoryId=?", [id]);
  }
};
