const mongoose = require('mongoose')
const validator = require('validator')

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    subtype: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema)

module.exports = Item;