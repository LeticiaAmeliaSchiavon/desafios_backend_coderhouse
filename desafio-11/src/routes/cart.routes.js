const express = require("express");
const CartController = require("../controllers/cart.controller"); // Caminho correto

const router = express.Router();
const cartController = new CartController();

/**
 * @swagger
 * /carts:
 *   post:
 *     summary: Cria um novo carrinho
 *     tags: [Carrinhos]
 *     responses:
 *       201:
 *         description: Carrinho criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 */
router.post("/", cartController.createCart.bind(cartController));

/**
 * @swagger
 * /carts/{id}:
 *   get:
 *     summary: Retorna um carrinho pelo ID
 *     tags: [Carrinhos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do carrinho
 *     responses:
 *       200:
 *         description: Carrinho encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Carrinho não encontrado
 */
router.get("/:id", cartController.getCartById.bind(cartController));

module.exports = router;
