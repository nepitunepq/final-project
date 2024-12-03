const mongoose = require('mongoose');

const ClickSchema = new mongoose.Schema({
    event: { type: String, required: true }, // "mousedown" or "mouseup"
    image: { type: String, required: true }, // "Oking.jpg" or "Dking.png"
    timestamp: { type: Date, default: Date.now }, // Automatically store the event time
});

module.exports = mongoose.model('Click', ClickSchema);
