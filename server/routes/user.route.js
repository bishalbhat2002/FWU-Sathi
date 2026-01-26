
import exporess from "express"
import { editCoverPic, editProfileInfo, editProfilePic, getOtherProfile, getOtherProfilePosts, getProfile, getProfilePosts, login, logout, register, updatePassword, uploadProfilePhoto} from "../controllers/User.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const route = exporess.Router();

// Routes for handling login and register of user
route.post("/login", login);
route.post("/register", register);

// Routes for handling logout and getting user Profile
route.get("/logout", isAuthenticated, logout);
route.get("/get-profile", isAuthenticated, getProfile);
route.get("/get-profile-posts/", isAuthenticated, getProfilePosts);           // Route for getting own posts on profile

// Route for getting other users profile and their posts
route.get("/get-profile/:userId", isAuthenticated, getOtherProfile);
route.get("/get-profile-posts/:userId", isAuthenticated, getOtherProfilePosts);

// Routes for Updating Profile Info
route.put("/edit-profile", isAuthenticated, editProfileInfo);                // for updating the data in database.

 route.put("/edit-profile-pic", isAuthenticated, uploadProfilePhoto.single("profile-photo"), editProfilePic);                // For updating profile pic.
 route.put("/edit-cover", isAuthenticated, uploadProfilePhoto.single("cover-photo"), editCoverPic);                  // For updating cover pic.

route.put("/update-password", isAuthenticated, updatePassword)                                 // route for updating password.

export default route;