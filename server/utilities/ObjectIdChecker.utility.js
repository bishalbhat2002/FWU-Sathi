import mongoose from "mongoose"

export const ObjectIdChecker = (id, res)=>{
     if(!mongoose.Types.ObjectId.isValid(id)){
          res.status(400).
          json({
               success:false,
               message: "Provided Id is invalid."
          })
          return false; 
     }
     
     return true;
}