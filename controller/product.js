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
