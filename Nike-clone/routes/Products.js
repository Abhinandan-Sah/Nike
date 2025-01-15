const express = require("express");
const {
  createProduct,
  fetchProducts,
  fetchProductById,
  updateProductById,
  fetchProductYouMayAlsoLike,
  fetchProductBySearch,
} = require("../controllers/Product");
const { isAuth } = require("../constants/services");
const router = express.Router();
router
  .get("/fetchProducts", fetchProducts)
  .get("/fetchProductById/:id", fetchProductById)
  .get("/fetchProductYouMayAlsoLike", isAuth(), fetchProductYouMayAlsoLike)
  .get("/fetchProductBySearch", fetchProductBySearch)
  .post("/createProduct", createProduct)
  .patch("/updateProductById/:id", updateProductById);
exports.router = router;
