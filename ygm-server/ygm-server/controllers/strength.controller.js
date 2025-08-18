import StrengthModel from "../models/Strength.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const fetchStrengths = asyncHandler(async (req, res) => {
  const strengths = await StrengthModel.find().sort({ updatedAt: -1 }).lean();

  if (!strengths ) {
    throw new ApiError(404, "No strength records found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, strengths, "Strength records retrieved successfully."));
});


const   addStrength = asyncHandler(async (req, res) => {
  const strengthData = req.body;

  if (!strengthData || Object.keys(strengthData).length === 0) {
    throw new ApiError(400, "Strength data is required.");
  }

  const newStrength = await StrengthModel.create(strengthData);

  return res
    .status(201)
    .json(new ApiResponse(201, newStrength, "Strength record created successfully."));
});


const deleteStrength = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Strength ID parameter is missing.");
  }

  const deletedStrength = await StrengthModel.findByIdAndDelete(id);

  if (!deletedStrength) {
    throw new ApiError(404, "Strength record not found or already deleted.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedStrength, "Strength record deleted successfully."));
});

export {
  fetchStrengths,
  addStrength,
  deleteStrength
};
