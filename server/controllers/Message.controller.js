import { asyncHandler } from "../utilities/AsyncHandler.utility.js";
import { Message } from "../models/message.model.js";
import { ErrorHandler } from "../utilities/ErrorHandler.utility.js";
import { Report } from "../models/report.model.js";
import {io} from "../socket/socket.js"

// Code to Send (create) message
export const sendMessage = asyncHandler(async (req, res, next) => {
  console.log('Send message route hit....')
  const { userId } = req.user;
  const msg = req.body.message.trim();

  if (msg.length === 0 || msg.length > 800) {
    return res.status(403).json({
      success: false,
      message: "Message length must be between 1 to 800 characters.",
    });
  }

  const message = await Message.create({ userId, message: msg });
  
  const messageWithUserDetails = await Message.findById(message._id).populate("userId", "name photo")
  
  // Web socket code here...
  // emit new message to all online users...
  io.emit("newMessage", messageWithUserDetails);

  return res.status(201).json({
    success: true,
    message: "Message sent successfully.",
    message: messageWithUserDetails
  });


});



// Code to edit message
export const editMessage = asyncHandler(async (req, res, next) => {
  console.log('edit message route hit....')
  const { messageId } = req.params;
  const msg = req.body.message;
  const userId = req.user.userId;
  const role = req.user.role;

  // console.log("msg: ", msg)

  if (!msg || msg.length < 1 || msg.length > 800) {
    return res.status(403).json({
      success: false,
      message: "Message length must be between 1 to 800 characters.",
    });
  }

  const message = await Message.findById(messageId);

  if(!message) {
    return res.status(404).json({
      success: false,
      message: "Message doesn't exist.",
    });
  }

  if(message.userId.toString() !== userId.toString()) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to edit this message.",
    });
  }

  const updatedMessage = await Message.findByIdAndUpdate(messageId, {message: msg}, {new:true});
  console.log(updatedMessage)

  
  // Get name, and photo of user also .... 
  // const messageWithUserDetails = await Message.findById(messageId).populate("userId", "name photo")

  return res.status(200).json({
    success: true,
    message: "Message updated successfully.",
    updatedMessage: updatedMessage
    // updatedMessage: messageWithUserDetails
  });


  // Web socket code here...


});



// Code to delete message
export const deleteMessage = asyncHandler(async (req, res, next) => {
  console.log('delete message route hit....')
  const { messageId } = req.params;
  const {userId, role} = req.user;

  if(!messageId) {
    return res.status(400).json({
      success: false,
      message: "Message ID is required.",
    });
  }  

  const message = await Message.findById(messageId);

  if(!message) {  
    return res.status(404).json({
      success: false,
      message: "Message doesn't exist.",
    });
  }

  if(message.userId.toString() !== userId.toString() && role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to delete this message.",
    });
  }

  const msg = await Message.findByIdAndDelete(messageId);

  return res.status(200).json({
    success: true,
    message: "Message deleted successfully.",
    deletedMessage: msg
  });

  // Web socket code here...


});



// Code to get Messages
export const getMessages = asyncHandler(async (req, res, next) => {
    console.log('get messages route hit....')
  const { page = 1 } = req.params;
  const messageLimit = 25;
  const messageSkip = (page - 1) * messageLimit;

  const messages = await Message.find()
    .populate("userId", "name photo")
    .sort({ createdAt: -1 })
    .skip(messageSkip)
    .limit(messageLimit);

  return res.status(200).json({
    success: true,
    message: "Messages fetched successfully.",
    messages,
  });
});

// Code to report messages
export const reportMessage = asyncHandler(async (req, res, next) => {
  console.log("Report message route hit....");
  let messageId = req.params.messageId;
  let reportMessage = req.body.reportMessage?.trim();
  const reporterId = req.user.userId; // from auth middleware
  const reportType = "Message";

  if (
    !reportMessage ||
    reportMessage.length < 10 ||
    reportMessage.length > 500
  ) {
    return next(
      new ErrorHandler(400, "Report message must be 10-500 characters."),
    );
  }

  // get the reported Message
  const reportedMessage = await Message.findById(messageId);

  if (!reportedMessage) {
    return next(new ErrorHandler(404, "Reported Message doesn't exist."));
  }

  const reportedUser = reportedMessage.userId;        // Fetch user Id of Reported Message Author

  // cannot report your own post
  if (reportedUser.toString() === reporterId.toString()) {
    return next(new ErrorHandler(403, "You cannot report your own comment."));
  }

  // prevent multiple reports by same user
  const existingReport = await Report.findOne({
    reportReferenceId: messageId,
    reporterId,
  });

  if (existingReport) {
    return next(new ErrorHandler(400, "You already reported this message."));
  }

  // create Message report
  await Report.create({
    reportReferenceId: messageId,
    reportType,
    reporterId,
    reportedId: reportedUser,
    reportMessage,
  });

  // increment reporter's reportsMade count
  await User.findByIdAndUpdate(reporterId, { $inc: { reportsMade: 1 } });

  res.status(201).json({
    success: true,
    message: "Message reported successfully.",
  });




});
