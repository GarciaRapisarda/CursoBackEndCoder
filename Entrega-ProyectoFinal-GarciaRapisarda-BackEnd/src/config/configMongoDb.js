const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Base de datos conectada");
  } catch (error) {
    console.log("Error al conectar con la base de datos", error);
  }
};

module.exports = connectMongoDb;


