import contactInfoModel from "../models/contactInfo.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get contact info (assumes only one document exists)
const getContactInfo = asyncHandler(async (req, res) => {
  const info = await contactInfoModel.findOne().lean();

  if (!info) {
    throw new ApiError(404, "Contact information not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, info, "Contact information retrieved successfully."));
});

// Create contact info (usually once)
const createContactInfo = asyncHandler(async (req, res) => {
  const data = req.body;

  if (!data || Object.keys(data).length === 0) {
    throw new ApiError(400, "Contact information is required.");
  }

  const newInfo = await contactInfoModel.create(data);

  return res
    .status(201)
    .json(new ApiResponse(201, newInfo, "Contact information created successfully."));
});

// Update existing contact info
const updateContactInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Contact info ID is required.");
  }

  const updatedInfo = await contactInfoModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedInfo) {
    throw new ApiError(404, "Contact information not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedInfo, "Contact information updated successfully."));
});

export { getContactInfo, createContactInfo, updateContactInfo };
