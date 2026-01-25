
import express from "express"
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { createComment, createPost, deleteComment, deletePost, editComment, editPost, getPost, getPosts, likePost, reportComment, reportPost, uploadPostPhoto } from "../controllers/Post.controller.js";

const route = express.Router();


// Routes for handling the Post(CRUD)
route.get("/", getPosts);
route.get("/view-post/:postId", isAuthenticated, getPost)

route.post("/create", isAuthenticated, uploadPostPhoto.single("photo"), createPost);
route.put("/edit/:postId", isAuthenticated, editPost);
route.delete("/delete/:postId", isAuthenticated, deletePost);
route.post("/report/:postId", isAuthenticated, reportPost);

// Route for handling the likes in a post
route.put("/like/:postId", isAuthenticated, likePost);

// Routes for handling comments in a Post
route.post("/create-comment/:postId", isAuthenticated, createComment);
route.put("/edit-comment/:id", isAuthenticated, editComment);
route.post("/delete-comment/:id", isAuthenticated, deleteComment);
route.post("/report-comment/:id", isAuthenticated, reportComment );



export default route;