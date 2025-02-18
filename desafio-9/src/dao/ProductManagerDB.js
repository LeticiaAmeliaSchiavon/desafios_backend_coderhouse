const Product = require('./models/product.model');

class ProductManagerDB {
    async getProducts() {
        return await Product.find();
    }

    async addProduct(product) {
        const newProduct = new Product(product);
        return await newProduct.save();
    }

    async deleteProduct(id) {
        return await Product.findByIdAndDelete(id);
    }
}

module.exports = ProductManagerDB;