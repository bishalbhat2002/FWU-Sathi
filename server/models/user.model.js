import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters"],
    maxlength: [30, "Name cannot exceed 30 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is invalid"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [20, "Password must be at least 20 characters"],
    maxlength: [90, "Password cannot exceed 90 characters"],
    select: false,        // won't return password by default
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    default: "student",
    enum: {
      values: ["student", "admin"],
      message: "role must be either student or admin",
    },
  },
  semester: {
    type: Number,
    required: [true, "Semester is required"],
    enum: {
      values: [1, 2, 3, 4, 5, 6, 7, 8],
      message: "Semester must be between 1 and 8",
    },
  },
  program: {
    type: String,
    required: [true, "Program is required"],
    minlength: [3, "Program must be at least 3 characters"],
    maxlength: [30, "Program cannot exceed 30 characters"],
    trim: true,
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: {
      values: ["male", "female", "other"],
      message: "Gender must be between male, female or other",
    },
  },
  college: {
    type: String,
    required: [true, "College is required"],
    minlength: [3, "College must be at least 3 characters"],
    maxlength: [30, "College cannot exceed 30 characters"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    minlength: [3, "Address must be at least 3 characters"],
    maxlength: [30, "Address cannot exceed 30 characters"],
    trim: true,
  },
  photo: {
    type: String,
  },
  coverPhoto: {
    type: String,
  },
  facebook: {
    type: String,
    trim: true,
  },
  instagram: {
    type: String,
    trim: true,
  },
  linkedln: {
    type: String,
    trim: true,
  },
  github: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  reportsMade: {
    type: Number,
    default: 0,
  },
});

export const User = mongoose.model("User", UserSchema);
