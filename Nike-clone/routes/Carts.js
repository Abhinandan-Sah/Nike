const express = require("express");
const {
  addToCart,
  fetchCartByUser,
  deleteFromCart,
  updateCart,
} = require("../controllers/Cart");
const router = express.Router();
router
  .post("/addToCart", addToCart)
  .get("/fetchCartByUser", fetchCartByUser)
  .delete("/deleteFromCart/:id", deleteFromCart)
  .patch("/updateCart/:id", updateCart);
exports.router = router;
