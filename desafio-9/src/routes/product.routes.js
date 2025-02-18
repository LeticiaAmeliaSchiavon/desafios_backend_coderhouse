const express = require('express');
const ProductController = require('../controllers/product.controller');
const Mocking = require('../utils/mocking');

const router = express.Router();
const productController = new ProductController(); // Instancia o controlador

// Endpoint para gerar produtos fictícios
router.get('/mockingproducts', (req, res) => {
    const mockProducts = Mocking.generateMockProducts();
    res.json(mockProducts);
});

// Rota para listar produtos
router.get('/', productController.getProducts.bind(productController));

module.exports = router;