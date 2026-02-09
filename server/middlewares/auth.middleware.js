import { asyncHandler } from "../utilities/AsyncHandler.utility.js";
import { ErrorHandler } from "../utilities/ErrorHandler.utility.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

// verify Token
const verifyToken = async (token) => {
  return await jwt.verify(token, process.env.JWT_KEY);
};

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  // console.log("Token display from IsAuthenticated middleware: ", token);

  if (!token) {
    next(new ErrorHandler(401, "Invalid Token"));
  }

  const tokenData = await verifyToken(token);
  // console.log(tokenData)

  // console.log("User token data from Auth middleware: ", tokenData);

  req.user = {
    userId: tokenData._id,
    name: tokenData.name,
    email: tokenData.email,
    semester: tokenData.semester,
    photo: tokenData.photo,
    role: tokenData.role,
  };

  return next();
});
