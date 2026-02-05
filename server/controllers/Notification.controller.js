import { Notification } from "../models/notification.model.js";
import { asyncHandler } from "../utilities/AsyncHandler.utility.js";

export const getNotification = asyncHandler(async (req, res, next) => {
  console.log("Get notification route hit.....");
  const userId = req.user.userId;
  const { page = 1 } = req.query;
  const notificationLimit = 15;

  const notificationSkip = (page - 1) * notificationLimit;
  const notifications = await Notification.find({ posterUserId: userId })
    .populate("userId", "name photo")
    .sort({ createdAt: -1 })
    .skip(notificationSkip)
    .limit(notificationLimit);

  res.status(200).json({
    success: true,
    message: "Notifications fetched successfully.",
    notifications,
  });
});
