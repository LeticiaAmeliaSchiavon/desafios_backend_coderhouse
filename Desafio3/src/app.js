const express = require('express');
const path = require('path');
const ProductManager = require('../ProductManager');

const app = express();
const port = 3000;
const productManager = new ProductManager(path.join(__dirname, 'products.json'));


app.use(express.json());


app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const products = await productManager.getProducts();

    if (limit && limit > 0) {
      return res.json(products.slice(0, limit));
    }

    res.json(products);
  } catch (error) {
    res.status(500).send('Erro ao obter produtos');
  }
});


app.get('/products/:pid', async (req, res) => {
  try {
    const product = await productManager.getProductById(parseInt(req.params.pid));

    if (product) {
      return res.json(product);
    }

    res.status(404).send('Produto não encontrado');
  } catch (error) {
    res.status(500).send('Erro ao obter o produto');
  }
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
