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
import { deletePhoto } from "../utilities/Delete.photo.utility.js";

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
    fileSize: 10 * 1024 * 1024, // 2MB              -> Make it 2 in production..
  },
});

export const createPost = asyncHandler(async (req, res, next) => {
  let caption = req.body.caption;
  let { userId, semester, name, photo } = req.user;
  caption = caption.trim();

  // console.log(caption);

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

  const postWithPosterDetails = {
    ...post.toObject(),
    likerIds: [],
    userId: {
      name,
      photo,
      _id: userId,
    },
  };

  // console.log("created successfully");
  res.status(201).json({
    success: true,
    message: "Post created successfully.",
    post: postWithPosterDetails,
  });
});

export const editPost = asyncHandler(async (req, res, next) => {
  console.log("Post edit route hit...");
  let caption = req.body.caption;
  let postId = req.params.postId; // use req.params for getting parameters from the URL /:id <- this is a parameter.
  const { userId, semester, name, photo, role } = req.user;
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

  // find all likes for the post...
  const likers = await Like.find({ postId }).select("liker -_id");

  // make array of likers...
  const likerIds = likers.map((like) => like.liker);

  const updatedPostWithPosterDetails = {
    ...updatedPost.toObject(),
    likerIds,
    userId: {
      name,
      photo,
      _id: userId,
    },
  };

  res.status(200).json({
    success: true,
    message: "Post updated successfully.",
    post: updatedPostWithPosterDetails,
  });
});

// Code for getting all the posts - using pagination and limiting
export const getPosts = asyncHandler(async (req, res, next) => {
  console.log("get posts route hit....");
  const limitPost = 40;              // Give 40 post at a time...
  const { page = 1 } = req.query; // use req.query for getting query parameters from the URL ?page=2 <- this is a query parameter.

  let skipPost = (page - 1) * limitPost;

  const posts = await Post.find()
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
    message: "Post fetched successfully.",
    posts: postsWithLikers, // Send userId of post likers also...
  });
});

// Code for getting all the comments from a post - using pagination and limiting
export const getComments = asyncHandler(async (req, res, next) => {
  console.log("get comments route hit....");
  const limitComment = 40; // Give 40 comments at a time...
  const postId = req.params.postId;
  const { page = 1 } = req.query; // use req.query for getting query parameters from the URL ?page=2 <- this is a query parameter.

  let skipComment = (page - 1) * limitComment;
  // console.log("post Id: ", postId);

  const comments = await Comment.find({ postId })
    .populate("userId", "name photo")
    .sort({ createdAt: -1 }) // Latest posts come first
    .skip(skipComment)
    .limit(limitComment);

  res.status(200).json({
    success: true,
    message: "comments fetched successfully.",
    comments,
  });
});

// code for getting only one post
export const getPost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;

  const post = await Post.findById(postId).populate("userId", "name photo");

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post doesn't exist.",
      post,
    });
  }

  // find all likes for the post...
  const likerIds = await Like.find({ postId });

  res.status(200).json({
    success: true,
    message: "Post fetched successfully.",
    post: {
      post,
      likerIds,
    },
  });
});

// For Post Deletion.
export const deletePost = asyncHandler(async (req, res, next) => {
  console.log('delete post route hit....')
  const postId = req.params.postId; // use req.params here.
  const userId = req.user.userId;
  const role = req.user.role;

  // Check if post exists or not.
  const post = await Post.findById(postId);

  if (!post) {
    return next(new ErrorHandler(404, "Post not found."));
  }

  // Check ownership (VERY IMPORTANT) - if the User trying to update the post is not its owner, then dont allow them to change the post.
  if (post.userId.toString() !== userId.toString() && role !== "admin") {
    return next(
      new ErrorHandler(403, "You are not allowed to delete this post."),
    );
  }

  const deletedPost = await Post.findByIdAndDelete(postId);

  // delete all the likes and comments associated with the post.
  await Like.deleteMany({ postId });
  await Comment.deleteMany({ postId });

  if(deletedPost.photo){
    deletePhoto(deletedPost.photo);         // delete the photo from storage if there is any photo in the post.
  }

  res.status(200).json({
    success: true,
    message: "Post deleted successfully.",
    post: deletedPost,
  });
});

// Code to make Post report
export const reportPost = asyncHandler(async (req, res, next) => {
  // console.log("Report Post route hit....");
  let { reportMessage } = req.body;
  const postId = req.params.postId;
  const reporterId = req.user.userId; // from auth middleware
  const reportType = "Post";
  // console.log(reportMessage, postId, reporterId);

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
export const ToogleLikePost = asyncHandler(async (req, res, next) => {
  console.log("Post Like route hit....");
  const postId = req.params.postId;
  const liker = req.user.userId;          // from auth middleware


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
      userId: liker,
      posterUserId: post.userId,
    };

    if(post.userId.toString() !== liker.toString()){
    // console.log(notificationDetails);
    await createLikeNotification(notificationDetails);
    // console.log("Like notification created successfully.");
    }
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

  // console.log(commentMessage);
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
  const post = await Post.findByIdAndUpdate(postId, {
    $inc: { commentCount: 1 },
  });

  // Set the like notification...
  const notificationDetails = {
    postId,
    posterUserId: post.userId,
    actorUserId: userId,
    action: "commented on you post.",
  };

  if(post.userId.toString() !== userId.toString()){
    // console.log(notificationDetails);
    await createCommentNotification(notificationDetails);
    // console.log("Comment notification created successfully.");
  }

  const populatedComment = await Comment.findById(newComment._id).populate(
    "userId",
    "name photo",
  );

  return res.status(201).json({
    success: true,
    message: "Comment added to post successfully.",
    comment: populatedComment,
  });
});

// Code to edit post comment
export const editComment = asyncHandler(async (req, res, next) => {
  console.log("edit comment route hit....");
  const commentId = req.params.id;
  const commentMessage = req.body.commentMessage;
  const userId = req.user.userId; // from auth middleware
  const role = req.user.role;

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
  }  

    if(commentExist.userId.toString() !== userId.toString()){
      return res.status(403).json({
        success: false,
        message:
          "Failed: You are not allowed to edit the comment.",
      });
    }

    const updatedComment = await Comment.findByIdAndUpdate(commentId, { comment: commentMessage });

    const newComment = await Comment.findById(updatedComment._id)
            .populate("userId", "name photo");

    return res.status(201).json({
      success: true,
      message: "Comment updated successfully.",
      comment: newComment
    });

});

// Code to delete post comment
export const deleteComment = asyncHandler(async (req, res, next) => {
  console.log("Delete comment route hit....fewkjbj");
  const commentId = req.params.id;
  const postId = req.params.postId;
  const userId = req.user.userId;     // from auth middleware
  const role = req.user.role;

  console.log(`commentId:  ${commentId}`)
  console.log(`postId: ${postId}`)


  // check if the comment belongs to the user or not.
  const commentExist = await Comment.findOne({ _id: commentId, userId });

  if (!commentExist) {
    return res.status(403).json({
      success: false,
      message: "Comment can't be deleted.",
    });
  } 


  if(commentExist.userId.toString() !== userId.toString() && role !== "admin"){
    return res.status(403).json({
      success: false,
      message:
        "Failed: You are not allowed to delete the comment.",
    });
  }

    const deletedComment = await Comment.findByIdAndDelete(commentId);
    const post = await Post.findByIdAndUpdate(postId, {
      $inc: { commentCount: -1 },
    });

    console.log(deletedComment);

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully.",
      comment: deletedComment,
      post: post,
    });
  
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
