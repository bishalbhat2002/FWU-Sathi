import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    // Notification for the user
    posterUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    notificationMessage: {
      type: String,
      required: [true, "Notification Message is required"],
      minlength: [10, "Notification Message must be atleast 10 characters"],
      maxlength: [100, "Notification Message cannot exceed 40 characters"],
    },

    link: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true },
);

export const Notification = mongoose.model("Notification", NotificationSchema);
