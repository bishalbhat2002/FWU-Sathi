import { User } from "../models/user.model.js";
import { asyncHandler } from "../utilities/AsyncHandler.utility.js";
import { ErrorHandler } from "../utilities/ErrorHandler.utility.js";


// code for getting all users without filters.
export const getAllUsers = asyncHandler(async (req, res, next) => {
  // console.log("get all users route hit...");
  const { page = 1 } = req.params;
  const limitUsers = 40;    
  const usersSkip = (page - 1) * limitUsers;

  const users = await User.find()
    .select("name semester program college address photo")
    .sort({ name: 1 })
    .skip(usersSkip)
    .limit(limitUsers);

  return res.status(200).json({
    success: true,
    message: "Users fetched successfully.",
    users,
  });
});


// code for searching users using filters.
export const searchByFilters = asyncHandler(async (req, res, next) => {
  // console.log("search by filter route hit.");

  const searchString = req.query.searchString;

  // console.log(searchString);

  if (!searchString || searchString?.length === 0) {
    return next(new ErrorHandler(403, "Search string cannot be empty."));
  }

  if (searchString?.length > 30) {
    return next(
      new ErrorHandler(403, "Search string cannot more than 30 characters."),
    );
  }

  const searchFilter = {
      $or: [
        { name: { $regex: searchString, $options: "i" } },
        { college: { $regex: searchString, $options: "i" } },
        { address: { $regex: searchString, $options: "i" } },
      ],
  }

  //  Fetch user using the filter
  const users = await User.find(searchFilter).select("name semester program college address photo");

  return res.status(200).json({
    success: true,
    message: "Users fetched successfully.",
    users,
  });
});
