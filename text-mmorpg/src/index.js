const express = require('express');
require('./db/mongoose');

const Player = require('./models/player')
const Quest = require('./models/quest')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

//v POST =========================================================
// Create player
app.post('/players', (req, res) => {
    const player = Player(req.body);
    player.save().then(() => {
        res.status(202).send(player); // 202 is the CREATED status
    }).catch((error) => {
        res.status(400).send(error);
    });
});
// Create quest
app.post('/quests', (req, res) => {
    const quest = Quest(req.body);
    quest.save().then(() => {
        res.status(202).send(quest);
    }).catch((error) => {
        res.status(400).send(error);
    });
});
//^ POST =========================================================
//v GET ==========================================================
// Get all players
app.get('/players', (req, res) => {
    Player.find({}).then((players) => {
        res.status(200).send(players); 
    }).catch((error) => {
        res.status(500).send(); // 500 is the server status error
    });
});
// Get a specific player (by id)
app.get('/players/:id', (req, res) => {
    const _id = req.params.id;
    Player.findById(_id).then((player) => { // DEMANDER A GAETAN ===================
        console.log(player)
        if(!player) {
            return res.status(404).send(); // 400 is not found error
        }
        res.status(200).send(player); 
    }).catch((error) => {
        res.status(500).send(); // 500 is the server status error
    });
});
// Get all quests
app.get('/quests', (req, res) => {
    Quest.find({}).then((quests) => {
        res.status(200).send(quests); 
    }).catch((error) => {
        res.status(500).send(); // 500 is the server status error
    });
});
// Get a specific quest (by id)
app.get('/quests/:id', (req, res) => {
    const _id = req.params.id;
    Quest.findById(_id).then((quest) => { // DEMANDER A GAETAN ===================
        console.log(quest)
        if(!quest) {
            return res.status(404).send(); // 400 is not found error
        }
        res.status(200).send(quest); 
    }).catch((error) => {
        res.status(500).send(); // 500 is the server status error
    });
});
//^ GET ==========================================================

app.listen(port, () => {
    console.log('Server is up on port' + port)
});