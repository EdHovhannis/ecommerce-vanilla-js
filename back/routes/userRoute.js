import express from 'express'
import User from '../models/User.js'
const router = express.Router()
import bcrypt from 'bcryptjs'
import expressAsyncHandler from 'express-async-handler'
import { generateToken, isAuth } from '../utils.js/utils.js'


router.get("/saveadmin", expressAsyncHandler (async (req, res) => {
    try {
        const user = new User({
            name: "Edgar",
            email: "e@gmail.com",
            password: "123456",
            isAdmin: true
        })
        const admin = await user.save()
        res.status(200).send(admin)
    } catch (err) {
        res.status(500).send({ message: "Something went wrong :(" })
        console.log(err)
    }
}))

router.post('/login', expressAsyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body
        const isUser = await User.findOne({ email }) 
        if (isUser) {
            if (bcrypt.compareSync(password, isUser.password)) {
                res.send({
                    _id: isUser._id,
                    name: isUser.name,
                    email: isUser.email,
                    isAdmin: isUser.isAdmin,
                    token: generateToken(isUser)
                })
                return
            } else {
                res.status(401).send({ error: "email or password is not correct" })
            }
        } else {
            res.status(401).send({ error: "email or password is not correct" })
        }
    } catch (error) {
        console.log(error)
    }
})
)

router.post('/register', expressAsyncHandler(async (req, res) => {
    try {
        const { name, email, password } = req.body
        const isUser = await User.findOne({ email })
        if (isUser) {
            res.status(401).send({ error: "User with that email already exists ." })
        } else {
            const user = new User({
                name, email, password: bcrypt.hashSync(password, 12)
            })
            const createdUser = await user.save()
            res.status(200).send({
                _id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email,
                isAdmin: createdUser.isAdmin,
                token: generateToken(createdUser)
            })
        }
    } catch (error) {
        console.log(error);
    }

})
)

router.get("/profile/:id", isAuth, expressAsyncHandler(async (req, res)=> {
    try {
        const profile = await User.findById(req.params.id)
        res.status(200).send(profile)
    } catch (error) {
        res.status(500).send({error: error.message})
        console.log(error)
    }
    
}))

router.post("/update/:id", isAuth, expressAsyncHandler( async (req, res)=> {
    try {
        const update = await User.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send(update)
    } catch (error) {
        res.status(500).send({error: error.message})
        console.log(error)
    }
    
}))
router.post("/refresh_passford/:id", isAuth, expressAsyncHandler(async (req, res)=> {
    try {
        const user = await User.findById(req.params.id)
        const { oldpassword, re1, re2} = req.body

        const check = await bcrypt.compareSync(oldpassword, user.password)
       

        if(check===true && re1===re2) {
            const new_password =  await bcrypt.hashSync(re1||re2, 12)
            const refreshed = await User.findByIdAndUpdate(req.params.id, {password: new_password})
            res.status(200).send({data: refreshed, message: "You have successfully changed your password"})   
        } else {
            if(re1!==re2) {
                res.status(500).send({error: 'password - 1 is not equal to password - 2' })
            } else {
                res.status(500).send({error: 'old password is not true' })
            }
        }
    } catch (error) {
        res.status(500).send({error: error.message})
        console.log(error)
    }
    
}))
router.post("/restore_passford", expressAsyncHandler(async (req, res)=> {
    try {
         const thatUser = await User.findOne(req.body)
        if(thatUser) {
            res.status(200).send({user: thatUser})
        } else {
            res.status(500).send({error: "User is not exist, email is wrong."})
        }
    } catch (error) {
        res.status(500).send({error: error.message})
        console.log(error)
    }
    
}))
router.post("/restore/:id", expressAsyncHandler(async (req, res)=> {
    try {
        const new_password =  req.body.newpassword
        const password = await bcrypt.hashSync(new_password, 12)
        const ok = await User.findByIdAndUpdate(req.params.id, {password})
        if(ok) {
            res.status(200).send({message: "You have successfully restore your password"})
        } else {
            res.status(500).send({error: "Something went wrong" })
        }
    } catch (error) {
        res.status(500).send({error: error.message})
        console.log(error)
    }
    
}))
  
export default router