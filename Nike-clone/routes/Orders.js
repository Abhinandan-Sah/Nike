const express = require("express");
const {
  createOrder,
  createOrderWithCard,
  validateOrderWithCard,
  fetchOrdersByUser,
  cancelOrder,
} = require("../controllers/Order");
const router = express.Router();
router
  .get("/fetchOrdersByUser", fetchOrdersByUser)
  .post("/createOrder", createOrder)
  .post("/createOrderWithCard", createOrderWithCard)
  .get("/cancelOrder/:id", cancelOrder);
exports.router = router;
