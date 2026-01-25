import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    reportReferenceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Reference ID of reported item is required"],
      refPath: "reportType",            // dynamic reference based on reportType
    },
    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Reporter ID is required"],
    },
    reportedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Reported user ID is required"],
    },
    reportMessage: {
      type: String,
      required: [true, "Report message is required"],
      minlength: [10, "Report message must be at least 10 characters"],
      maxlength: [500, "Report message cannot exceed 500 characters"],
    },
    reportType: {
      type: String,
      required: [true, "Report type is required"],
      enum: {
        values: ["Post", "Message", "Comment"],
        message: "Invalid report type.",
      },
    },
    reportStatus: {
      type: String,
      default: "Pending",
      enum: {
        values: ["Pending", "Resolved"],
        message: "Invalid report status.",
      },
    },
  },
  { timestamps: true }
);

export const Report = mongoose.model("Report", reportSchema);
