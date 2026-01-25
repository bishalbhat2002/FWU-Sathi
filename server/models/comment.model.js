import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    minlength: [3, "Comment must be atleat 3 characters"],
    maxlength: [500, "Comment cannot exceed 500 characters"],
    required: [true, "Comment is Required"],
    trim:true
  },
}, {timestamps:true});

export const Comment = mongoose.model("Comment", CommentSchema);
