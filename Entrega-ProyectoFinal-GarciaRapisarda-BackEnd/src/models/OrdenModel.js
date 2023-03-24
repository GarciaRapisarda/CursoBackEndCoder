const mongoose = require("mongoose");

const compraSchema = mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    cart: { type: mongoose.Types.ObjectId, ref: "Carritos" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Orden", compraSchema);