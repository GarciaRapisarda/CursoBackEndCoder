const ChatModel = require('../models/chatMongoDbModel');

class ChatController {

    async getChat() {
        try {
            let chat = await ChatModel.find();
            if (chat.length === 0) {
                return null;
            }
            return chat;
        } catch (error) {
            console.log(error);
        }
    }
    
    async getChatById(email) {
        try {
            let chat = awat.ChatModel.findById(email);
            if (chat.length === 0) {
                return null;
            }
            return chat;
        } catch (error) {
            console.log(error);
        }

    }
}

    module.exports = new ChatController();