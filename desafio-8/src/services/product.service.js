const ProductManagerFS = require('../dao/ProductManagerFS');
const ProductManagerDB = require('../dao/ProductManagerDB');

class ProductService {
    constructor(useDB = true) {
        this.productManager = useDB ? new ProductManagerDB() : new ProductManagerFS('./products.json');
    }

    async getProducts() {
        return await this.productManager.getProducts();
    }

    async addProduct(product) {
        return await this.productManager.addProduct(product);
    }

    async deleteProduct(id) {
        return await this.productManager.deleteProduct(id);
    }
}

module.exports = ProductService;