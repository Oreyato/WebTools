const express = require('express');
const router = new express.Router();
const Inventory = require('../models/inventory');

//v POST =========================================================
// Create inventory
router.post('/inventories', async(req, res) => {
    const inventory = Inventory(req.body);
    try {
        await inventory.save();
        res.status(202).send(inventory); // 202 is the CREATED status
    } catch(error) {
        res.status(400).send(error);
    }
});
//^ POST =========================================================
//v GET ==========================================================
// Get inventories - Query Param: isCompleted
router.get('/inventories', async (req, res) => {
    try {
        const completedQuery = req.query.isCompleted;
        let inventories = [];

        if (completedQuery) {
            inventories = await Inventory.find({ isCompleted: completedQuery });
        } else {
            inventories = await Inventory.find({});
        }
        res.status(200).send(inventories); 
    } catch(error) {
        res.status(500).send(); // 500 is the server status error
    }
});
// Get a specific inventory (by id)
router.get('/inventories/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const inventory = await Inventory.findById(_id) 
        if(!inventory) {
            return res.status(404).send(); // 400 is not found error
        }
        res.status(200).send(inventory); 
    } catch(error) {
        res.status(500).send(); // 500 is the server status error
    }
});
//^ GET ==========================================================
//v PATCH ========================================================
// Update inventory by ID
router.patch('/inventories/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'type'];
    const isValid = updates.every( update => allowedUpdates.includes(update));
    if (!isValid) {
        res.status(400).send
    }

    try {
        const _id = req.params.id;
        const inventory = await Inventory.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true});
        if (!inventory) {                                             // ^ return the updated inventory 
            return res.status(404).send();
        }
        res.send(inventory)
    } catch (error) {
        res.status(400).send();
    }
});
//^ PATCH ========================================================
//v DELETE =======================================================
// Delete inventory by id
router.delete('/inventories/:id', async (req, res) => {
    try {
        const inventory = await Inventory.findByIdAndDelete(req.params.id);
        if (!inventory) {
            return res.status(404).send();
        }
        res.send(inventory);
    } catch (error) {
        res.status(500).send();
    }
});
//^ DELETE =======================================================

module.exports = router;