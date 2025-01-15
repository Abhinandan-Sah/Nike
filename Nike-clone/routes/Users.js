const express = require("express");
const { fetchUserById, updateUser } = require("../controllers/User");
const router = express.Router();
router
  .get("/fetchUserById", fetchUserById)
  .patch("/updateUser/:id", updateUser);
exports.router = router;
