import mongoose from 'mongoose'

const Order = new mongoose.Schema({
    order: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        }
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    shipping: { address: String, postalCode: String },
    payment: {
        method: String, paymentResult: {
            orderID: String,
            payerID: String,
            paymentID: String
        }
    },
    price: Number,
    isPaid: { type: Boolean, required: true, default: false },
    paid: Date,
    isDelivered: { type: Boolean, required: true, default: false },
    deliver: Date
},
    {
        timestamps: true
    }
)

export default mongoose.model("Order", Order)
