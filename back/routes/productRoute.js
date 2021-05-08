import express from 'express'
// import data from '../data.js'
const router = express.Router()
import expressAsyncHandler from 'express-async-handler'
import Product from '../models/Product.js'

router.get('/seed', expressAsyncHandler(async (req, res) => {
    // await Product.deleteMany()
    const products = await Product.insertMany(data.products)
    res.send({ products })
})
)

router.get("/", expressAsyncHandler(async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).send(products)
    } catch (err) {
        console.log(err)
    }
}))

router.get("/:id", expressAsyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            res.status(200).send(product)
        } else {
            res.status(404).send({ message: "product does not exist" })
        }
    } catch (error) {
        console.log(error)
    }
}))


export default router