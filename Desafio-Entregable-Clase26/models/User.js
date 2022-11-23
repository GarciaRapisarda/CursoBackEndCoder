import mongoose from "mongoose";

const collection = "Users";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
    password: { type: String, required: true },
    age: { type: Number}
});

export const users = mongoose.model(collection, UserSchema);