const express = require('express');
const router = new express.Router();
const Item = require('../models/item');

//v POST =========================================================
// Create item
router.post('/items', async(req, res) => {
    const item = Item(req.body);
    try {
        await item.save();
        res.status(202).send(item); // 202 is the CREATED status
    } catch(error) {
        res.status(400).send(error);
    }
});
//^ POST =========================================================
//v GET ==========================================================
// Get items - Query Param: subtype - type
router.get('/items', async (req, res) => {
    try {
        const typeQuery = req.query.type;
        const subtypeQuery = req.query.subtype;

        let items = [];

        if (subtypeQuery) {
            items = await Item.find({ subtype: subtypeQuery });
        }
        else if (typeQuery) {
            items = await Item.find({ type: typeQuery });
        } else {
            items = await Item.find({});
        } 
        res.status(200).send(items); 
    } catch(error) {
        res.status(500).send(); // 500 is the server status error
    }
});
// Get a specific item (by id)
router.get('/items/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const item = await Item.findById(_id) 
        if(!item) {
            return res.status(404).send(); // 400 is not found error
        }
        res.status(200).send(item); 
    } catch(error) {
        res.status(500).send(); // 500 is the server status error
    }
});
//^ GET ==========================================================
//v PATCH ========================================================
// Update item by ID
router.patch('/items/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'type'];
    const isValid = updates.every( update => allowedUpdates.includes(update));
    if (!isValid) {
        res.status(400).send
    }

    try {
        const _id = req.params.id;
        const item = await Item.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true});
        if (!item) {                                             // ^ return the updated item 
            return res.status(404).send();
        }
        res.send(item)
    } catch (error) {
        res.status(400).send();
    }
});
//^ PATCH ========================================================
//v DELETE =======================================================
// Delete item by id
router.delete('/items/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).send();
        }
        res.send(item);
    } catch (error) {
        res.status(500).send();
    }
});
//^ DELETE =======================================================

module.exports = router;