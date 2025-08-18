import ServiceModel from "../models/Service.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// ✅ Fetch all services
const fetchServices = asyncHandler(async (req, res) => {
  const services = await ServiceModel.find().sort({ updatedAt: -1 }).lean();

  if (!services || services.length === 0) {
    throw new ApiError(404, "No services found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, services, "Services retrieved successfully."));
});

// ✅ Add new service
const addService = asyncHandler(async (req, res) => {
  const serviceData = req.body;

  if (!serviceData || Object.keys(serviceData).length === 0) {
    throw new ApiError(400, "Service data is required to create a new entry.");
  }

  const newService = await ServiceModel.create(serviceData);

  return res
    .status(201)
    .json(new ApiResponse(201, newService, "Service created successfully."));
});

// ✅ Update service
const updateService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!id) {
    throw new ApiError(400, "Service ID parameter is missing.");
  }

  const updatedService = await ServiceModel.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  }); 

  if (!updatedService) {
    throw new ApiError(404, "Service not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedService, "Service updated successfully."));
});

// ✅ Delete service
const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Service ID parameter is missing.");
  }

  const deletedService = await ServiceModel.findByIdAndDelete(id);

  if (!deletedService) {
    throw new ApiError(404, "Service not found or already deleted.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedService, "Service deleted successfully."));
});

export {
  fetchServices,
  addService,
  updateService,
  deleteService
};
