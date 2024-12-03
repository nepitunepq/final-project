import Stat from '../models/statModel.js';

// Get stat by name
const getStat = async (req, res) => {
    const stat = await Stat.find();
    res.status(200).json(stat);
};

// Update stat by ID
let totalCps = 0;
let resetTimeout;

const updateStat = async (req, res) => {
    try {
        let filter = { name: req.body.name };
        const increment = { $inc: { value: req.body.value } }; // Use $inc operator
        let options = { new: true, runValidators: true };
        const updatedStat = await Stat.findOneAndUpdate(filter, increment, options);
        if (!updatedStat) {
            return res.status(404).json({ error: 'Stat not found' });
        }

        // Accumulate the CPS of all sessions
        totalCps += req.body.value;

        // Reset the total CPS to 0 after 1 second of inactivity
        clearTimeout(resetTimeout);
        resetTimeout = setTimeout(() => {
            totalCps = 0;
        }, 1000);

        filter = { name: 'totalCps' };
        const update = { value: totalCps };
        options = { upsert: true, new: true, runValidators: true };
        const stat = await Stat.findOneAndUpdate(filter, update, options);

        res.json({ updatedStat, totalCpsStat: stat });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getTotalCps = async (req, res) => {
    // Store the total CPS in the database
    const filter = { name: 'totalCps' };
    const update = { value: totalCps };
    const options = { upsert: true, new: true, runValidators: true };
    const stat = await Stat.findOneAndUpdate(filter, update, options);
    res.json(stat);
};

export { getStat, updateStat, getTotalCps};