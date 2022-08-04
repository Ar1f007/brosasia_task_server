const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  const { name, price, inStock, img } = req.body;

  if (!name || !price || !inStock || !img) {
    return res.status(400).json({ message: 'Please provide all the values' });
  }

  try {
    const product = await Product.create(req.body);

    return res.status(201).json(product);
  } catch (error) {
    return res.status(424).json({ message: 'Could not add product' });
  }
};

exports.getProducts = async (req, res) => {
  let result;
  let totalProducts;
  const { search } = req.query;

  let query = { $regex: search, $options: 'i' };

  if (search) {
    result = Product.find({ name: query });
    totalProducts = await Product.countDocuments({ name: query });
  } else {
    result = Product.find();
    totalProducts = await Product.countDocuments();
  }

  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;

  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const numOfPages = Math.ceil(totalProducts / limit);

  const products = await result.sort({ createdAt: -1 });

  res.status(200).json({ products, numOfPages, totalProducts });
};
