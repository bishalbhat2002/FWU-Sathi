
import exporess from "express"
import { getProfile, login, logout, register } from "../controllers/User.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const route = exporess.Router();

// Routes for handling login and register of user
route.post("/login", login);
route.post("/register", register);

// Routes for handling logout and getting user Profile
route.get("/logout", isAuthenticated, logout);
route.get("/getProfile", isAuthenticated, getProfile);

export default route;