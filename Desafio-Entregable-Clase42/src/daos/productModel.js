import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name: { type: String },
        description: { type: String },
        price: { type: Number }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Product", productSchema);
