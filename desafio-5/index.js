require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const handlebars = require('express-handlebars');
const chatRoutes = require('./routes/chatRoutes');
const MessageService = require('./dao/mongo/messageService');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Configurações do Express e Handlebars
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Rotas
app.use('/api/chat', chatRoutes);

// WebSocket
io.on('connection', (socket) => {
  console.log('Novo cliente conectado');

  socket.on('newMessage', async (data) => {
    try {
      await MessageService.createMessage(data);
      const messages = await MessageService.getAllMessages();
      io.emit('messages', messages);
    } catch (error) {
      console.error('Erro ao salvar ou buscar mensagens:', error);
    }
  });
});

// Inicialização do servidor
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
