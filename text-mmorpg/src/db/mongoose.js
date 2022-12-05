const mongoose = require('mongoose');

const fullConnectionURL = 'mongodb://127.0.0.1:27017/text-mmorpg'; // Database address

mongoose.connect(fullConnectionURL, {
    // userNewUrlParser: true,
    useUnifiedTopology: true
});

// const firstPlayer = Player({
//     name: 'Gaetan',
//     email: 'gaetan.blaise-cazalet@artfx.fr',
//     password: 'pass',
//     age: 34
// });
// firstPlayer.save().then( () => {
//     console.log(firstPlayer);
// }).catch( (error) => {
//     console.log('Error: ', error);
// });

// const firstQuest = Quest({
//     name: 'The first step',
//     description: 'Take your first steps in the world',
//     completion: false
// });
// firstQuest.save().then( () => {
//     console.log(firstQuest);
// }).catch( (error) => {
//     console.log('Error: ', error);
// });