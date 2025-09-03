import ClientModel from "../models/Client.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// const fetchClients = asyncHandler(async (req, res) => {
//   const { currentPage, limit } = req.params;
//   const skip = parseInt(currentPage) * parseInt(limit);

//   const clients = await ClientModel.aggregate([
//     // Group by name, pick the one with max updatedAt
//     {
//       $group: {
//         _id: "$name",
//         doc: { $first: "$$ROOT" }
//       }
//     },

//     // Replace doc as root
//     { $replaceRoot: { newRoot: "$doc" } },

//     // Now sort all unique clients by updatedAt (latest first)
//     { $sort: { updatedAt: -1 } },

//     // Pagination
//     { $skip: skip },
//     { $limit: parseInt(limit) }
//   ]);

//   if (!clients || clients.length === 0) {
//     throw new ApiError(404, "No clients found.");
//   }

//   const totalCountData = await ClientModel.aggregate([
//     { $group: { _id: "$name" } },
//     { $count: "totalCount" }
//   ]);
//   const totalCount = totalCountData.length > 0 ? totalCountData[0].totalCount : 0;

//   return res.status(200).json(
//     new ApiResponse(
//       200,
//       { clients, totalCount },
//       "Clients retrieved successfully."
//     )
//   );
// });


  const fetchClients = asyncHandler(async (req, res) => {
    const { currentPage, limit } = req.params;
    const skip = parseInt(currentPage) * parseInt(limit);

    const clients = await ClientModel.aggregate([

        // { $addFields: { order: { $ifNull: ["$order", 9999] } } },

      // Step 1: Sort documents by order ASC (min order first, latest updatedAt tiebreaker)
      { $sort: { order: 1, updatedAt: -1 } },

      // Step 2: Group by name, pick first (which is min order because of sort above)
      {
        $group: {
          _id: "$name",
          doc: { $first: "$$ROOT" }
        }
      },

      // Step 3: Replace doc as root
      { $replaceRoot: { newRoot: "$doc" } },

      // Step 4: Global sort again by order ASC
      { $sort: { order: 1 } },

      // Step 5: Pagination
      { $skip: skip },
      { $limit: parseInt(limit) }
    ]);

    if (!clients || clients.length === 0) {
      throw new ApiError(404, "No clients found.");
    }

    // Count unique names
    const totalCountData = await ClientModel.aggregate([
      { $group: { _id: "$name" } },
      { $count: "totalCount" }
    ]);
    const totalCount = totalCountData.length > 0 ? totalCountData[0].totalCount : 0;

    return res.status(200).json(
      new ApiResponse(
        200,
        { clients, totalCount },
        "Clients retrieved successfully."
      )
    );
  });




const getAllClient = asyncHandler(async (req, res) => {

  const clients = await ClientModel.find().sort({order:1}).lean();

  if (!clients || clients.length === 0) {
    throw new ApiError(404, "No clients found.");
  }     

  return res
    .status(200)
    .json(new ApiResponse(200, clients, "Clients retrieved successfully."));
});



const fetchClientsByService = asyncHandler(async (req, res) => {
  const { serviceID } = req.params;

  // console.log("helllloooooo");
  
  console.log("service ID:",serviceID);
  

  if (!serviceID) {
    throw new ApiError(400, "Service ID is required.");
  }

  const clients = await ClientModel.find({ serviceID }).lean();

  if (!clients || clients.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No clients found for this service."));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, clients, "Clients retrieved successfully."));
});

const addClient = asyncHandler(async (req, res) => {
  const clientData = req.body;

  if (!clientData || Object.keys(clientData).length === 0) {
    throw new ApiError(400, "Client data is required.");
  }

  let newClients;

  // Check if clientData is an array (multiple clients)
  if (Array.isArray(clientData)) {
    newClients = await ClientModel.insertMany(clientData);
    return res
      .status(201)
      .json(new ApiResponse(201, newClients, "Multiple clients created successfully."));
  } else {
    // Single client
    newClients = await ClientModel.create(clientData);
    return res
      .status(201)
      .json(new ApiResponse(201, newClients, "Client created successfully."));
  }
});



const deleteClient = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Client ID parameter is missing.");
  }

  const deletedClient = await ClientModel.findByIdAndDelete(id);

  if (!deletedClient) {
    throw new ApiError(404, "Client not found or already deleted.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedClient, "Client deleted successfully."));
});




const editClient = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  if (!id) {
    throw new ApiError(400, "Client ID parameter is missing.");
  }

  if (!updatedData || Object.keys(updatedData).length === 0) {
    throw new ApiError(400, "Updated client data is required.");
  }

  const updatedClient = await ClientModel.findByIdAndUpdate(id, updatedData, {
    new: true,       // return the updated document
    runValidators: true // ensure schema validation runs
  }).lean();

  if (!updatedClient) {
    throw new ApiError(404, "Client not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedClient, "Client updated successfully."));
});




const editClientOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { prePosition, newPosition } = req.body;

  if (!id) throw new ApiError(400, "Client ID parameter is missing.");
  if (!prePosition || !newPosition) throw new ApiError(400, "Client position is required.");

  let updatedClient;

  if (newPosition > prePosition) {
    // Moving down
    updatedClient = await ClientModel.updateMany(
      { order: { $gt: prePosition, $lte: newPosition } },
      { $inc: { order: -1 } }
    );
  } else if (newPosition < prePosition) {
    // Moving up
    updatedClient = await ClientModel.updateMany(
      { order: { $gte: newPosition, $lt: prePosition } },
      { $inc: { order: 1 } }
    );
  }

  // Finally update moved item itself
  await ClientModel.findByIdAndUpdate(id, { order: newPosition });

  return res.status(200).json(
    new ApiResponse(200, updatedClient, "Client order updated successfully.")
  );
});




export {
  fetchClients,
  addClient,
  deleteClient,
  fetchClientsByService,
  getAllClient,
  editClient,
  editClientOrder
};
