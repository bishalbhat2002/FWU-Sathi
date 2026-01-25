
export const GlobalErrorHandler = (error, req, res, next)=>{
     const message = error.message || "Internal Server Error";
     const statusCode = error.statusCode || 500;
     console.log(statusCode)

     // log error for debugging
     console.log("Error Occured:", message)

     res.status(statusCode).json({
          success:false,
          message
     })
}
