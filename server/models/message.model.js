import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
     userId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User",
          required:true,
     },
     userPhoto:{
          type:String,
          required:[true, "User Photo is required"],
     },
     message:{
          type:String,
          required:[true, "Message is required"],
          minlength:[1, "Message must be atleast 1 character"],
          maxlength:[800, "Message cannot exceed 800 characters"],
          trim:true
     }
}, {timestamps:true})

export const Message = mongoose.model("Message", MessageSchema);
