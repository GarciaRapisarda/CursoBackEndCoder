const ChatModel = require("../models/chatModel");
const UserModel = require("../models/UserModel");

class ChatController {
  async getAllMensajes(req, res) {
    try {
      let result = await ChatModel.find();
      return res.status(200).send({ status: "OK", result });
    } catch (error) {
      return { status: "ERROR", result: error.message };
    }
  }

  async getUserMensajes(req, res) {
    let { id } = req.params;
    try {
      let result = await ChatModel.find({ id });
      return res.status(200).send({ status: "OK", result });
    } catch (error) {
      return res.status(400).send({ status: "ERROR", result: error.message });
    }
  }

  async getListaUsuarios(req, res) {
    try {
      let result = await ChatModel.aggregate().sortByCount("sender");
      for (let i = 0; i < result.length; i++) {
        const element = result[i];
        let user = await UserModel.findById(element._id);
        element.user = user;
      }
      return res.status(200).send({ status: "OK", result });
    } catch (error) {
      return res.status(400).send({ status: "ERROR", result: error.message });
    }
  }
}

module.exports = new ChatController();