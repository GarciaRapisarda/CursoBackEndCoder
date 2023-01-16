const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const cartSchema = new Schema({
    id: ObjectId,
    id: String,
    productos: Array,
    timestamp: Date.now()
});

const CartModel = mongoose.model('Carritos', cartSchema);

module.exports = CartModel;