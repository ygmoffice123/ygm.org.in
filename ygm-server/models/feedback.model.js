import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    feedback: {
      type: String,
      required: true,
      trim: true,
    }
  },
  { timestamps: true } // createdAt and updatedAt
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
