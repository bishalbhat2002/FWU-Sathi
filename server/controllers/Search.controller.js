import { User } from "../models/user.model.js";
import { asyncHandler } from "../utilities/AsyncHandler.utility.js";

// code for getting search filters...
export const getSearchFilters = asyncHandler(async (req, res, next) => {
  const [addresses, colleges, semesters] = await Promise.all([
    User.distinct("semester"),
    User.distinct("college"),
    User.distinct("address"),
  ]);

  return res.status(200).json({
    success: true,
    message: "Search filters fetched successfully.",
    addresses,
    colleges,
    semesters,
  });
});

// code for getting all users without filters.
export const getAllUsers = asyncHandler(async (req, res, next) => {
  console.log("get all users route hit...");
  const { page = 1 } = req.params;
  const limitUsers = 25;
  const usersSkip = (page - 1) * limitUsers;

  const users = await User.find()
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
// export const searchByFilters = asyncHandler(async (req, res, next) => {
//   console.log('search by filter route hit.')
//   const { page = 1 } = req.params;      // Page number for pagination
//   const limitUsers = 25;
//   const usersSkip = (page - 1) * limitUsers;
//   const filter = req.body.filter;         // Expected -> {address:value, college:value, semester:value}
//   const searchString = req.body.searchString;

//   //   We built dynamic filter for this.
//   let searchFilter = {};

//   if(searchString){
//     searchFilter.name={
//       $regex: searchString,     // Matches search string with name
//       $options:"i",             // For case-insensitive search
//     }
//     console.log(searchFilter);
//   }

//   if (filter?.address) {
//     searchFilter.address = filter.address;
//   }

//   if (filter?.college) {
//     searchFilter.college = filter.college;
//   }

//   if (filter?.semester) {
//     searchFilter.semester = filter.semester;
//   }

//   //  Fetch user using the filter
//   const users = await User.find(searchFilter)
//     .sort({ name: 1 })
//     .skip(usersSkip)
//     .limit(limitUsers);

//   return res.status(200).json({
//     success: true,
//     message: "Users fetched successfully.",
//     users,
//   });
// });

// code for searching users using filters.
export const searchByFilters = asyncHandler(async (req, res, next) => {
  console.log("search by filter route hit.");

  const {searchString} = req.body;

  console.log(searchString);

  // We built dynamic filter for this.
  let searchFilter = {};

  if (!searchString || searchString?.length === 0) {
    return next(new ErrorHandler(403, "Search string cannot be empty."));
  }

  if (searchString?.length > 30) {
    return next(
      new ErrorHandler(403, "Search string cannot more than 30 characters."),
    );
  }

  searchFilter.name = {
    $regex: searchString, // Matches search string with name
    $options: "i", // For case-insensitive search
  };

  //  Fetch user using the filter
  const users = await User.find(searchFilter);

  return res.status(200).json({
    success: true,
    message: "Users fetched successfully.",
    users,
  });
});
