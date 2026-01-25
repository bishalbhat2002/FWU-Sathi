import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
     // Notification for the user 
     userId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User",
          required:true,
     },
     notificationPhoto:{
          type: String,
          minlength: [10, "Notification Photo must be atleast 10 characters"],
          maxlength: [100, "Notification Photo cannot exceed 40 characters"]
     },
     notificationMessage:{
          type:String,
          required: [true, "Notification Message is required"],
          minlength: [10, "Notification Message must be atleast 10 characters"],
          maxlength: [100, "Notification Message cannot exceed 40 characters"]
     },

     link:{
          type:String,
          required:true,
          minlength: [10, "Notification Message must be atleast 10 characters"],
          maxlength: [100, "Notification Message cannot exceed 100 characters"]
     }

}, {timestamps:true})

export const Notification = mongoose.model("Notification", NotificationSchema);
