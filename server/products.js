const express = require("express");
const router = express.Router();
const pool = require("./connection").pool;

router.get("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(q, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
  const q = `SELECT * FROM products`;
});

router.get("/:productId", (req, res) => {
  const productId = req.params.productId;
  const q = `SELECT * FROM products WHERE productId = ?`;
  pool.query(q, [productId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.post("/", (req, res) => {
  const q = `INSERT INTO products (productName, productPrice) VALUES (?)`;
  const values = [req.body.productName, req.body.productPrice];
  pool.query(q, [values], (err, data) => {
    console.log(`ADDED ${req.body.productName} to products`);
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.put("/:productId", (req, res) => {
  const productId = req.params.productId;
  const q = `UPDATE products SET productName = ?, productPrice = ? WHERE productId = ${productId} `;
  const values = [req.body.productName, req.body.productPrice];
  pool.query(q, values, (err, data) => {
    console.log(`UPDATED PRODUCT ${productId}`);
    if (err) return res.json(err);
    return res.json(data);
  });
});

router.delete("/:productId", (req, res) => {
  const productId = req.params.productId;
  const q = `DELETE FROM products WHERE productId = ?`;
  pool.query(q, [productId], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

module.exports = router;
