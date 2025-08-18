import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import founderModel from "../models/founder.model.js";

// Fetch all founders
const fetchAllFounder = asyncHandler(async (req, res) => {
  const founders = await founderModel.find({});

  if (!founders || founders.length === 0) {
    throw new ApiError(404, "No founder data found");
  }

  return res.status(200).json(
    new ApiResponse(200, { founders }, "Founder data fetched successfully")
  );
});

// Add Founder
const addFounder = asyncHandler(async (req, res) => {
  const { name, position, image, bio, quote } = req.body;

  if (!name || !position || !image || !bio || !Array.isArray(bio)) {
    throw new ApiError(400, "Name, position, image and bio (as array) are required");
  }

  const founder = await founderModel.create({ name, position, image, bio, quote });

  return res.status(201).json(
    new ApiResponse(201, founder, "Founder added successfully")
  );
});

// Edit Founder
const editFounder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, position, image, bio, quote } = req.body;

  const founder = await founderModel.findById(id);
  if (!founder) {
    throw new ApiError(404, "Founder not found");
  }

  founder.name = name || founder.name;
  founder.position = position || founder.position;
  founder.image = image || founder.image;
  founder.bio = Array.isArray(bio) ? bio : founder.bio;
  founder.quote = quote ?? founder.quote;

  await founder.save();

  return res.status(200).json(
    new ApiResponse(200, founder, "Founder updated successfully")
  );
});

// Delete Founder
const deleteFounder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const founder = await founderModel.findById(id);
  if (!founder) {
    throw new ApiError(404, "Founder not found");
  }

  await founder.deleteOne();

  return res.status(200).json(
    new ApiResponse(200, null, "Founder deleted successfully")
  );
});

export {
  fetchAllFounder,
  addFounder,
  editFounder,
  deleteFounder,
};
