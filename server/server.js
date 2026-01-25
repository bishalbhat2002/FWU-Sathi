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


const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

// Routes
app.use("/user", userRoute)
app.use("/post", postRoute)
app.use("/notification", notificationRoute)
app.use("/search", searchRoute)
app.use("/message", messageRoute)


// Show static links for notes like..
// app.use("/notes", userRoute)



// GLOBAL ERROR HADNLING Middleware at the end
app.use(GlobalErrorHandler)



const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
     console.log("Server Listening on PORT: ", PORT)
     connectDB()
})