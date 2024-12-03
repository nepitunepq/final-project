import mongoose from 'mongoose';

const statSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, default: 0 },
});

const Stat = mongoose.model('stat', statSchema);

export default Stat;