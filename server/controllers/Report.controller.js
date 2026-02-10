import { asyncHandler } from "../utilities/AsyncHandler.utility.js";
import { Message } from "../models/message.model.js";
import { ErrorHandler } from "../utilities/ErrorHandler.utility.js";
import { Report } from "../models/report.model.js";
import { Post } from "../models/post.model.js";
import { Comment } from "../models/comment.model.js";
import { ObjectIdChecker } from "../utilities/ObjectIdChecker.utility.js";

// Code to Resolve Report...
export const ResolveReport = asyncHandler(async (req, res, next) => {
  // console.log("Report resolve route hit.....");
  const reportId = req.params.reportId;
  // const userRole = req.user.role;

  // Validate the report Id.... If not valid then return....
  if (!ObjectIdChecker(reportId, res)) return;
  // console.log("report-id", reportId);

  // Check User provided Id...

  // Uncomment it later on production.... ONly admin can resolve the reports.
  //   if (userRole !== "admin")
  //     return res.status(403).json({
  //       success: false,
  //       message: "You are not allowed to resolve the Reports.",
  //     });

  const report = await Report.findById(reportId);
  // console.log(report);

  if (!report) {
    return next(new ErrorHandler(400, "Report doesn't exist."));
  }

  // Delete the post, Message, or  if report
  if (report.reportType === "Post") {
    if (await Post.findByIdAndDelete(report.reportReferenceId)) {
      await Report.findByIdAndUpdate(reportId, { reportStatus: "resolved" });
      return res.status(200).json({
        success: true,
        message: "Post deleted successfully.",
      });
    } else {
      return next(new ErrorHandler(400, "Reported Post doesn't exist."));
    }
  }

  if (report.reportType === "Comment") {
    if (await Comment.findByIdAndDelete(report.reportReferenceId)) {
      await Report.findByIdAndUpdate(reportId, { reportStatus: "resolved" });
      return res.status(200).json({
        success: true,
        message: "Comment deleted successfully.",
      });
    } else {
      return next(new ErrorHandler(400, "Reported comment doesn't exist."));
    }
  }

  if (report.reportType === "Message") {
    if (await Message.findByIdAndDelete(report.reportReferenceId)) {
      await Report.findByIdAndUpdate(reportId, { reportStatus: "resolved" });
      return res.status(200).json({
        success: true,
        message: "Message deleted successfully.",
      });
    } else {
      return next(new ErrorHandler(400, "Reported message doesn't exist."));
    }
  }

  return next(new ErrorHandler(400, "Report Doesn't exist."));
});

// Code to Reject Report...
export const RejectReport = asyncHandler(async (req, res, next) => {
  // console.log("Report reject route hit.....");
  const reportId = req.params.reportId;
  // const userRole = req.user.role;

  if (!ObjectIdChecker(reportId, res)) return;

  // Uncomment it later on production.... ONly admin can resolve the reports.
  //   if (userRole !== "admin")
  //     return res.status(403).json({
  //       success: false,
  //       message: "You are not allowed to resolve the Reports.",
  //     });

  const report = await Report.findById(reportId);

  if (!report) {
    return next(new ErrorHandler(400, "Report doesn't exist."));
  }

  //   Reject the Report...
  await Report.findByIdAndUpdate(reportId, { reportStatus: "rejected" });
  return res.status(200).json({
    success: true,
    message: "Report rejected successfully.",
  });
});
