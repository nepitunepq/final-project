const express = require('express');
const Click = require('../models/Click');

const router = express.Router();

// Save a new click
router.post('/', async (req, res) => {
    try {
        const click = new Click();
        await click.save();
        res.status(201).json({ message: 'Click recorded', click });
    } catch (err) {
        res.status(500).json({ message: 'Error recording click', error: err.message });
    }
});

// Get all clicks
router.get('/', async (req, res) => {
    try {
        const clicks = await Click.find();
        res.status(200).json(clicks);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching clicks', error: err.message });
    }
});

module.exports = router;
