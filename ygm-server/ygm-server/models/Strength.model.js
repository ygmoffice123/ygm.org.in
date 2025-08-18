import mongoose from 'mongoose';

const strengthSchema = new mongoose.Schema({
  img: String,
  title: {
    type: String,
    required: true,
  },
  description: String,
  badge: {
    type: String,
    default: "",
  }
}, { timestamps: true });

export default mongoose.model("Strength", strengthSchema);
