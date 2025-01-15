const { Cart } = require("../models/Cart");
const { Favourite } = require("../models/Favourite");
const { Product } = require("../models/Product");

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  product.discountPrice = Math.round(
    product.price * (1 - product.discount / 100)
  );
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.fetchProducts = async (req, res) => {
  let query = Product.find({});
  if (req.query.color) {
    query = query.find({
      colors: { $elemMatch: { name: { $in: req.query.color.split(",") } } },
    });
  }
  if (req.query.kids) {
    query = query.find({ kids: { $in: req.query.kids.split(",") } });
  }
  if (req.query.gender) {
    query = query.find({ gender: { $in: req.query.gender.split(",") } });
  }
  if (req.query.category) {
    query = query.find({
      category: { $in: req.query.category.split(",") },
    });
  }
  if (req.query.size) {
    query = query.find({ sizes: { $in: req.query.size.split(",") } });
  }

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }
  try {
    const docs = await query.exec();
    res.status(200).json(docs);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.fetchProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).exec();
  try {
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.updateProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    product.discountPrice = Math.round(
      product.price * (1 - product.discount / 100)
    );
    const updateProduct = await product.save();
    res.status(200).json(updateProduct);
  } catch (err) {
    console.log(err);
    res.status(200).json(err);
  }
};

exports.fetchProductYouMayAlsoLike = async (req, res) => {
  const { id } = req.user;
  try {
    const carts = await Cart.find({}, { product: 1 });
    // console.log(carts[0].product.toString());
    const favourites = await Favourite.find({}, { product: 1 });
    let arr = [
      ...carts.map((cart) => cart.product.toString()),
      ...favourites.map((favorite) => favorite.product.toString()),
    ];

    const product = await Product.find({
      _id: {
        $nin: arr,
      },
    });

    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.fetchProductBySearch = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { title: { $regex: req.query.search } },
          { category: { $regex: req.query.search } },
        ],
      }
    : {};
  const product = await Product.find(keyword, {
    title: 1,
    category: 1,
    gender: 1,
    kids: 1,
    price: 1,
    images: 1,
  });
  res.status(200).json(product);
};
