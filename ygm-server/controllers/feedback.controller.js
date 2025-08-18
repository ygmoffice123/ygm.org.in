import { asyncHandler } from "../utils/asyncHandler.js"; // optional utility
import { ApiResponse } from "../utils/ApiResponse.js"; // optional utility for consistent response
import Feedback from "../models/feedback.model.js";

// 1️⃣ Add Feedback
export const addFeedback = asyncHandler(async (req, res) => {
  const { company, feedback } = req.body;

  if (!company || !feedback) {
    return res.status(400).json(new ApiResponse(400, "Company and feedback are required"));
  }

  const newFeedback = await Feedback.create({ company, feedback });
  return res.status(201).json(new ApiResponse(201, newFeedback, "Feedback added successfully"));
});



export const getFeedbacks = asyncHandler(async (req, res) => {
  const { currentPage, limit } = req.params; // get from route params
  const skip = parseInt(currentPage) * parseInt(limit);

  // fetch paginated feedbacks
  const feedbacks = await Feedback.find()
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .lean();

  // get total count for frontend pagination
  const totalCount = await Feedback.countDocuments();

  return res.status(200).json(
    new ApiResponse(200, {
      feedbacks,
      totalCount,
    },"Feedbacks fetched successfully")
  );
});

// 3️⃣ Update Feedback by ID
export const updateFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { company, feedback } = req.body;

  const updatedFeedback = await Feedback.findByIdAndUpdate(
    id,
    { company, feedback },
    { new: true, runValidators: true }
  );

  if (!updatedFeedback) {
    return res.status(404).json(new ApiResponse(404, "Feedback not found"));
  }

  return res.status(200).json(new ApiResponse(200, "Feedback updated successfully", updatedFeedback));
});

// 4️⃣ Delete Feedback by ID
export const deleteFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedFeedback = await Feedback.findByIdAndDelete(id);

  if (!deletedFeedback) {
    return res.status(404).json(new ApiResponse(404, "Feedback not found"));
  }

  return res.status(200).json(new ApiResponse(200, "Feedback deleted successfully"));
});
