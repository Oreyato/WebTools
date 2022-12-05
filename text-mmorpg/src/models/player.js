const mongoose = require('mongoose')
const validator = require('validator')

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is not valid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 7) {
                throw new Error('Password should have a minimum of 7 characters');
            } else if (value.toLowerCase().includes('password')) {
                throw new Error('Please write a safer password');
            }
        }
    },
    age: {
        type: Number,
        trim: true,
        validate(value) {
            if(value < 1) {
                throw new Error('Age must be strictly positive');
            }
        }
    }
});

const Player = mongoose.model('Player', playerSchema)

module.exports = Player;