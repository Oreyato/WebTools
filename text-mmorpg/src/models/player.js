const mongoose = require('mongoose')
const validator = require('validator')

function toLower (val) {
    return val.toLowerCase();
}
function firstToCap(val) {
    const firstLetter = val[0].toUpperCase();
    const restOfTheName = val.slice(1).toLowerCase();

    return firstLetter+restOfTheName;
}

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
        // Transform the inGameName into a name starting by a capital letter
        set: firstToCap
    },
    class: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Class'
    },
    level: {
        type: Number,
        trim: true,
        required: false,
        default: 1,
        validate(value) {
            if(value < 1) {
                throw new Error('Level must be strictly positive');
            }
        }
    },
    currentQuest: {
        type: mongoose.Schema.Types.ObjectId,
        required:false,
        ref: 'Quest'
    }
},
{ timestamps: true });

playerSchema.virtual('inventory', {
    ref: 'Inventory',
    localField: '_id',
    foreignField: 'owner'
});

const Player = mongoose.model('Player', playerSchema)

module.exports = Player;