import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true, // ye ya to local path hoga ya cloud URL
    }
  },
  { timestamps: true } // createdAt and updatedAt automatically
);

const Gallery = mongoose.model("Gallery", gallerySchema);

export default Gallery;
