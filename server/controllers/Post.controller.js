import express from "express";
import multer from "multer";
import path from "path";
import { asyncHandler } from "../utilities/AsyncHandler.utility.js";
import { Post } from "../models/post.model.js";
import { ErrorHandler } from "../utilities/ErrorHandler.utility.js";
import { Report } from "../models/report.model.js";
import { User } from "../models/user.model.js";
import { Like } from "../models/like.model.js";
import { Comment } from "../models/comment.model.js";
import {
  createCommentNotification,
  createLikeNotification,
} from "../utilities/NotificationHandler.utility.js";

// we make a storage with diskStorage - which takes an object with 2 values - Destination and Filename.
// Destination is where the file will be stored, and filename is name of file that will be given to the file when stored on the specified location.
// cb stands for callback function. We call this function inside each object values as below - first parameter
// of cb mean error - so mostly its null. And second paramter is the value (name/ path) we pass to the calback function.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/posts"); // This folder must exist otherwise file will not be uploaded.
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
export const uploadPostPhoto = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});

export const createPost = asyncHandler(async (req, res, next) => {
  let caption = req.body.caption;
  let { userId, semester } = req.user;
  caption = caption.trim();

  console.log(caption, userId, semester);

  // Check for required fields
  if (!userId || !caption || !semester) {
    return next(
      new ErrorHandler(400, "post caption and user semester are required."),
    );
  }

  // Validate name length
  if (caption.length < 10 || caption.length > 500) {
    return next(
      new ErrorHandler(400, "post must be between 10 to 500 characters."),
    );
  }

  let photoPath = null;
  if (req.file) {
    photoPath = req.file.path;
  }

  const post = await Post.create({
    userId,
    caption,
    semester,
    photo: photoPath,
  });

  res.status(201).json({
    success: true,
    message: "Post created successfully.",
    post,
  });
});

export const editPost = asyncHandler(async (req, res, next) => {
  console.log("Post edit route hit...");
  let caption = req.body.caption;
  let postId = req.params.postId; // use req.params for getting parameters from the URL /:id <- this is a parameter.
  const userId = req.user.userId;
  caption = caption.trim();

  // console.log(caption, postId, userId);

  // Check for required fields
  if (!userId || !caption || !postId) {
    return next(new ErrorHandler(400, "Caption is required."));
  }

  // Validate name length
  if (caption.length < 10 || caption.length > 500) {
    return next(
      new ErrorHandler(400, "Caption must be between 10 to 500 characters."),
    );
  }

  // Check if post exists or not.
  const post = await Post.findById(postId);

  if (!post) {
    return next(new ErrorHandler(404, "Post not found."));
  }

  // Check ownership (VERY IMPORTANT) - if the User trying to update the post is not its owner, then dont allow them to change the post.
  if (post.userId.toString() !== userId.toString()) {
    return next(
      new ErrorHandler(403, "You are not allowed to edit this post."),
    );
  }

  //   Update the post only when the ownership is verified.
  const updatedPost = await Post.findByIdAndUpdate(
    postId, // Post id to be updated.
    { caption },
    {
      new: true, // Returns updated Document
      runValidators: true,
    },
  );

  res.status(200).json({
    success: true,
    message: "Post updated successfully.",
    post: updatedPost,
  });
});

// Code for getting all the posts - using pagination and limiting
export const getPosts = asyncHandler(async (req, res, next) => {
  const limitPost = 15; // Give 15 post at a time...
  const { page = 1 } = req.query; // use req.query for getting query parameters from the URL ?page=2 <- this is a query parameter.

  let skipPost = (page - 1) * limitPost;

  const posts = await Post.find()
    .sort({ createdAt: -1 }) // Latest posts come first
    .skip(skipPost)
    .limit(limitPost);

  res.status(200).json({
    success: true,
    message: "Post fetched successfully.",
    posts,
  });
});

// code for getting only one post
export const getPost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post doesn't exist.",
      post,
    });
  }

  res.status(200).json({
    success: true,
    message: "Post fetched successfully.",
    post,
  });
});

// For Post Deletion.
export const deletePost = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId; // use req.params here.
  const userId = req.user.userId;

  // Check if post exists or not.
  const post = await Post.findById(postId);

  if (!post) {
    return next(new ErrorHandler(404, "Post not found."));
  }

  // Check ownership (VERY IMPORTANT) - if the User trying to update the post is not its owner, then dont allow them to change the post.
  if (post.userId.toString() !== userId.toString()) {
    return next(
      new ErrorHandler(403, "You are not allowed to delete this post."),
    );
  }

  await Post.findByIdAndDelete(postId);

  res.status(200).json({
    success: true,
    message: "Post deleted successfully.",
  });
});

// Code to make Post report
export const reportPost = asyncHandler(async (req, res, next) => {
  // console.log("Report Post route hit....");
  let { reportMessage } = req.body;
  const postId = req.params.postId;
  const reporterId = req.user.userId; // from auth middleware
  const reportType = "Post";
  console.log(reportMessage, postId, reporterId);

  // validate report message
  reportMessage = reportMessage?.trim();

  if (
    !reportMessage ||
    reportMessage.length < 10 ||
    reportMessage.length > 500
  ) {
    return next(
      new ErrorHandler(400, "Report message must be 10-500 characters."),
    );
  }

  // get the post
  const reportedPost = await Post.findById(postId);
  if (!reportedPost) {
    return next(new ErrorHandler(404, "Reported post doesn't exist."));
  }

  const reportedUser = reportedPost.userId;

  // cannot report your own post
  if (reportedUser.toString() === reporterId.toString()) {
    return next(new ErrorHandler(403, "You cannot report your own post."));
  }

  // prevent multiple reports by same user
  const existingReport = await Report.findOne({
    reportReferenceId: postId,
    reporterId,
  });

  if (existingReport) {
    return next(new ErrorHandler(400, "You already reported this post."));
  }

  // create report
  await Report.create({
    reportReferenceId: postId,
    reportType,
    reporterId,
    reportedId: reportedUser,
    reportMessage,
  });

  // increment reporter's reportsMade count
  await User.findByIdAndUpdate(reporterId, { $inc: { reportsMade: 1 } });

  res.status(201).json({
    success: true,
    message: "Post reported successfully.",
  });
});

// Code to add like to the post
export const likePost = asyncHandler(async (req, res, next) => {
  console.log("Post Like route hit....");
  const postId = req.params.postId;
  const liker = req.user.userId; // from auth middleware

  console.log(postId);

  // check if already liked or not.
  const liked = await Like.findOne({ postId, liker });
  if (!liked) {
    // like logic
    await Like.create({ postId, liker });

    const post = await Post.findByIdAndUpdate(postId, {
      $inc: { likeCount: 1 },
    });

    // Set the like notification...
    const notificationDetails = {
      postId,
      posterUserId: post.userId,
      actorName: req.user.name,
      actorPhoto: req.user.photo,
    };

    console.log(notificationDetails);
    await createLikeNotification(notificationDetails);
    console.log("Like notification created successfully.");

    // Send response to the user.
    return res.status(201).json({
      success: true,
      message: "Post liked successfully.",
    });
  } else {
    // Unlike logic
    await Post.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } });
    await Like.deleteOne({ postId, liker });

    // Send response to the user.
    return res.status(200).json({
      success: true,
      message: "Like removed from the post successfully.",
    });
  }
});

// Code to validate comment length
const validateComment = (comment) => {
  // comment must be between 3-500 characters.
  if (comment.length < 3 || comment.length > 500) {
    return false;
  }
};

// Code to add comment to the post
export const createComment = asyncHandler(async (req, res, next) => {
  console.log("Post comment route hit....");
  const postId = req.params.postId;
  let commentMessage = req.body.commentMessage;
  const userId = req.user.userId; // from auth middleware
  commentMessage = commentMessage.trim();

  console.log(commentMessage);
  // Validate comment for its length
  if (validateComment(commentMessage)) {
    return res.status(401).json({
      success: false,
      message: "Comment must be between 3-500 characters.",
    });
  }

  const newComment = await Comment.create({
    postId,
    userId,
    comment: commentMessage,
  });

  // Increase the number of commentCount.
  const post = await Post.findByIdAndUpdate(postId, { $inc: { commentCount: 1 } });

    // Set the like notification...
    const notificationDetails = {
      postId,
      posterUserId: post.userId,
      actorName: req.user.name,
      actorPhoto: req.user.photo,
      action: "commented on you post."
    };

    console.log(notificationDetails);
    await createCommentNotification(notificationDetails);
    console.log("Comment notification created successfully.");


  return res.status(201).json({
    success: true,
    message: "Comment added to post successfully.",
    comment: newComment,
  });
});

// Code to edit post comment
export const editComment = asyncHandler(async (req, res, next) => {
  console.log("edit comment route hit....");
  const commentId = req.params.id;
  const commentMessage = req.body.commentMessage;
  const userId = req.user.userId; // from auth middleware

  // Validate comment for its length
  if (validateComment(commentMessage)) {
    return res.status(201).json({
      success: false,
      message: "Comment must be between 3-500 characters.",
    });
  }

  // check if the comment belongs to the user or not.
  const commentExist = await Comment.findOne({ _id: commentId, userId });
  if (!commentExist) {
    return res.status(403).json({
      success: false,
      message:
        "Comment update failed because the comment doesnt belong to you.",
    });
  } else {
    await Comment.findByIdAndUpdate(commentId, { comment: commentMessage });

    return res.status(201).json({
      success: true,
      message: "Comment updated successfully.",
    });
  }
});


// Code to delete post comment
export const deleteComment = asyncHandler(async (req, res, next) => {
  console.log("Delete comment route hit....");
  const commentId = req.params.id;
  const postId = req.body.postId;
  const userId = req.user.userId; // from auth middleware

  // check if the comment belongs to the user or not.
  const commentExist = await Comment.findOne({ _id: commentId, userId });

  if (!commentExist) {
    return res.status(403).json({
      success: false,
      message: "Comment can't be deleted because it doen't belong to you.",
    });
  } else {
    await Comment.findByIdAndDelete(commentId);
    const post = await Post.findByIdAndUpdate(postId, { $inc: { commentCount: -1 } });

    // Set the Comment notification...
    const notificationDetails = {
      postId,
      posterUserId: post.userId,
      actorName: req.user.name,
      actorPhoto: req.user.photo,
      action: "deleted their comment from your post."
    };

    console.log(notificationDetails);
    await createCommentNotification(notificationDetails);
    console.log("Comment notification created successfully.");

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully.",
    });
  }
});


// Code to make Comment report
export const reportComment = asyncHandler(async (req, res, next) => {
  // console.log("Report comment route hit....");
  let commentId = req.params.id;
  let { reportMessage } = req.body;
  const reporterId = req.user.userId; // from auth middleware
  const reportType = "Comment";

  // validate report message
  reportMessage = reportMessage?.trim();

  if (
    !reportMessage ||
    reportMessage.length < 10 ||
    reportMessage.length > 500
  ) {
    return next(
      new ErrorHandler(400, "Report message must be 10-500 characters."),
    );
  }

  // get the reported Comment
  const reportedComment = await Comment.findById(commentId);
  if (!reportedComment) {
    return next(new ErrorHandler(404, "Reported Comment doesn't exist."));
  }

  const reportedUser = reportedComment.userId;

  // cannot report your own post
  if (reportedUser.toString() === reporterId.toString()) {
    return next(new ErrorHandler(403, "You cannot report your own comment."));
  }

  // prevent multiple reports by same user
  const existingReport = await Report.findOne({
    reportReferenceId: commentId,
    reporterId,
  });

  if (existingReport) {
    return next(new ErrorHandler(400, "You already reported this comment."));
  }

  // create report
  await Report.create({
    reportReferenceId: commentId,
    reportType,
    reporterId,
    reportedId: reportedUser,
    reportMessage,
  });

  // increment reporter's reportsMade count
  await User.findByIdAndUpdate(reporterId, { $inc: { reportsMade: 1 } });

  res.status(201).json({
    success: true,
    message: "Comment reported successfully.",
  });
});
