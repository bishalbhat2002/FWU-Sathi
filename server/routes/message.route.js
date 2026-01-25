
import express from "express"
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { deleteMessage, editMessage, getMessages, reportMessage, sendMessage } from "../controllers/Message.controller.js";

const route = express.Router();

route.post("/send-message", isAuthenticated, sendMessage);
route.get("/get-messages", isAuthenticated, getMessages);
route.put("/edit-message/:messageId", isAuthenticated, editMessage);
route.delete("/delete-message/:messageId", isAuthenticated, deleteMessage);

route.post("/report-message/:messageId", isAuthenticated, reportMessage);



export default route;