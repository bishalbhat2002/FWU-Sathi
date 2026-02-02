
import express from "express"
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { RejectReport, ResolveReport } from "../controllers/Report.controller.js";

const route = express.Router();


// Routes for handling User Reports.
route.put("/resolve/:reportId", isAuthenticated, ResolveReport);
route.put("/reject/:reportId", isAuthenticated, RejectReport);


export default route;