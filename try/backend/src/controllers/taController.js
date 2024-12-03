import TA from '../models/taModel.js';

// Get score by name
const getScore = async (req, res) => {
    const tas = await TA.find();
    res.status(200).json(tas);
};

// Update score by ID
const updateScore = async (req, res) => {
    try {
        const filter = { name: req.body.name };
        const increment = { $inc: { score: req.body.score } };
        const options = { new: true, runValidators: true };
        const updatedTA = await TA.findOneAndUpdate(filter, increment, options);
        if (!updatedTA) {
            return res.status(404).json({ error: 'Score not found' });
        }
        //console.log(`Increment value: ${req.body.score}`);
        //console.log(`Updated score: ${updatedTA.score}`);
        res.json(updatedTA);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export { getScore, updateScore};