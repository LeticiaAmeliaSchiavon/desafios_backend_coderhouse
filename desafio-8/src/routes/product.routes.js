const express = require('express');
const ProductService = require('../services/product.service');

const router = express.Router();

const ProductController = require('../controllers/product.controller');


const productController = new ProductController();

router.get('/', productController.getProducts.bind(productController));

module.exports = router;

router.get('/', async (req, res) => {
    const products = await productService.getProducts();
    res.render('home', { products, user: req.user });
});

module.exports = router;