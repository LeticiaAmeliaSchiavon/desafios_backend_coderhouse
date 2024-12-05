const express = require('express');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');
const connectMongo = require('./dao/MongoDBManager');
const Message = require('./dao/models/message.model');

const app = express();
const PORT = process.env.PORT || 8080;

connectMongo();

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use(express.static('./src/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/chat', (req, res) => {
    res.render('chat', { title: 'Chat' });
});

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

const io = new Server(httpServer);

io.on('connection', async (socket) => {
    console.log('Novo cliente conectado');
    const messages = await Message.find();
    socket.emit('messageLog', messages);

    socket.on('newMessage', async (msg) => {
        await Message.create(msg);
        const messages = await Message.find();
        io.emit('messageLog', messages);
    });
});
