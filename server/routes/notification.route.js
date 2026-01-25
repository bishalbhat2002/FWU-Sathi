import express from "express"
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const route = express.Router();

// Routes for handling the get Notificatoin
// route.get("/", isAuthenticated, );
route.get("/get-search-filters", isAuthenticated, );


export default route;