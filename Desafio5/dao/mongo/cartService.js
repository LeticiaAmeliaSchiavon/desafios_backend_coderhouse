const Cart = require('../models/cartModel');

class CartService {
  async createCart() {
    const newCart = await Cart.create({ products: [] });
    return newCart;
  }

  async getCartById(cartId) {
    return await Cart.findById(cartId).populate('products.productId');
  }

  async addProductToCart(cartId, productId, quantity) {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error('Cart not found');

    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

    if (productIndex >= 0) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    return cart;
  }

  async deleteProductFromCart(cartId, productId) {
    const cart = await Cart.findById(cartId);
    if (!cart) throw new Error('Cart not found');

    cart.products = cart.products.filter(p => p.productId.toString() !== productId);
    await cart.save();
    return cart;
  }
}

module.exports = new CartService();
