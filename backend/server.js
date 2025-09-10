const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pool = require('./db');

const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Connected to the database");
    connection.release();
  } catch (err) {
    console.error(" Error connecting to the database:", err.message);
  }
})();

// Routes
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);

app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
