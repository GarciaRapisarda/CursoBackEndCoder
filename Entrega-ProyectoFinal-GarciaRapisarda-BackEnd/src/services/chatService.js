const ChatDaoMongoDb = require("../daos/chatDaoMongoDb.js");

class ChatService {
    constructor() {
        this.chatDaoMongoDb = new ChatDaoMongoDb();
    }

    async getAll() {
        return await this.chatDaoMongoDb.getAll();
    }

    async getById(id) {
        return await this.chatDaoMongoDb.getById(id);
    }

    async create(chat) {
        return await this.chatDaoMongoDb.create(chat);
    }

    async deleteById(id) {
        return await this.chatDaoMongoDb.deleteById(id);
    }

    async updateById(id, chat) {
        return await this.chatDaoMongoDb.updateById(id, chat);
    }
}

module.exports = ChatService;