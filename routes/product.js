const express = require('express');
const { addProduct } = require('../controller/product');
const router = express.Router();

router.post('/products', addProduct);

module.exports = router;
