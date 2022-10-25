const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    id: ObjectId,
    nombre: String,
    precio: Number,
    imagen: String
});

const ProductModel = mongoose.model('Productos', productSchema);

module.exports = ProductModel;