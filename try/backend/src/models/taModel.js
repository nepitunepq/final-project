import mongoose from 'mongoose';

const taSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, default: 0 },
});

const TA = mongoose.model('TA', taSchema);

export default TA;