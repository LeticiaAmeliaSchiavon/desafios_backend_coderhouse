const express = require('express');
const Cart = require('../dao/models/cart.model');

const router = express.Router();

router.get('/:id', async (req, res) => {
    const cart = await Cart.findById(req.params.id).populate('products.product');
    res.json(cart);
});

router.post('/', async (req, res) => {
    const newCart = await Cart.create(req.body);
    res.json(newCart);
});

module.exports = router;
