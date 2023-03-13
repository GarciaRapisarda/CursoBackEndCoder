const Chat = require('../models/ChatModel');

class ChatDaoMongoDb {
  constructor() {
    this.chats = [];
  } 

  async getAll() {
    return await Chat.find();
  }

    async getById(id) {
        return await Chat.findById(id);
    }
    
  async create(chat) {
    return await Chat.create(chat);
  }

  async deleteById(id) {
    return await Chat.findByIdAndDelete(id);
  }

  async updateById(id, chat) {
    return await Chat.findByIdAndUpdate(id, chat);
  }
}

module.exports = ChatDaoMongoDb;