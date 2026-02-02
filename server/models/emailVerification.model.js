import mongoose from "mongoose";

const emailVerificationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email is invalid"],
    },
    code: {
      type: String,
      required: [true, "Verification code is required"],
      length: 6,
      match: [/^\d{6}$/, "Code must be exactly 6 digits"],
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 10 * 60 * 1000), // expires in 10 minutes
    },
    used: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // It includes createdAt & updatedAt
  },
);

export const EmailVerification = mongoose.model(
  "EmailVerification",
  emailVerificationSchema,
);
