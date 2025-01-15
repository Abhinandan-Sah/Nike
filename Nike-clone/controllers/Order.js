require("dotenv").config();
const crypto = require("crypto");
const { Order } = require("../models/Order");
const Razorpay = require("razorpay");
const { User } = require("../models/User");
const { invoiceTemplate, sendMail } = require("../constants/services");
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const doc = await order.save();
    const user = await User.findById(order.user);
    // we can use await for this also
    sendMail({
      to: user.email,
      html: invoiceTemplate(order),
      subject: "Order Received",
    });

    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.createOrderWithCard = async (req, res) => {
  try {
    let instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    var options = {
      amount: req.body.totalAmount * 100,
      currency: "INR",
    };
    instance.orders.create(options, function (err, order) {
      if (err) {
        return res.status(500).json({ message: "Server error" });
      }
      return res.status(200).json({ order });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.fetchOrdersByUser = async (req, res) => {
  const { id } = req.user;
  try {
    const orders = await Order.find({ user: id });
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.cancelOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Order.findByIdAndDelete(id);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
