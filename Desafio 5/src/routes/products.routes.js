const express = require('express');
const Product = require('../dao/models/product.model');

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

router.post('/', async (req, res) => {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
});

module.exports = router;
