const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = 5000;


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());
app.use(express.json());


// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {

  res.json({
    message: "FreshMart Grocery API is running"
  });

});


// ==========================================
// GET ALL PRODUCTS
// ==========================================

app.get("/api/products", (req, res) => {

  const sql =
    "SELECT * FROM products ORDER BY id ASC";

  db.query(sql, (error, results) => {

    if (error) {

      console.error(
        "GET PRODUCTS ERROR:",
        error
      );

      return res.status(500).json({
        message: "Unable to fetch products",
        error: error.message
      });

    }

    res.status(200).json(results);

  });

});


// ==========================================
// GET SINGLE PRODUCT
// ==========================================

app.get("/api/products/:id", (req, res) => {

  const id = req.params.id;

  const sql =
    "SELECT * FROM products WHERE id = ?";

  db.query(sql, [id], (error, results) => {

    if (error) {

      console.error(
        "GET PRODUCT ERROR:",
        error
      );

      return res.status(500).json({
        message: "Unable to fetch product",
        error: error.message
      });

    }

    if (results.length === 0) {

      return res.status(404).json({
        message: "Product not found"
      });

    }

    res.status(200).json(results[0]);

  });

});


// ==========================================
// ADD NEW PRODUCT
// ==========================================

app.post("/api/products", (req, res) => {

  const {
    name,
    brand,
    price,
    quantity,
    category,
    type,
    image,
    description
  } = req.body;


  if (!name || price === undefined) {

    return res.status(400).json({
      message:
        "Product name and price are required"
    });

  }


  const sql = `
    INSERT INTO products
    (
      name,
      brand,
      price,
      quantity,
      category,
      type,
      image,
      description
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;


  const values = [
    name,
    brand,
    price,
    quantity,
    category,
    type,
    image,
    description
  ];


  db.query(sql, values, (error, result) => {

    if (error) {

      console.error(
        "ADD PRODUCT ERROR:",
        error
      );

      return res.status(500).json({
        message: "Unable to add product",
        error: error.message
      });

    }


    res.status(201).json({

      message:
        "Product added successfully",

      productId:
        result.insertId

    });

  });

});


// ==========================================
// UPDATE PRODUCT
// ==========================================

app.put("/api/products/:id", (req, res) => {

  const id = req.params.id;


  const {
    name,
    brand,
    price,
    quantity,
    category,
    type,
    image,
    description
  } = req.body;


  if (!name || price === undefined) {

    return res.status(400).json({
      message:
        "Product name and price are required"
    });

  }


  const sql = `
    UPDATE products
    SET
      name = ?,
      brand = ?,
      price = ?,
      quantity = ?,
      category = ?,
      type = ?,
      image = ?,
      description = ?
    WHERE id = ?
  `;


  const values = [
    name,
    brand,
    price,
    quantity,
    category,
    type,
    image,
    description,
    id
  ];


  db.query(sql, values, (error, result) => {

    if (error) {

      console.error(
        "UPDATE PRODUCT ERROR:",
        error
      );

      return res.status(500).json({
        message: "Unable to update product",
        error: error.message
      });

    }


    if (result.affectedRows === 0) {

      return res.status(404).json({
        message: "Product not found"
      });

    }


    res.status(200).json({
      message:
        "Product updated successfully"
    });

  });

});


// ==========================================
// DELETE PRODUCT
// ==========================================

app.delete("/api/products/:id", (req, res) => {

  const id = req.params.id;

  const sql =
    "DELETE FROM products WHERE id = ?";


  db.query(sql, [id], (error, result) => {

    if (error) {

      console.error(
        "DELETE PRODUCT ERROR:",
        error
      );

      return res.status(500).json({
        message: "Unable to delete product",
        error: error.message
      });

    }


    if (result.affectedRows === 0) {

      return res.status(404).json({
        message: "Product not found"
      });

    }


    res.status(200).json({
      message:
        "Product deleted successfully"
    });

  });

});


// ==========================================
// GET ALL ORDERS
// My Orders ke liye
// ==========================================

app.get("/api/orders", (req, res) => {

  const sql = `
    SELECT
      id,
      customer_name,
      phone,
      address,
      total_amount,
      order_status,
      created_at
    FROM orders
    ORDER BY id DESC
  `;


  db.query(sql, (error, results) => {

    if (error) {

      console.error(
        "GET ORDERS ERROR:",
        error
      );


      return res.status(500).json({

        message:
          "Unable to fetch orders",

        error:
          error.message

      });

    }


    res.status(200).json(results);

  });

});


// ==========================================
// GET SINGLE ORDER WITH ITEMS
// ==========================================

app.get("/api/orders/:id", (req, res) => {

  const orderId = req.params.id;


  const orderSql = `
    SELECT *
    FROM orders
    WHERE id = ?
  `;


  db.query(
    orderSql,
    [orderId],
    (error, orderResults) => {

      if (error) {

        console.error(
          "GET ORDER ERROR:",
          error
        );


        return res.status(500).json({
          message:
            "Unable to fetch order"
        });

      }


      if (orderResults.length === 0) {

        return res.status(404).json({
          message:
            "Order not found"
        });

      }


      const itemsSql = `
        SELECT *
        FROM order_items
        WHERE order_id = ?
        ORDER BY id ASC
      `;


      db.query(
        itemsSql,
        [orderId],
        (itemError, itemResults) => {

          if (itemError) {

            console.error(
              "GET ORDER ITEMS ERROR:",
              itemError
            );


            return res.status(500).json({
              message:
                "Unable to fetch order items"
            });

          }


          res.status(200).json({

            ...orderResults[0],

            items:
              itemResults

          });

        }
      );

    }
  );

});


// ==========================================
// PLACE ORDER
// ==========================================

app.post("/api/orders", (req, res) => {

  const {
    customerName,
    phone,
    address,
    totalAmount,
    items
  } = req.body;


  // ======================================
  // VALIDATION
  // ======================================

  if (
    !customerName ||
    !phone ||
    !address ||
    !Array.isArray(items) ||
    items.length === 0
  ) {

    return res.status(400).json({

      message:
        "Complete order details are required"

    });

  }


  // ======================================
  // INSERT ORDER
  // ======================================

  const orderSql = `
    INSERT INTO orders
    (
      customer_name,
      phone,
      address,
      total_amount
    )
    VALUES (?, ?, ?, ?)
  `;


  const orderValues = [

    customerName,

    phone,

    address,

    totalAmount

  ];


  db.query(
    orderSql,
    orderValues,
    (error, result) => {

      if (error) {

        console.error(
          "ORDER ERROR:",
          error
        );


        return res.status(500).json({

          message:
            "Unable to place order",

          error:
            error.message

        });

      }


      // ==================================
      // GET NEW ORDER ID
      // ==================================

      const orderId =
        result.insertId;


      // ==================================
      // PREPARE ORDER ITEMS
      // ==================================

      const orderItems =
        items.map((item) => [

          orderId,

          item.id,

          item.name,

          Number(item.price),

          item.cartQuantity

        ]);


      // ==================================
      // INSERT ORDER ITEMS
      // ==================================

      const itemSql = `
        INSERT INTO order_items
        (
          order_id,
          product_id,
          product_name,
          price,
          quantity
        )
        VALUES ?
      `;


      db.query(
        itemSql,
        [orderItems],
        (itemError) => {

          if (itemError) {

            console.error(
              "ORDER ITEMS ERROR:",
              itemError
            );


            return res.status(500).json({

              message:
                "Unable to save order items",

              error:
                itemError.message

            });

          }


          // ==================================
          // SUCCESS
          // ==================================

          res.status(201).json({

            message:
              "Order placed successfully!",

            orderId:
              orderId

          });

        }
      );

    }
  );

});


// ==========================================
// 404 ROUTE
// ALWAYS AFTER ALL API ROUTES
// ==========================================

app.use((req, res) => {

  res.status(404).json({

    message:
      "API route not found"

  });

});


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {

  console.log(
    "================================"
  );

  console.log(
    "FreshMart Backend Started"
  );

  console.log(
    `Port: ${PORT}`
  );

  console.log(
    "Products API: /api/products"
  );

  console.log(
    "Orders API: /api/orders"
  );

  console.log(
    "================================"
  );

});