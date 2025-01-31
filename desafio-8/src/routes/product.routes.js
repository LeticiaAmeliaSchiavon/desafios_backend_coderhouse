const express = require('express');
const ProductController = require('../controllers/product.controller');

const router = express.Router();
const productController = new ProductController();

router.get('/', productController.getProducts.bind(productController));

module.exports = router;