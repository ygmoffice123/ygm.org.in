import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    descriptionShort: {
      type: String,
      required: true,
    },
    descriptionLong: {
      type: String,
    },
    clientNo: {
      type: Number,
      default: 0,
    },
    employeeNo: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
    }
    },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
