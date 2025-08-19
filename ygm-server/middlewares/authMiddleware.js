// // import jwt from "jsonwebtoken";
// // import { asyncHandler } from "../utils/asyncHandler.js";
// // import ApiError from "../utils/ApiError.js";
// // import adminModel from "../models/admin.model.js";

// // const authMiddleware = asyncHandler(async (req, res, next) => {
// //   const token = req.cookies?.accessToken;

  
// //   if (!token) {
// //       throw new ApiError(401, "Access token missing. Please log in.");
// //     }
// //     console.log(token);
    
    
// //     try {
// //         const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
// //         console.log(decoded);
        
        
// //         const user = await adminModel.findById(decoded._id).select("-password"); // exclude password
// //         console.log("hello");
// //     if (!user) {
// //       throw new ApiError(404, "Admin not found");
// //     }

// //     req.user = user;
// //     next();
// //   } catch (err) {
// //     throw new ApiError(401, "Invalid or expired token");
// //   }
// // });

// // export { authMiddleware };


import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import adminModel from "../models/admin.model.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  // ✅ Try to get token from cookie OR Authorization header
  let token = req.cookies?.accessToken;

  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Access token missing. Please log in.");
  }

  try {
    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // ✅ Fetch user without password
    const user = await adminModel.findById(decoded._id).select("-password");
    if (!user) {
      throw new ApiError(404, "Admin not found");
    }

    req.user = user;
    next();
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token");
  }
});

export { authMiddleware };
