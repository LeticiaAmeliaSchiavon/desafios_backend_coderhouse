const ProductService = require('../services/product.service');
const { CustomError, errorDictionary } = require('../utils/errors');

const productService = new ProductService();

class ProductController {
    async getProducts(req, res) {
        try {
            const products = await productService.getProducts();
            res.render('home', { products, user: req.user });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar produtos.' });
        }
    }

    async getProductById(req, res) {
        const productId = req.params.id;
        try {
            const product = await productService.getProductById(productId);
            if (!product) {
                throw new CustomError(errorDictionary.PRODUCT_NOT_FOUND.message, errorDictionary.PRODUCT_NOT_FOUND.statusCode);
            }
            res.json(product);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }

    async addProduct(req, res) {
        const productData = req.body;
        try {
            if (!productData.title || !productData.price) {
                throw new CustomError(errorDictionary.INVALID_PRODUCT_DATA.message, errorDictionary.INVALID_PRODUCT_DATA.statusCode);
            }
            const newProduct = await productService.addProduct(productData);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }
}

module.exports = ProductController;