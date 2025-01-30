const ProductService = require('../services/product.service');

const productService = new ProductService();

class ProductController {
    async getProducts(req, res) {
        const products = await productService.getProducts();
        res.render('home', { products, user: req.user });
    }
}

module.exports = ProductController;