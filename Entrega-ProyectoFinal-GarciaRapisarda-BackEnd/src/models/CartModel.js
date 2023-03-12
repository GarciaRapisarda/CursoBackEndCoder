const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const cartSchema = new Schema({
    user: {
        id: String,
        email: String,
        nombre: String,
        direccion: String,
        telefono: Number,
        edad: Number,
        avatar: String
    },
    productos: [{
        product_id: String,
        quantity: Number,
        price: Number,
        nombre: String,
        foto: String,
        stock: Number 
    }],
    subTotal: {Number, default: 0},
    date: {type: Date, default: Date.now}
});



module.exports = mongoose.model('Carritos', cartSchema);