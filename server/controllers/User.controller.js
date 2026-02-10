import { asyncHandler } from "../utilities/AsyncHandler.utility.js";
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { ErrorHandler } from "../utilities/ErrorHandler.utility.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import path from "path";
import multer from "multer";
import {
  generateEmailVerificationCode,
  verifyEmailCode,
} from "../utilities/EmailVerification.utility.js";
import { Like } from "../models/like.model.js";
import { deletePhoto } from "../utilities/Delete.photo.utility.js";
import fs from "fs";

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
  // console.log("Login Route hit...");

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
    role: user.role,
  };

  const token = await createToken(tokenData);

  return res
    .status(200)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      secure: process.env.NOTE_ENV === "production",
      sameSite: "lax",
    })
    .json({
      success: true,
      message: "User logged in successfully",
      user: tokenData,
    });
});

// Email Verification - Register User - Get-verification Code logic:
export const getVerificationCodeForRegister = asyncHandler(
  async (req, res, next) => {
    //   console.log("Email verification for register route hit....");

    const email = req.body.email?.trim();

    // Check for missing fields
    if (!email) {
      return next(new ErrorHandler(403, "Email is required."));
    }

    // Simple email regex to Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(new ErrorHandler(403, "Invalid email address."));
    }

    if (await User.findOne({ email })) {
      return next(new ErrorHandler(403, "User with email already exists."));
    }

    if (await generateEmailVerificationCode(email)) {
      return res.status(200).json({
        success: true,
        message: `6 digit verification code has been successfully sent to ${email}.`,
      });
    }

    return res.status(403).json({
      success: false,
      message: `verification code couldn't be sent to ${email}.`,
    });
  },
);

// Code for Registering User
export const register = asyncHandler(async (req, res, next) => {
  // console.log("Register req hit...");
  let {
    name,
    email,
    password,
    gender,
    program,
    semester,
    college,
    address,
    code,
  } = req.body;

  // Trim all string inputs
  name = name?.trim();
  email = email?.trim();
  password = password?.trim();
  program = program?.trim();
  college = college?.trim();
  address = address?.trim();
  code = code?.trim();
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
    !address ||
    !code
  ) {
    return next(new ErrorHandler(400, "All fields are required."));
  }

  if (code.length !== 6) {
    return next(new ErrorHandler(400, "Invalid Verification code."));
  }

  // Check if user with email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler(400, "Email is already registered."));
  }

  // Verify the Email & OTP code..
  if (!(await verifyEmailCode(email, code))) {
    return res.status(403).json({
      success: false,
      message: "Invalid verification code.",
    });
  }

  // Validate name length
  if (name.length < 3 || name.length > 30) {
    return next(
      new ErrorHandler(400, "Name must be between 3 and 30 characters."),
    );
  }

  // Simple email regex
  // console.log(email);
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
    defaultPhotoLink = "uploads/user/profile/profile-boy.jpeg";

  if (gender.toLowerCase() === "female")
    defaultPhotoLink = "uploads/user/profile/profile-girl.jpg";

  if (gender.toLowerCase() === "other")
    defaultPhotoLink = "uploads/user/profile/profile-other.png";

  const defaultCoverLink = "uploads/user/cover/defaultCoverLink.jpg";

  const hashPassword = await encryptPassword(password);

  let role = "student";

  // Change role for email you want to make admin...... Here, i want to make these two emails as admin..
  if (email === process.env.EMAIL_FIRST || email === process.env.EMAIL_SECOND) {
    role = "admin";
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashPassword,
    role,
    gender,
    program,
    college,
    address,
    semester,
    photo: defaultPhotoLink,
    coverPhoto: defaultCoverLink,
  });

  const tokenData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    semester: user.semester,
    photo: user.photo,
    role: user.role,
  };

  const token = await createToken(tokenData);

  return res
    .status(201)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
      secure: process.env.NOTE_ENV === "production",
      sameSite: "lax",
    })
    .json({
      success: true,
      message: "User registered successfully",
      user: tokenData,
    });
});

// Code for logout user
export const logout = asyncHandler(async (req, res, next) => {
  // console.log("Logout route hit....");
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

// Code for getting own profile
export const getProfile = asyncHandler(async (req, res, next) => {
  // console.log("get profile route hit...");
  const userId = req.user.userId;
  // console.log("Userid: ", userId);

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

// Code for getting Other user profile
export const getOtherProfile = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  // console.log("Userid: ", userId);

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


// Dead Code becasue its work is done by GetOtherProfilePosts. for getting own profile posts
// export const getProfilePosts = asyncHandler(async (req, res, next) => {
//   const userId = req.user.userId;
//   const limitPost = 15; // Give 15 post at a time...
//   const { page = 1 } = req.query;
//   let skipPost = (page - 1) * limitPost;

//   const posts = await Post.find({ userId })
//     .sort({ createdAt: -1 }) // Latest posts come first
//     .skip(skipPost)
//     .limit(limitPost);

//   res.status(200).json({
//     success: true,
//     message: "Profile posts fetched successfully.",
//     posts,
//   });
// });


// Code for getting other profiles posts
export const getProfilePosts = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const limitPost = 15; // Give 15 post at a time...
  const { page = 1 } = req.query;

  let skipPost = (page - 1) * limitPost;

  const posts = await Post.find({ userId })
    .populate("userId", "name photo")
    .sort({ createdAt: -1 }) // Latest posts come first
    .skip(skipPost)
    .limit(limitPost);

  const postsWithLikers = await Promise.all(
    posts.map(async (post) => {
      const likes = await Like.find({ postId: post._id }).select("liker");
      const likerIds = likes.map((like) => like.liker);
      return { ...post.toObject(), likerIds };
    }),
  );

  res.status(200).json({
    success: true,
    message: "Profile posts fetched successfully.",
    posts: postsWithLikers,
  });
});

// code for editing Profile Info - name, email, semester, program, gender, college, and social media liks.
export const editProfileInfo = asyncHandler(async (req, res, next) => {
  // console.log("edit profile info route hit...");

  const userId = req.user.userId;

  const name = req.body.name?.trim();
  // const email = req.body.email?.trim()?.toLowerCase();
  const gender = req.body.gender?.trim();
  const program = req.body.program?.trim();
  let semester = req.body.semester;
  const college = req.body.college?.trim();
  const address = req.body.address?.trim();
  const facebook = req.body.facebook?.trim();
  const instagram = req.body.instagram?.trim();
  const linkedln = req.body.linkedln?.trim();
  const github = req.body.github?.trim();
  const youtube = req.body.youtube?.trim();
  const website = req.body.website?.trim();

  // Check for Required fields for missing
  if (!name || !gender || !program || !semester || !college || !address) {
    return next(new ErrorHandler(400, "First 6 fields are required."));
  }

  // Validate name length
  if (name.length < 3 || name.length > 30) {
    return next(
      new ErrorHandler(400, "Name must be between 3 and 30 characters."),
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
  if (!validGenders.includes(gender)) {
    return next(
      new ErrorHandler(400, "Gender must be male, female, or other."),
    );
  }

  let updateInfo = {
    name,
    gender,
    semester,
    program,
    college,
    address,
  };

  if (facebook) {
    if (facebook.includes("facebook.com/")) {
      updateInfo.facebook = facebook;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid Facebook URL",
      });
    }
  } else {
    updateInfo.facebook = "";
  }
  if (instagram) {
    if (instagram.includes("instagram.com/")) {
      updateInfo.instagram = instagram;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid Instagram URL",
      });
    }
  } else {
    updateInfo.instagram = "";
  }
  if (linkedln) {
    if (linkedln.includes("linkedln.com/")) {
      updateInfo.linkedln = linkedln;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid linkedln URL",
      });
    }
  } else {
    updateInfo.linkedln = "";
  }
  if (github) {
    if (github.includes("github.com/")) {
      updateInfo.github = github;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid Github URL",
      });
    }
  } else {
    updateInfo.github = "";
  }
  if (youtube) {
    if (youtube.includes("youtube.com/")) {
      updateInfo.youtube = youtube;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid Youtube URL",
      });
    }
  } else {
    updateInfo.youtube = "";
  }
  if (website) {
    // Regular expresssion for Webstite URL..
    const websiteRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    if (websiteRegex.test(website)) {
      updateInfo.website = website;
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid website URL",
      });
    }
  } else {
    updateInfo.website = "";
  }

  // console.log("Profile Update Info: ", updateInfo);

  // update User
  const updatedUser = await User.findByIdAndUpdate(userId, updateInfo, {
    new: true,
  });
  // new:true -> this means return the object with new updated values.

  return res.status(200).json({
    success: true,
    message: "User profile updated successfully",
    user: updatedUser,
  });
});

// Update Password logic:
export const updatePassword = asyncHandler(async (req, res, next) => {
  // console.log("edit password info route hit...");

  const userId = req.user.userId;
  const newPassword = req.body.newPassword?.trim();
  const currentPassword = req.body.currentPassword?.trim();

  // check if current password is empty or not.
  if (!currentPassword) {
    return next(new ErrorHandler(400, "Current password cannot be empty."));
  }

  // Check for Required fields for missing
  if (!newPassword || newPassword?.length < 8 || newPassword?.length > 20) {
    return next(
      new ErrorHandler(400, "New Password must be between 8-20 characters."),
    );
  }

  const user = await User.findById(userId).select("+password");
  if (!user) {
    return res.status(403).json({
      success: false,
      message: "User doesn't exist.",
    });
  }

  // check if user provided currentPassword and password in database mathch or not.
  if (!(await comparePassword(currentPassword, user.password))) {
    return next(new ErrorHandler(400, "Current Password didn't match."));
  }

  // Hash the password
  const hashPassword = await encryptPassword(newPassword);

  // update User password
  await User.findByIdAndUpdate(userId, { password: hashPassword });

  return res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "User password updated successfully",
    });
});

// Forgot Password Get-verification Code logic:
export const getVerificationCode = asyncHandler(async (req, res, next) => {
  //   console.log("Forgot Password get verification code route hit....");

  const email = req.body.email?.trim();

  // console.log("email from backend: ", email)

  // Check for missing fields
  if (!email) {
    return next(new ErrorHandler(400, "Email is required."));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler(400, "User doesn't exist with such email."));
  }

  if (await generateEmailVerificationCode(email)) {
    return res.status(200).json({
      success: true,
      message: `6 digit verification code has been successfully sent to ${email}.`,
    });
  }

  return res.status(403).json({
    success: false,
    message: `verification code couldn't be sent to ${email}.`,
  });
});

// Forgot Password - Change password code logic:
export const ForgotChangePassword = asyncHandler(async (req, res, next) => {
  // console.log("Forgot change password route hit...");

  const email = req.body.email?.trim();
  const code = req.body.code?.trim();
  const password = req.body.password?.trim();

  // ensure all fields are there.
  if (!email || !code || !password) {
    return next(new ErrorHandler(403, "All fields are required."));
  }

  // Check for Required fields for missing
  if (password?.length < 8 || password?.length > 20) {
    return next(
      new ErrorHandler(403, "Password must be between 8-20 characters."),
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(403).json({
      success: false,
      message: "User doesn't exist for provided email.",
    });
  }

  if (!(await verifyEmailCode(email, code))) {
    console.log("invalid code....");
    return res.status(403).json({
      success: false,
      message: "Invalid verification code.",
    });
  }

  // Hash the password
  const hashPassword = await encryptPassword(password);

  // update User password in memory
  user.password = hashPassword;
  await user.save(); // save the changed data in database.

  return res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "User password changed successfully.",
    });
});

/**
 *  Upload Profile pic logic
 *  we make a storage with diskStorage - which takes an object with 2 values - Destination and Filename.
 * Destination is where the file will be stored, and filename is name of file that will be given to the file when stored on the specified location.
 * cb stands for callback function. We call this function inside each object values as below - first parameter
 * of cb mean error - so mostly its null. And second paramter is the value (name/ path) we pass to the calback function.
 *
 */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    let uploadPath = "uploads/user";        

    if (file.fieldname === "profile-photo") {        
      uploadPath += "/profile";
    } else if (file.fieldname === "cover-photo") {
      uploadPath += "/cover";
    }

    // create folder if not exists.
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath); 
  
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
    fileSize: 10 * 1024 * 1024, // 2MB
  },
});

// update Profile pic logic:
export const editProfilePic = asyncHandler(async (req, res, next) => {
  console.log("edit profile pic route hit.....");
  let userId = req.user.userId;

  if (!req.file) {
    return res.status(403).json({
      success: false,
      message: "No Profile photo uploaded.",
    });
  
  }

    // get existing user data
    const user = await User.findById(userId);

    if(!user){
      return res.status(403).json({
        success: false,
        message: "User doesn't exist.",
      });
    }

    // delete existing photo from storage if its not default photo.
    if(user.photo){
      deletePhoto(user.photo);
    }


    const photoPath = req.file.path;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { photo: photoPath },
      { new: true },
    );
    return res.status(200).json({
      success: true,
      message: "Profile pic updated successfully.",
      updatedPhoto: updatedUser.photo,
    });

});

// update Cover pic logic:
export const editCoverPic = asyncHandler(async (req, res, next) => {
  // console.log("edit cover pic route hit.....");
  let userId = req.user.userId;

  if (!req.file) {
      return res.status(403).json({
      success: false,
      message: "No cover photo uploaded.",
    });
  }

    // get existing user data
    const user = await User.findById(userId);

    if(!user){
      return res.status(403).json({
        success: false,
        message: "User doesn't exist.",
      });
    }

    if (req.file) {
      deletePhoto(user.coverPhoto);
    }

    const coverPath = req.file.path;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { coverPhoto: coverPath },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "Cover pic updated successfully.",
      updatedCover: updatedUser.coverPhoto,
    });

});

// get total users logic:
export const getTotalUsers = asyncHandler(async (req, res, next) => {
  console.log("get total users route hit.....");

  const totalUsers = await User.countDocuments();

  res.status(200).json({
    success: true,
    message: "Total users fetched successfully.",
    totalUsers,
  });
});
