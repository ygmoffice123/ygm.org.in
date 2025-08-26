import adminModel from "../models/admin.model.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateAccessToken } from "../utils/generateToken.js";

const registerAdmin = asyncHandler(async (req, res) => {
  console.log(req.body);
  
  const { fullName, username, email, password, role } = req.body;

  // Validate input
  if (!email || !fullName || !username || !password || !role) {
    throw new ApiError(400, "All fields are required");
  }
  
  
  // Allow only one admin
  const isExist = await adminModel.findOne({ role: "admin" });
  if (isExist) {
    throw new ApiError(400, "Admin already exists");
  }
  // console.log("hello");
  
  // Create new admin
  const newAdmin = await adminModel.create({
    fullName,
    username,
    email,
    password,
    role
  });

    // Generate access token
    const accessToken = generateAccessToken({ _id: newAdmin._id });

    // Set token in HTTP-only cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
  secure: process.env.NODE_ENV === "production", // sirf production me HTTPS ke sath
  sameSite: "strict", 
  maxAge: 60 * 60 * 1000, // 1 hour
    });

    // Respond
    return res.status(201).json(
      new ApiResponse(201, {admin:newAdmin ,token: accessToken }, "Admin registered successfully")
    );
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const admin = await adminModel.findOne({ email });
  if (!admin) throw new ApiError(401, "Invalid email or password");

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) throw new ApiError(401, "Invalid email or password");

  const accessToken = generateAccessToken({ _id: admin._id });

  // ✅ Save token in HTTP-only cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // only secure in production
    sameSite: "strict",
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  // ✅ Also return token in response (for localStorage fallback)
  res.status(200).json(
    new ApiResponse(200, { admin, token: accessToken }, "Login successful")
  );
});



const adminLogOut = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken", {
   httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict"
  });

  res.status(200).json({
    success: true,
    message: "Admin logged out successfully."
  });
});


const editAdmin = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const { fullName, username, email, password } = req.body;

  // Prevent updating email to one already used by another admin
  const isExist = await adminModel.findOne({ email, _id: { $ne: id } });
  if (isExist) {
    throw new ApiError(400, "Email already in use by another admin");
  }

  const updateFields = {};
  if (fullName) updateFields.fullName = fullName;
  if (username) updateFields.username = username;
  if (email) updateFields.email = email;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    updateFields.password = await bcrypt.hash(password, salt);
  }

  const newAdmin = await adminModel.findOneAndUpdate(
    { _id: id },
    updateFields,
    { new: true }
  );

  const accessToken = generateAccessToken({ _id: newAdmin._id });

res.cookie("accessToken", accessToken, {
   httpOnly: true,
  secure: process.env.NODE_ENV === "production", // sirf production me HTTPS ke sath
  sameSite: "strict", 
  maxAge: 60 * 60 * 1000, // 1 hour
});


 return res.status(201).json(
  new ApiResponse(201, { admin: newAdmin, token: accessToken }, "Admin updated successfully")
);
});



const getAdmin = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    throw new ApiError(404, "Admin not found");
  }

return res
  .status(200)
  .json(new ApiResponse(200, { admin: user }, "Admin fetched successfully"));

});


export const changePassword = async (req, res) => {
  try {
    const {oldPassword: currentPassword , newPassword } = req.body;
    const adminId = req.user._id; // comes from JWT middleware
    console.log(currentPassword);
    console.log(newPassword);


    
    
    const admin = await adminModel.findById(adminId);
    
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    
    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch)
      return res.status(400).json({ message: "Current password is incorrect" });
    
    admin.password = newPassword; // will be hashed by pre('save')
    await admin.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};


export { registerAdmin,adminLogOut,editAdmin ,getAdmin ,loginAdmin};
