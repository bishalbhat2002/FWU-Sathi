import { Notification } from "../models/notification.model.js";
import { getSocketIdByUserId, io } from "../socket/socket.js";
import { ErrorHandler } from "./ErrorHandler.utility.js";

// code to create comment notification
export const createCommentNotification = async ({
  postId,
  actorUserId,
  posterUserId,
  action = "commented on your post",
}) => {
  console.log("Create Comment Notification Method hit....");

  let newNotification;

  try {
     newNotification = await Notification.create({
      userId: actorUserId,
      notificationMessage: action,
      posterUserId,
      link:postId,
    });
  } catch (error) {
    console.log("Error in creating comment notification:", error);
    throw new ErrorHandler(500, "Internal Server Error");
  }

  // getNew Notification with userDetails.
  const notificationWithUserDetails = await Notification.findById(newNotification._id).populate("userId", "name photo");

  // Web Socket Code here
  const socketId = getSocketIdByUserId(posterUserId);
  if (socketId) {
    io.to(socketId).emit("newNotification", {
      notification:notificationWithUserDetails
    });
  }

};



// code to create like notification
export const createLikeNotification = async ({
  postId,
  userId,
  posterUserId
}) => {

  let newNotification;

  try {
    console.log("Create Like Notification Method hit....");

    const notificationMessage =  "Liked your post";

    newNotification = await Notification.create({
      userId,
      posterUserId,
      notificationMessage,
      link: postId,
    });
  } catch (error) {
    console.log("Error in creating like notification:", error);
    throw new ErrorHandler(500, "Internal Server Error");
  }
  
  const notificationWithUserDetails = await Notification.findById(newNotification._id).populate("userId", "name photo");

  // Web Socket Code here
  const socketId = getSocketIdByUserId(posterUserId);
  if (socketId) {
    io.to(socketId).emit("newNotification", {
      notification:notificationWithUserDetails
    });
  }

};
