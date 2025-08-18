import mongoose from 'mongoose';

const contactInfoSchema = new mongoose.Schema({
  email: String,
  address: String,
  phoneNumbers: [String],
  whatsappNumber: String,
  whatsappText: String
}, { timestamps: true });

export default mongoose.model('ContactInfo', contactInfoSchema);
