import mongoose from "mongoose";

const founderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    bio: {
      type: [String], // An array of paragraphs
      required: true,
    },
    quote: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default  mongoose.model("Founder", founderSchema);
