const mongoose = require('mongoose')
const validator = require('validator')

const questSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: false,
        default: false
    }
}, { timestamps: true });

const Quest = mongoose.model('Quest', questSchema)

module.exports = Quest;