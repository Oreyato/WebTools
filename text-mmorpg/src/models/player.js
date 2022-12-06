const mongoose = require('mongoose')
const validator = require('validator')

function toLower (val) {
    return val.toLowerCase();
}
// Comment faire, si je souhaite avoir plusieurs arguments

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        set: toLower
    },
    inGameName: {
        type: String,
        required: true,
        trim: true,
        set: toLower
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Class'
    },
    level: {
        type: Number,
        trim: true,
        validate(value) {
            if(value < 1) {
                throw new Error('Level must be strictly positive');
            }
        }
    },
    equippedItems: [{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Item'
    }],
    inventory: [{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Item'
    }],
    currentQuest: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Quest'
    }
}, { timestamps: true });

// playerSchema.virtual('quests', {
//     ref: 'Quest',
//     localField: '_id',
//     foreignField: 'owner'
// });

const Player = mongoose.model('Player', playerSchema)

module.exports = Player;