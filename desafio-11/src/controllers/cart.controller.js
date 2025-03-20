const CartService = require("../services/cart.service");
const { CustomError, errorDictionary } = require("../utils/errors");

const cartService = new CartService();

class CartController {
  async createCart(req, res) {
    try {
      const newCart = await cartService.createCart();
      res.status(201).json(newCart);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar carrinho." });
    }
  }

  async getCartById(req, res) {
    const cartId = req.params.id;
    try {
      const cart = await cartService.getCartById(cartId);
      if (!cart) {
        throw new CustomError(
          errorDictionary.CART_NOT_FOUND.message,
          errorDictionary.CART_NOT_FOUND.statusCode
        );
      }
      res.json(cart);
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}

module.exports = CartController;
