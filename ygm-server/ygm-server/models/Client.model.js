import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  logo: String,
  website: {
    type: String,
    default: "#",
  },
  serviceType: {
    type: String,
  },
  duration: String,
  serviceID: {
    type: mongoose.Schema.Types.ObjectId, // MongoDB default _id from Service
    ref: "Service",                       // Reference to Service collection
  }
}, { timestamps: true });

export default mongoose.model("Client", clientSchema);
