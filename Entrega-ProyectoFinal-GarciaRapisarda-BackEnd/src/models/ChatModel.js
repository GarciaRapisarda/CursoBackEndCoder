/* const mongoose = require('mongoose');

const chatSchema = mongoose.Schema(
    {
    email: String,
    message: String,
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Chat', chatSchema); */

const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    sender: { type: mongoose.Types.ObjectId, ref: "User" },
    receiver: { type: mongoose.Types.ObjectId, ref: "User" },
    mensaje: { type: String, required: true },
    email: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chat", chatSchema);