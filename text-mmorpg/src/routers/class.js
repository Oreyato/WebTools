const express = require('express');
const router = new express.Router();
const PlayerClass = require('../models/class');

//v POST =========================================================
router.post('/classes', async(req, res) => {
    const plClass = PlayerClass(req.body);
    try {
        await plClass.save();
        res.status(202).send(plClass); // 202 is the CREATED status
    } catch(error) {
        res.status(400).send(error);
    }
});
//^ POST =========================================================
//v GET ==========================================================
// Get all classes
router.get('/classes', async (req, res) => {
    try {
        const classes = await PlayerClass.find({});

        classes.forEach(plClass => {
            console.log(plClass.name + ": " + plClass.description)
        });

        res.status(200).send(classes);
    } catch(error) {
        res.status(500).send(); // 500 is the server status error
    }
});

// Get a specific class (by id)
router.get('/classes/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const plClass = await PlayerClass.findById(_id); 
        if(!plClass) {
            return res.status(404).send(); // 400 is not found error
        }
        console.log(plClass.name + ": " + plClass.description)
        res.status(200).send(plClass); 
    } catch(error) {
        res.status(500).send(); // 500 is the server status error
    }
});
//^ GET ==========================================================
//v DELETE =======================================================
// Delete class by id
router.delete('/classes/:id', async (req, res) => {
    try {
        const plClass = await PlayerClass.findByIdAndDelete(req.params.id);
        if (!plClass) {
            return res.status(404).send();
        }
        res.send(plClass);
    } catch (error) {
        res.status(500).send();
    }
});
//^ DELETE =======================================================

module.exports = router;
