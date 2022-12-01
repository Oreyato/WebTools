const mongoose = require('mongoose');
const validator = require('validator');

const fullConnectionURL = 'mongodb://127.0.0.1:27017/text-mmorpg'; // Database address

mongoose.connect(fullConnectionURL, {
    // userNewUrlParser: true,
    useUnifiedTopology: true
});

const Player = mongoose.model('Player', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is not valid')
            }
        }
    },
    age: {
        type: Number,
        validate(value) {
            if(value < 1) {
                throw new Error('Age must be strictly positive')
            }
        }
    }
});

const firstPlayer = Player({
    name: 'Gaetan',
    email: 'gaetan.blaise-cazalet@artfx.fr',
    age: 34
});
firstPlayer.save().then( () => {
    console.log(firstPlayer);
}).catch( (error) => {
    console.log('Error: ', error);
});

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

const firstQuest = Quest({
    name: 'The first step',
    description: 'Take your first steps in the world',
    completion: false
});
firstQuest.save().then( () => {
    console.log(firstQuest);
}).catch( (error) => {
    console.log('Error: ', error);
});