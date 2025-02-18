const MessageManagerDB = require('../dao/MessageManagerDB');

class MessageService {
    constructor() {
        this.messageManager = new MessageManagerDB();
    }

    async getMessages() {
        return await this.messageManager.getMessages();
    }

    async addMessage(user, message) {
        return await this.messageManager.addMessage(user, message);
    }
}

module.exports = MessageService;