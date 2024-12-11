const Product = require('../models/productModel');

class ProductService {
  async getAllProducts() {
    return await Product.find();
  }

  async getProductById(productId) {
    return await Product.findById(productId);
  }

  async createProduct(data) {
    return await Product.create(data);
  }

  async updateProduct(productId, data) {
    return await Product.findByIdAndUpdate(productId, data, { new: true });
  }

  async deleteProduct(productId) {
    return await Product.findByIdAndDelete(productId);
  }
}

module.exports = new ProductService();
