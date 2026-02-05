import express from "express"
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { getNotification } from "../controllers/Notification.controller.js";

const route = express.Router();

// Routes for handling the get Notificatoin
 route.get("/", isAuthenticated, getNotification);


export default route;