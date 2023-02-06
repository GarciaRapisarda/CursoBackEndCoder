import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Base de datos conectada");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDb;