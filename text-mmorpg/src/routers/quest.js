const express = require('express');
const router = new express.Router();
const Quest = require('../models/quest');

//v POST =========================================================
// Create quest
router.post('/quests', async(req, res) => {
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
// Get quests - Query Param: isCompleted
router.get('/quests', async (req, res) => {
    try {
        const completedQuery = req.query.isCompleted;
        let quests = [];

        if (completedQuery) {
            quests = await Quest.find({ isCompleted: completedQuery });
        } else {
            quests = await Quest.find({});
        }
        res.status(200).send(quests); 
    } catch(error) {
        res.status(500).send(); // 500 is the server status error
    }
});
// Get a specific quest (by id)
router.get('/quests/:id', async (req, res) => {
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
// Update quest by ID
router.patch('/quests/:id', async (req, res) => {
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
});
//^ PATCH ========================================================
//v DELETE =======================================================
// Delete quest by id
router.delete('/quests/:id', async (req, res) => {
    try {
        const quest = await Quest.findByIdAndDelete(req.params.id);
        if (!quest) {
            return res.status(404).send();
        }
        res.send(quest);
    } catch (error) {
        res.status(500).send();
    }
});
//^ DELETE =======================================================

module.exports = router;