const express = require("express");
const ProductController = require("../controllers/product.controller");
const Mocking = require("../utils/mocking");

const router = express.Router();
const productController = new ProductController();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retorna a lista de produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/", productController.getProducts.bind(productController));

/**
 * @swagger
 * /products/mockingproducts:
 *   get:
 *     summary: Retorna 100 produtos fictícios
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos fictícios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get("/mockingproducts", (req, res) => {
  const mockProducts = Mocking.generateMockProducts();
  res.json(mockProducts);
});

module.exports = router;
