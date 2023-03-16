
const mongoose = require("mongoose");
const session = require("express-session");

/* mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(res => console.log('Conectado a la base de datos!'))
  .catch(err => console.log('Error al conectarse con la base de datos!')) */

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    nombre: {
      type: String,
      required: true
    },
    telefono: {
      type: Number,
      required: true
    },
    direccion: {
      type: String,
      required: true
    },
    edad: {
      type: Number,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
  }
);

module.exports = mongoose.model("User", userSchema);
