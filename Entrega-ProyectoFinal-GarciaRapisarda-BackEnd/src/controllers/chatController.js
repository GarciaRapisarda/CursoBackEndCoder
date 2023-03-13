const ChatService = require("../services/chatService");
const chatService = new ChatService();

const postChat = async (email, message) => {
    const chat = { email, message };
    try {
      const savedChat = await chatService.create(chat);
      io.emit('new message', savedChat);
      return savedChat;
    } catch (error) {
      console.error('Error saving chat message:', error);
      throw error;
    }
  };

const getAll = async (req, res) => {
    const chat = await chatService.getAll();
    res.json(chat);
}

const getById = async (req, res) => {
    const chat = await chatService.getById(req.params.id);
    res.json(chat);
}

const create = async (req, res) => {
    const chat = await chatService.create(req.body);
    res.json(chat);
}

const deleteById = async (req, res) => {
    const chat = await chatService.deleteById(req.params.id);
    res.json(chat);
}

const updateById = async (req, res) => {
    const chat = await chatService.updateById(req.params.id, req.body);
    res.json(chat);
}

module.exports = {
    getAll,
    getById,
    create,
    deleteById,
    updateById,
    postChat
}