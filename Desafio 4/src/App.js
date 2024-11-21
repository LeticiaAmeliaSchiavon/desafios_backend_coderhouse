const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');
const ProductManager = require('./ProductManager');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const productManager = new ProductManager(path.join(__dirname, 'products.json'));

// Handlebars
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// home
app.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', { title: 'Página Inicial', products });
});

// realtimeproducts
app.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { title: 'Produtos em Tempo Real', products });
});

// WebSocket
io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

// Enviar
    socket.emit('updateProducts', []);

// Adicionar
    socket.on('newProduct', async (product) => {
        await productManager.addProduct(product);
        const products = await productManager.getProducts();
        io.emit('updateProducts', products);
    });

// Excluir
    socket.on('deleteProduct', async (id) => {
        await productManager.deleteProduct(parseInt(id));
        const products = await productManager.getProducts();
        io.emit('updateProducts', products);
    });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
