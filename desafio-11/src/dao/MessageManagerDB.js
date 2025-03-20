const Message = require('./models/message.model');

class MessageManagerDB {
    async getMessages() {
        return await Message.find().sort({ timestamp: 1 });
    }

    async addMessage(user, message) {
        const newMessage = new Message({ user, message });
        return await newMessage.save();
    }
}

module.exports = MessageManagerDB;