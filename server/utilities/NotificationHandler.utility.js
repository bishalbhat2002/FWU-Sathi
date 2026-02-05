import { Notification } from "../models/notification.model.js";
import { ErrorHandler } from "./ErrorHandler.utility.js";

export const createCommentNotification = async ({
  postId,
  actorUserId,
  posterUserId,
  action = "commented on your post",
}) => {
  console.log("Create Comment Notification Method hit....");



  try {
    await Notification.create({
      userId: actorUserId,
      notificationMessage: action,
      posterUserId,
      link:postId,
    });
  } catch (error) {
    next(new ErrorHandler(500, "Internal Server Error"));
  }

  // Web Socket Code here


};

export const createLikeNotification = async ({
  postId,
  userId,
  posterUserId
}) => {
  try {
    console.log("Create Like Notification Method hit....");

    const notificationMessage =  "Liked your post";

    await Notification.create({
      userId,
      posterUserId,
      notificationMessage,
      link: postId,
    });
  } catch (error) {
    next(new ErrorHandler(500, "Internal Server Error"));
  }
  
  // Web Socket Code here

  

};
