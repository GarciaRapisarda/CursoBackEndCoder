const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema(
    {
    email: String,
    message: String,
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Chat', chatSchema);