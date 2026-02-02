import express from "express"
import cookieParser from "cookie-parser"
import "dotenv/config"
import cors from "cors"
import { connectDB } from "./config/connect.db.js"
import { GlobalErrorHandler } from "./middlewares/GlobalError.middleware.js"
import userRoute from "./routes/user.route.js"
import postRoute from "./routes/post.route.js"
import notificationRoute from "./routes/notification.route.js"
import searchRoute from "./routes/search.route.js"
import messageRoute from "./routes/message.route.js"
import reportRoute from "./routes/report.route.js"
import { sendMail } from "./utilities/sendMail.js"



const app = express()

/**
 * CORS configuration:
 * Cors stands for Cross Origin Resource Sharing- It allwos frontend 
 * (running on different origin) to access backend APIs.
 * 
 * Example:
 * Frontend: http://localhost:5173
 * Backend: http://localhost:3000
 * 
 * Without CORS setup -> Browser will block the request.
 * Note: CORS is browser feature, the CORS library in backend protects client in the fronent.
 * This library sets the response header which determines whether the client JS can read the 
 * response or not. 
 * 
 * NOTE:
 * app.use(cors()) -> it is good for learning, but unsafe for production because 
 * it allows all orgins to access the APIs.
 * 
*/

app.use(cors({
     origin:["http://localhost:5173",],                     // This allows only this origin from frontend to access the Backend APIs.
     methods: ["GET", "POST", "PUT", "DELETE"],             // These are allowed HTTP methods
     allowedHeaders: ["content-Type", "authorization"],     // Allowed headers
     credentials:true,                                      // This allows cookies -> for auth headers 
}))

app.use(express.json())                                     // Middleware to parse incoming JSON Request from Client (API requests)
app.use(cookieParser())                                     // Middleware to parse Cookies sent by client in request headers
app.use(express.urlencoded({extended:true}))                // Middleware to parse URL-encoded form data (send using GET or POST) (used when handling HTML form submissions)

/**
 * Note: 
 * extended:true -> Parses URL-encoded form data and allows nested objects (recommended)
 * extended:false -> Parses URL-encoded form data and but allows only simple key-value pairs (not-recommended)
 * 
 */



// Routes
app.use("/user", userRoute)
app.use("/post", postRoute)
app.use("/notification", notificationRoute)
app.use("/search", searchRoute)
app.use("/message", messageRoute)
app.use("/report", reportRoute)


// GLOBAL ERROR HADNLING Middleware at the end
app.use(GlobalErrorHandler)



const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
     console.log("Server Listening on PORT: ", PORT)
     connectDB()
})