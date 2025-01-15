const express = require("express");
const {
  createUser,
  loginUser,
  checkUser,
  logout,
  resetPasswordRequest,
  resetPassword,
} = require("../controllers/Auth");
const passport = require("passport");
const router = express.Router();
router
  .post("/createUser", createUser)
  .post("/loginUser", passport.authenticate("Local"), loginUser)
  .get("/checkUser", passport.authenticate("jwt"), checkUser)
  .get("/logoutUser", logout)
  .post("/resetPasswordRequest", resetPasswordRequest)
  .post("/resetPassword", resetPassword);
exports.router = router;
