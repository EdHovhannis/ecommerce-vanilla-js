import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    const { _id, name, email, isAdmin } = user
    return jwt.sign(
        {
            _id, name, email, isAdmin
        },
        process.env.SECRET || "somesecretstring",
        { expiresIn: "1d" }
    )
}

export const isAuth = (req, res, next) => {
    const authenticate = req.headers.authenticate 
    if(authenticate) {
        const token = authenticate.slice(7, authenticate.length)
        jwt.verify(token, process.env.SECRET || "somesecretstring", (err, decode)=>{
            if(err){
                (res.status(400).send({message: "Invalid token"}))
            }
            else {
                req.user = decode
                next()
            }
        })
    } else {
        res.status(401).send({message: "no token"})
    }
  
}