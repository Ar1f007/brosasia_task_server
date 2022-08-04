const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'inStock is required'],
    },
    img: {
      type: String,
      required: [true, 'image is required'],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
