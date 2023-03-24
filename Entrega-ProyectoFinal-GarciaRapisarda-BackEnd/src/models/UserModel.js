const mongoose = require("mongoose");

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
    isAdmin: {
      type: String,
      default: "off"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
