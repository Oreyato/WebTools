const express = require('express');
const router = new express.Router();
const Player = require('../models/player');
const Inventory = require('../models/inventory')

//v POST =========================================================
// Create player - ASYNC / AWAIT
router.post('/players', async(req, res) => {
    const player = Player(req.body);
    try {
        await player.save();

        try {
            await player.populate('inventory');
            // Log items
            console.log(player.inventory);

            const inventory = Inventory({owner: player._id, itemsIds: []});
            await inventory.save();

        } catch (error) {
            return res.status(400).send(error);
        }

        res.status(202).send(player); // 202 is the CREATED status
        
    } catch(error) {
        res.status(400).send(error);
    }
});
//^ POST =========================================================
//v GET ==========================================================
// Get all players
router.get('/players', async (req, res) => {
    try {
        const players = await Player.find({});
        res.status(200).send(players);
    } catch(error) {
        res.status(500).send(); // 500 is the server status error
    }
});
// Get a specific player (by id)
router.get('/players/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const player = await Player.findById(_id); 
        if(!player) {
            return res.status(404).send(); // 400 is not found error
        }

        // Log their items
        const inventory = await Inventory.find({playerId: player._id});
        console.log(inventory);

        res.status(200).send(player); 
    } catch(error) {
        res.status(500).send(); // 500 is the server status error
    }
});
//^ GET ==========================================================
//v PATCH ========================================================
// Update player by ID
router.patch('/players/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['inGameName', 'level', 'equippedItems', 'inventory', 'currentQuest'];
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
//^ PATCH ========================================================
//v DELETE =======================================================
// Delete player by id
router.delete('/players/:id', async (req, res) => {
    try {
        const player = await Player.findByIdAndDelete(req.params.id);
        if (!player) {
            return res.status(404).send();
        }
        res.send(player);
    } catch (error) {
        res.status(500).send();
    }
});
//^ DELETE =======================================================

module.exports = router;
