import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema({
     postId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Post",
          required:true,
     },
     liker:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User",
          required:true,
     }
})

export const Like = mongoose.model("Like", LikeSchema);
