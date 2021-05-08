import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
// import data from './data.js'
import mongoose from 'mongoose'
import userRouter from './routes/userRoute.js'
import orderRoute from './routes/orderRoute.js'
import productRoute from './routes/productRoute.js'

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is working." })
})

app.use("/api/user", userRouter)
app.use("/api/order", orderRoute)
app.use("/api/products", productRoute)

app.get("/api/paypal/clientid", (req, res) => {
    try {
        res.send({ clientid: process.env.clientid })
    } catch (error) {
        console.log(error)
    }

})

app.use((error, req, res, next) => {
    res.status(500).send({ message: error.message })
    next()
})

const starterFn = async () => {
    const db = process.env.dataBase || "mongodb+srv://Edo:QJYuQhMnenHLED60@cluster0.brfcq.mongodb.net/e-commerce?retryWrites=true&w=majority"
    const port = process.env.PORT || 8000
    await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }, () => console.log(`Data base is connected.`))
    app.listen(port, () => console.log(`Server is running on: ${port}.`))
}

starterFn()
