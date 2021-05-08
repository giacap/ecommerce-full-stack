const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Enter username'],
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Enter password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    cart: {
        type: Array,
        required: false
    },
    orders: {
        type: Array,
        required: false
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
})





//fire a function before user is saved to DB
UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})






module.exports = mongoose.model('User', UserSchema)