/**
 * This isn't the right way to handle databases, but I wanted 
 * to try some experimentations with virtuals and validate
 */

const mongoose = require('mongoose')
const validator = require('validator')

const classNames = [
    "Warrior",
    "Ranger",
    "Wizard"
];

const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate(value) {
            let found = false;

            classNames.forEach(className => {
                if (value == className) {
                    found = true;
                }
            });

            if (!found) {
                const strClNames = classNames.join(", ")

                throw new Error('Please enter a proper class name between ' + strClNames);
            }
        }
    }
}, 
{virtuals: {
    description: {
        get() {
            if (this.name == classNames[0]) {
                return "Warriors are known for their unparalleled mastery with weapons and armor, and their thorough knowledge of the skills of combat."
            } else if (this.name == classNames[1]) {
                return "Rangers keep their unending watch..."
            } else if (this.name == classNames[2]) {
                return "Wizards are supreme magic-users, defined and united as a class by the spells they cast."
            }
        }
    }
}},
{ timestamps: true });

const PlayerClass = mongoose.model('PlayerClass', classSchema)

module.exports = PlayerClass;