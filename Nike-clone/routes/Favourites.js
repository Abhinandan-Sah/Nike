const express = require("express");
const {
  addToFavourite,
  fetchFavouriteByUser,
  deleteFromFavourite,
  updateFavourite,
} = require("../controllers/Favourite");
const router = express.Router();
router
  .post("/addToFavourite", addToFavourite)
  .get("/fetchFavouriteByUser", fetchFavouriteByUser)
  .delete("/deleteFromFavourite/:id", deleteFromFavourite)
  .patch("/updateFavourite/:id", updateFavourite);
exports.router = router;
