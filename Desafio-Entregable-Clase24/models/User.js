const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://garciargonzalo:coderbackendGGR@clustergarciarapisardab.ejfeucw.mongodb.net/ecommerce',
    { useNewUrlParser: true, useUnifiedTopology: true }
    );

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;