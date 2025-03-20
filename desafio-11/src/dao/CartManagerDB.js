const Cart = require("./models/cart.model");

class CartManagerDB {
  async createCart() {
    const newCart = new Cart();
    return await newCart.save();
  }

  async getCartById(id) {
    return await Cart.findById(id).populate("products.product");
  }
}

module.exports = CartManagerDB;
