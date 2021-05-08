import mongoose from 'mongoose'

const Product = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        brand: { type: String, required: true },
        rating: { type: Number, required: true },
        numReviews: { type: Number, required: true },
        countInStock: { type: Number, required: true },
    },
    {
        timestamps: true
    }
)


export default mongoose.model("Product", Product)