const express = require('express');
const { restart } = require('nodemon');
require('./db/mongoose');

const Player = require('./models/player')
const Quest = require('./models/quest')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

//v POST =========================================================
// Create player - PROMISES
// app.post('/players', (req, res) => {
//     const player = Player(req.body);
//     player.save().then(() => {
//         res.status(202).send(player); // 202 is the CREATED status
//     }).catch((error) => {
//         res.status(400).send(error);
//     });
// });
// Create player - ASYNC / AWAIT
app.post('/players', async(req, res) => {
    const player = Player(req.body);
    try {
        await player.save();
        res.status(202).send(player); // 202 is the CREATED status
    } catch(error) {
        res.status(400).send(error);
    }
});
// Create quest
app.post('/quests', async(req, res) => {
    const quest = Quest(req.body);
    try {
        await quest.save();
        res.status(202).send(quest); // 202 is the CREATED status
    } catch(error) {
        res.status(400).send(error);
    }
});
//^ POST =========================================================
//v GET ==========================================================
// Get all players
app.get('/players', async (req, res) => {
    try {
        const players = await Player.find({});
        res.status(200).send(players);
    } catch(error) {
        res.status(500).send(); // 500 is the server status error
    }
});
// Get a specific player (by id)
app.get('/players/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const player = await Player.findById(_id); 
        if(!player) {
            return res.status(404).send(); // 400 is not found error
        }
        res.status(200).send(player); 
    } catch(error) {
        res.status(500).send(); // 500 is the server status error
    }
});
// Get all quests
app.get('/quests', async (req, res) => {
    try {
        const quests = await Quest.find({});
        res.status(200).send(quests); 
    } catch(error) {
        res.status(500).send(); // 500 is the server status error
    }
});
// Get a specific quest (by id)
app.get('/quests/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const quest = await Quest.findById(_id) 
        if(!quest) {
            return res.status(404).send(); // 400 is not found error
        }
        res.status(200).send(quest); 
    } catch(error) {
        res.status(500).send(); // 500 is the server status error
    }
});
//^ GET ==========================================================
//v PATCH ========================================================
// Update player by ID
app.patch('/players/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValid = updates.every( update => allowedUpdates.includes(update));
    if (!isValid) {
        res.status(400).send
    }

    try {
        const _id = req.params.id;
        const player = await Player.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true});
        if (!player) {                                              // ^ return the updated player 
            return res.status(404).send();
        }
        res.send(player)
    } catch (error) {
        res.status(400).send();
    }
})
// Update quest by ID
app.patch('/quests/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'completion'];
    const isValid = updates.every( update => allowedUpdates.includes(update));
    if (!isValid) {
        res.status(400).send
    }

    try {
        const _id = req.params.id;
        const quest = await Quest.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true});
        if (!quest) {                                             // ^ return the updated quest 
            return res.status(404).send();
        }
        res.send(quest)
    } catch (error) {
        res.status(400).send();
    }
})
//^ PATCH ========================================================


app.listen(port, () => {
    console.log('Server is up on port' + port)
});