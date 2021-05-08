import express from 'express'
const router = express.Router()
import { isAuth } from '../utils.js/utils.js';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/Order.js';

router.post("/createorder", isAuth, expressAsyncHandler(async (req, res) => {
    try {
        const { order, shipping, payment, price, isPaid, deliver } = req.body
        const orderItems = new Order({
            order,
            user: req.user._id,
            shipping,
            payment,
            price,
            isPaid,
            deliver
        })
        const createOrder = await orderItems.save()
        if (createOrder) {
            res.status(200).send({ order: createOrder })
        } else {
            res.status(500).send({ error: "Something went wrong!" })
        }
    } catch (err) {
        console.log(err)
    }
}))

router.get("/getorder/:id", expressAsyncHandler(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (order) {
            res.status(200).send({ order })
        } else {
            res.status(500).send({ error: "Order is empty, or something else went wrong." })
        }
    } catch (error) {
        console.log(error)
    }
}))

export default router