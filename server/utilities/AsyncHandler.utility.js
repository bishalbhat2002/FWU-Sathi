import {ErrorHandler} from "./ErrorHandler.utility.js";

export const asyncHandler = (func)=>{
     return async (req, res, next)=>{
          try {
               await func(req, res, next);
          } catch (error) {
               next(new ErrorHandler(error));
          }
     }
}