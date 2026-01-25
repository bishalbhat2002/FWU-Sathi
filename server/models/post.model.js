import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User Id is required"],
    },
    caption: {
      type: String,
      required: [true, "Caption is required"],
      minlength: [10, "Post Caption must be atleast 10 characters"],
      maxlength: [500, "Post Caption cannot exceed 300 characters"],
    },
    photo: {
      type: String,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    semester: {
      type: Number,
      required: [true, "Semester is required"],
      enum: {
        values: [1, 2, 3, 4, 5, 6, 7, 8],
        message: "Semester must be between 1 and 8",
      },
    },
  },
  { timestamps: true },
);

export const Post = mongoose.model("Post", postSchema);

