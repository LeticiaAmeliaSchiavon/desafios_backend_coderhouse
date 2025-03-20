const CartManagerDB = require("../dao/CartManagerDB");

class CartService {
  constructor() {
    this.cartManager = new CartManagerDB();
  }

  async createCart() {
    return await this.cartManager.createCart();
  }

  async getCartById(id) {
    return await this.cartManager.getCartById(id);
  }
}

module.exports = CartService;
