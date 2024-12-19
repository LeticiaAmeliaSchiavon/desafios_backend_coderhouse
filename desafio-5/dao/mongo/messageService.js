const Message = require('../models/messageModel');

class MessageService {
  async getAllMessages() {
    return await Message.find().sort({ timestamp: 1 });
  }

  async createMessage(data) {
    return await Message.create(data);
  }
}

module.exports = new MessageService();
