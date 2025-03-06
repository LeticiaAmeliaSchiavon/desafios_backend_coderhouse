const express = require('express');
const ProductController = require('../controllers/product.controller');
const Mocking = require('../utils/mocking');
const logger = require('../utils/logger');

const router = express.Router();
const productController = new ProductController(); // Instancia o controlador

// Endpoint para gerar produtos fictícios
router.get('/mockingproducts', (req, res) => {
    const mockProducts = Mocking.generateMockProducts();
    res.json(mockProducts);
});

// Rota para listar produtos
router.get('/', productController.getProducts.bind(productController));

// Endpoint para testar logs
router.get('/loggerTest', (req, res) => {
    logger.debug('Este é um log de debug');
    logger.http('Este é um log de HTTP');
    logger.info('Este é um log de info');
    logger.warn('Este é um log de warning');
    logger.error('Este é um log de error');
    logger.fatal('Este é um log de fatal'); // Agora funciona!

    res.send('Logs testados com sucesso!');
});

module.exports = router;