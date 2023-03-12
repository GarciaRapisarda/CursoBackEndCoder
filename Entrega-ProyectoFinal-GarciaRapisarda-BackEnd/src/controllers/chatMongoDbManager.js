const ChatModel = require('../models/chatMongoDbModel');
const mongoose = require('mongoose');

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
    
    async getChatById(id) {
        try {
            let chat = await ChatModel.findById(mongoose.Types.ObjectId(id));
            if (!chat) {
                return null;
            }
            return chat;
        } catch (error) {
            console.log(error);
        }
    }
    async postChat(email, message) {
        try {
            let chat = new ChatModel({email, message});
            await chat.save();
            return chat;
        } catch (error) {
            console.log(error);
        }
    }
}

    module.exports = new ChatController();