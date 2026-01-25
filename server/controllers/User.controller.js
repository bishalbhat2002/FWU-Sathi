import { asyncHandler } from "../utilities/AsyncHandler.utility.js";
import { User } from "../models/user.model.js";
import { ErrorHandler } from "../utilities/ErrorHandler.utility.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import multer from "multer";

// Encrypt Password function
const encryptPassword = async (plainPassword) => {
  return await bcrypt.hash(plainPassword, 10);
};

// Compare Password function
const comparePassword = async (plainPassword, hash) => {
  return await bcrypt.compare(plainPassword, hash);
};

// Create Token for login
const createToken = async (data) => {
  return await jwt.sign(data, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Code for Loggin user
export const login = asyncHandler(async (req, res, next) => {
  //   console.log("Login page");

  let { email, password } = req.body;

  email = email?.trim();
  password = password?.trim();

  // Check for missing fields
  if (!email || !password) {
    return next(new ErrorHandler(400, "All fields are required."));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler(400, "Wrong Username or Password."));
  }

  if (!(await comparePassword(password, user.password))) {
    return next(new ErrorHandler(400, "Wrong Username or Password."));
  }

  const tokenData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    semester: user.semester,
    photo: user.photo,
  };

  const token = await createToken(tokenData);

  return res
    .status(200)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 10000,
      ),
      httpOnly: true,
      secure: process.env.NOTE_ENV === "production",
      sameSite: "lax",
    })
    .json({
      success: true,
      message: "User logged in successfully",
      user,
    });
});

// Code for Registering User
export const register = asyncHandler(async (req, res, next) => {
  console.log("Register req hit...");
  let { name, email, password, gender, program, semester, college, address } =
    req.body;

  // Trim all string inputs
  name = name?.trim();
  email = email?.trim();
  password = password?.trim();
  program = program?.trim();
  college = college?.trim();
  address = address?.trim();
  gender = gender?.toLowerCase();

  // Check for missing fields
  if (
    !name ||
    !email ||
    !password ||
    !gender ||
    !program ||
    !semester ||
    !college ||
    !address
  ) {
    return next(new ErrorHandler(400, "All fields are required."));
  }

  // Validate name length
  if (name.length < 3 || name.length > 30) {
    return next(
      new ErrorHandler(400, "Name must be between 3 and 30 characters."),
    );
  }

  // Simple email regex
  console.log(email);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate email
  if (!emailRegex.test(email)) {
    return next(new ErrorHandler(400, "Invalid email address."));
  }

  // Validate password length
  if (password.length < 8 || password.length > 16) {
    return next(
      new ErrorHandler(400, "Password must be between 8 and 16 characters."),
    );
  }

  // Validate program, college, address length
  if (program.length < 3 || program.length > 30)
    return next(
      new ErrorHandler(400, "Program must be between 3 and 30 characters."),
    );
  if (college.length < 3 || college.length > 30)
    return next(
      new ErrorHandler(400, "College must be between 3 and 30 characters."),
    );
  if (address.length < 3 || address.length > 30)
    return next(
      new ErrorHandler(400, "Address must be between 3 and 30 characters."),
    );

  semester = parseInt(semester);
  if (!(semester >= 1 && semester <= 8)) {
    return next(new ErrorHandler(400, "Semester must be between 1 and 8."));
  }
  // Validate gender
  const validGenders = ["male", "female", "other"];
  if (!validGenders.includes(gender.toLowerCase())) {
    return next(
      new ErrorHandler(400, "Gender must be male, female, or other."),
    );
  }

  let defaultPhotoLink;
  if (gender.toLowerCase() === "male")
    defaultPhotoLink = "/public/images/profile-anime-boy.jpeg";

  if (gender.toLowerCase() === "female")
    defaultPhotoLink = "/public/images/profile-anime-girl.jpeg";

  if (gender.toLowerCase() === "other")
    defaultPhotoLink = "/public/images/profile-anime-other.jpeg";

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler(400, "Email is already registered."));
  }

  const hashPassword = await encryptPassword(password);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashPassword,
    gender,
    program,
    college,
    address,
    semester,
    photo: defaultPhotoLink,
  });

  const tokenData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    semester: user.semester,
    photo: user.photo,
  };

  const token = await createToken(tokenData);

  return res
    .status(201)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 10000,
      ),
      httpOnly: true,
      secure: process.env.NOTE_ENV === "production",
      sameSite: "lax",
    })
    .json({
      success: true,
      message: "User registered successfully",
      user,
    });
});

// Code for logout user
export const logout = asyncHandler(async (req, res, next) => {
  return res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logout Successfull...",
    });
});

// Code for getting user profile
export const getProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId;
  console.log("Userid: ", userId);

  // Check if user already exists
  const user = await User.findById(userId);
  if (!user) {
    return next(
      new ErrorHandler(404, "No user Exists for the provided Email."),
    );
  }

  return res.status(200).json({
    success: true,
    message: "Profile details fetched Successfully",
    user,
  });
});

// Code for getting user profile posts
export const getProfilePosts = asyncHandler(async (req, res, next) => {
  const userId = req.user.userId;
  const limitPost = 15; // Give 15 post at a time...
  const { page = 1 } = req.query;
  let skipPost = (page - 1) * limitPost;

  const posts = await Post.find({ userId })
    .sort({ createdAt: -1 }) // Latest posts come first
    .skip(skipPost)
    .limit(limitPost);

  res.status(200).json({
    success: true,
    message: "Profile posts fetched successfully.",
    posts,
  });
});

// code for editing Profile Info - name, email, semester, program, gender, college, and social media liks.
export const editProfileInfo = asyncHandler(async (req, res, next) => {
  console.log("edit profile info route hit...");

  const userId = req.user.userId;

  const name = req.body.name?.trim();
  const email = req.body.email?.trim()?.toLowerCase();
  const gender = req.body.gender?.trim();
  const program = req.body.program?.trim();
  let semester = req.body.semester?.trim();
  const college = req.body.college?.trim();
  const address = req.body.address?.trim();
  const facebook = req.body.facebook?.trim();
  const instagram = req.body.instagram?.trim();
  const linkedln = req.body.linkedln?.trim();
  const github = req.body.github?.trim();
  const website = req.body.website?.trim();

  // Check for Required fields for missing
  if (
    !name ||
    !email ||
    !gender ||
    !program ||
    !semester ||
    !college ||
    !address
  ) {
    return next(new ErrorHandler(400, "First 6 fields are required."));
  }

  // Validate name length
  if (name.length < 3 || name.length > 30) {
    return next(
      new ErrorHandler(400, "Name must be between 3 and 30 characters."),
    );
  }

  // Simple email regex
  console.log(email);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate email
  if (!emailRegex.test(email)) {
    return next(new ErrorHandler(400, "Invalid email address."));
  }

  // Check for existing already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler(400, "Email is already registered."));
  }

  // Validate program, college, address length
  if (program.length < 3 || program.length > 30)
    return next(
      new ErrorHandler(400, "Program must be between 3 and 30 characters."),
    );

  if (college.length < 3 || college.length > 30)
    return next(
      new ErrorHandler(400, "College must be between 3 and 30 characters."),
    );

  if (address.length < 3 || address.length > 30)
    return next(
      new ErrorHandler(400, "Address must be between 3 and 30 characters."),
    );

  semester = parseInt(semester);
  if (!(semester >= 1 && semester <= 8)) {
    return next(new ErrorHandler(400, "Semester must be between 1 and 8."));
  }
  // Validate gender
  const validGenders = ["male", "female", "other"];
  if (!validGenders.includes(gender)) {
    return next(
      new ErrorHandler(400, "Gender must be male, female, or other."),
    );
  }

  let updateInfo = {
    name,
    email,
    gender,
    semester,
    program,
    college,
    address,
  };

  if (facebook) {
    if (facebook.includes("facebook.com")) {
      updateInfo.facebook = facebook;
    }
  }
  if (instagram) {
    if (instagram.includes("instagram.com")) {
      updateInfo.instagram = instagram;
    }
  }
  if (linkedln) {
    if (linkedln.includes("linkedln.com")) {
      updateInfo.linkedln = linkedln;
    }
  }
  if (github) {
    if (github.includes("github.com")) {
      updateInfo.github = github;
    }
  }
  if (website) {
    if (facebook.includes("facebook.com")) {
      updateInfo.website = website;
    }
  }

  console.log("Profile Update Info: ", updateInfo);

  // update User
  const updatedUser = await User.findByIdAndUpdate(userId, updateInfo);

  return res.status(200).json({
    success: true,
    message: "User profile updated successfully",
    user: updatedUser,
  });
});

// Update Password logic:
export const updatePassword = asyncHandler(async (req, res, next) => {
  console.log("edit profile info route hit...");

  const userId = req.user.userId;
  const password = req.body.password?.trim();

  // Check for Required fields for missing
  if (!password || password?.length < 8 || password?.length > 20) {
    return next(
      new ErrorHandler(400, "Password must be between 8-20 characters."),
    );
  }

  const user = await User.findById(userId).select("+password");
  if (!user) {
    return res.status(403).json({
      success: false,
      message: "User doesn't exist.",
    });
  }

  // check if user provided current password and password in database mathch or not.
  if (!(await comparePassword(password, user.password))) {
    return next(new ErrorHandler(400, "Wrong Password."));
  }

  // Hash the password
  const hashPassword = await encryptPassword(password);

  // update User password
  await User.findByIdAndUpdate(userId, { password: hashPassword });

  return res.status(200).json({
    success: true,
    message: "User password updated successfully",
  });
});






// Upload Profile pic logic
// we make a storage with diskStorage - which takes an object with 2 values - Destination and Filename.
// Destination is where the file will be stored, and filename is name of file that will be given to the file when stored on the specified location.
// cb stands for callback function. We call this function inside each object values as below - first parameter
// of cb mean error - so mostly its null. And second paramter is the value (name/ path) we pass to the calback function.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/user"); // This folder must exist otherwise file will not be uploaded.
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random())}${path.extname(file.originalname)}`,
    );
  },
});

// file filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only jpg, jpeg and png images are allowed"), false);
  }
};

// upload the photo
export const uploadProfilePhoto = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});

// update Profile pic logic:
export const editProfilePic = asyncHandler(async (req, res, next) => {
  console.log("edit profile pic route hit.....");
  let userId = req.user.userId;

  let photoPath = null;
  if (req.file) {
    photoPath = req.file.path;

    await User.findByIdAndUpdate(userId, { photo: photoPath });

    res.status(200).json({
      success: true,
      message: "Profile pic updated successfully.",
      post,
    });
  }
});

// update Cover pic logic:
export const editCoverPic = asyncHandler(async (req, res, next) => {
  console.log("edit cover pic route hit.....");
  let userId = req.user.userId;

  let coverPath = null;
  if (req.file) {
    coverPath = req.file.path;

    await User.findByIdAndUpdate(userId, { coverPhoto: coverPath });

    res.status(200).json({
      success: true,
      message: "Cover pic updated successfully.",
      post,
    });
  }
});
