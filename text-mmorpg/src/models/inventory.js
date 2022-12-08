const mongoose = require('mongoose')
const validator = require('validator')

const inventorySchema = new mongoose.Schema({
    playerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Player'
    },
    itemsIds: [{
        type: String,
        required: true
    }]
}, { timestamps: true });

const Inventory = mongoose.model('Inventory', inventorySchema)

module.exports = Inventory;