const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');
const ProductManager = require('src./ProductManager');

const app = express();
const httpServer = createServer(app); 
const io = new Server(httpServer);
const productManager = new ProductManager(path.join(__dirname, 'products.json'));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Listagem de produtos
app.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', { products });
});

app.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
});

io.on('connection', (socket) => {
    console.log('Novo cliente conectado!');

    socket.emit('updateProducts', { products: [] });

    socket.on('newProduct', async (product) => {
        await productManager.addProduct(product);
        const products = await productManager.getProducts();
        io.emit('updateProducts', products); 
    });

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
