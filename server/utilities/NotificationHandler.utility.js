import { Notification } from "../models/notification.model.js";
import { ErrorHandler } from "./ErrorHandler.utility.js";

export const createCommentNotification = async ({
  postId,
  posterUserId,
  actorName,
  actorPhoto,
  action = "commented on your post",
}) => {
  console.log("Create Comment Notification Method hit....");

  const notificationMessage = `<b>${actorName}</b> ${action}.`;
  const link = `/post/view-post/${postId}`;

  try {
    await Notification.create({
      userId: posterUserId,
      notificationPhoto: actorPhoto,
      notificationMessage,
      link,
    });
  } catch (error) {
    next(new ErrorHandler(500, "Internal Server Error"));
  }

  // Web Socket Code here


};

export const createLikeNotification = async ({
  postId,
  posterUserId,
  actorName,
  actorPhoto,
}) => {
  try {
    console.log("Create Like Notification Method hit....");

    const notificationMessage = `<b>${actorName}</b> Liked your post.`;
    const link = `/post/view-post/${postId}`;

    await Notification.create({
      userId: posterUserId,
      notificationPhoto: actorPhoto,
      notificationMessage,
      link,
    });
  } catch (error) {
    next(new ErrorHandler(500, "Internal Server Error"));
  }
  
  // Web Socket Code here

  

};
