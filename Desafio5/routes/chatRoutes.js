const express = require('express');
const MessageService = require('../dao/mongo/messageService');
const router = express.Router();

// Endpoint para obter todas as mensagens
router.get('/', async (req, res) => {
  try {
    const messages = await MessageService.getAllMessages();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para criar uma nova mensagem
router.post('/', async (req, res) => {
  try {
    const { user, message } = req.body;
    const newMessage = await MessageService.createMessage({ user, message });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
