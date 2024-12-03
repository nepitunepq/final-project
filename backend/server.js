require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Click = require('./models/Click'); // Schema for storing clicks or changes

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON bodies

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.post('/api/clicks', async (req, res) => {
    try {
        const { event, image } = req.body; // Get data from frontend
        const click = new Click({ event, image });
        await click.save(); // Save to MongoDB
        res.status(201).json({ message: 'Event saved', click });
    } catch (err) {
        res.status(500).json({ message: 'Error saving event', error: err.message });
    }
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
