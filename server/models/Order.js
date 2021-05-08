const mongoose = require('mongoose')


const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    products: {
        type: Array,
        required: true
    }
})



module.exports = mongoose.model('Order', OrderSchema)