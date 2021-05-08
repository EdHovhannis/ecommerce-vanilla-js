import mongoose from 'mongoose'

const User = new mongoose.Schema({
    name: {type:String, required: true},
    email: {type: String, required: true, index: true, unique: true},
    password: {type: String, required: true},
    image: {type: String, required: true, default: "https://cdn4.iconfinder.com/data/icons/essential-app-2/16/user-avatar-human-admin-login-256.png"},
    isAdmin: {type: Boolean, required: true, default: false}
})

export default mongoose.model("User", User)