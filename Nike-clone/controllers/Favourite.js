const { Favourite } = require("../models/Favourite");

exports.addToFavourite = async (req, res) => {
  try {
    const { id } = req.user;
    const favourite = new Favourite({ ...req.body, user: id });
    const doc = await favourite.save();
    const element = await Favourite.findById(doc.id).populate("product");
    res.status(201).json(element);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.fetchFavouriteByUser = async (req, res) => {
  const { id } = req.user;
  try {
    const favouriteItems = await Favourite.find({ user: id }).populate(
      "product"
    );
    res.status(200).json(favouriteItems);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.deleteFromFavourite = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Favourite.findByIdAndDelete(id);
    res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.updateFavourite = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Favourite.findByIdAndUpdate(id, req.body, { new: true });
    const result = await cart.populate("product");
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
