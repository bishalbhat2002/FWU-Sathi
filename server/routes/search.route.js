
import express from "express"
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { getAllUsers, searchByFilters } from "../controllers/Search.controller.js";


const route = express.Router();

// Routes for handling the get Notificatoin
route.get("/get-all-users", isAuthenticated, getAllUsers);
route.get("/", isAuthenticated, searchByFilters);


export default route;