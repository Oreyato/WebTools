const mongoose = require('mongoose')
const validator = require('validator')

const Quest = mongoose.model('Quest', {
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completion: {
        type: Boolean,
        required: false,
        default: false
    }
});

module.exports = Quest;