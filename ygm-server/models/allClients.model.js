import mongoose from "mongoose";

const allClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    logo: String,
    duration: String,
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],

    order: {
      type: Number,
      required: true,
      default: 9999, 
    },
  },
  { timestamps: true }
);

export default mongoose.model("allClient", allClientSchema);
