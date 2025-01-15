const { Cart } = require("../models/Cart");

exports.addToCart = async (req, res) => {
  try {
    const { id } = req.user;
    const cart = new Cart({ ...req.body, user: id });
    const doc = await cart.save();
    const element = await Cart.findById(doc.id).populate("product");
    res.status(201).json(element);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.fetchCartByUser = async (req, res) => {
  const { id } = req.user;
  try {
    const cartItems = await Cart.find({ user: id }).populate("product");
    // .populate("user", {
    //   email: 1,
    //   role: 1,
    //   addresses: 1,
    //   firstName: 1,
    //   lastName: 1,
    //   dateOfBirth: 1,
    // })
    res.status(200).json(cartItems);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.deleteFromCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findByIdAndDelete(id);
    res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.updateCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body, { new: true });
    const result = await cart.populate("product");
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
