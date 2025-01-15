const { User } = require("../models/User");

exports.fetchUserById = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id, {
      _id: 1,
      addresses: 1,
      email: 1,
      role: 1,
      firstName: 1,
      lastName: 1,
      createdAt: 1,
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      addresses: user.addresses,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      id: id,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
