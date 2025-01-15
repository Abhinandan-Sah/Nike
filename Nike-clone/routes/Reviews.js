const express = require("express");
const {
  createReview,
  fetchReviewByProduct,
  fetchReviewByUser,
} = require("../controllers/Review");
const { isAuth } = require("../constants/services");
const router = express.Router();
router
  .post("/createReview", isAuth(), createReview)
  .get("/fetchReviewByProduct/:id", fetchReviewByProduct)
  .get("/fetchReviewByUser", isAuth(), fetchReviewByUser);
exports.router = router;
