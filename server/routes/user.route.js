
import express from "express"
import { editCoverPic, editProfileInfo, editProfilePic, ForgotChangePassword, getOtherProfile, getProfile, getProfilePosts, getVerificationCode, getVerificationCodeForRegister, login, logout, register, updatePassword, uploadProfilePhoto} from "../controllers/User.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const route = express.Router();

// Routes for handling login and register of user
route.post("/login", login);
route.post("/get-verification-code-for-register", getVerificationCodeForRegister);
route.post("/register", register);

// Routes for forget password
route.post("/forgot-password/get-verification-code", getVerificationCode)
route.put("/forgot-password/change-password", ForgotChangePassword)

// Routes for handling logout and getting user Profile
route.get("/logout", isAuthenticated, logout);
// route.get("/get-profile", isAuthenticated, getProfile);                     // Delete this....
route.get("/get-profile-posts/", isAuthenticated, getProfilePosts);           // Route for getting own posts on profile

// Route for getting other users profile and their posts
route.get("/get-profile/:userId", isAuthenticated, getOtherProfile);
route.get("/get-profile-posts/:userId", isAuthenticated, getProfilePosts);

// Routes for Updating Profile Info
route.put("/edit-profile", isAuthenticated, editProfileInfo);                // for updating the data in database.

route.put("/edit-profile-pic", isAuthenticated, uploadProfilePhoto.single("profile-photo"), editProfilePic);                // For updating profile pic.
route.put("/edit-cover", isAuthenticated, uploadProfilePhoto.single("cover-photo"), editCoverPic);                  // For updating cover pic.

route.put("/update-password", isAuthenticated, updatePassword)                                 // route for updating password.






export default route;