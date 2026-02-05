
import express from "express"
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { createComment, createPost, deleteComment, deletePost, editComment, editPost, getComments, getPost, getPosts, reportComment, reportPost, ToogleLikePost, uploadPostPhoto } from "../controllers/Post.controller.js";

const route = express.Router();


// Routes for handling the Post(CRUD)
route.get("/", isAuthenticated, getPosts);
route.get("/view-post/:postId", isAuthenticated, getPost)
route.get("/:postId/comments", isAuthenticated, getComments)


route.post("/create", isAuthenticated, uploadPostPhoto.single("photo"), createPost);
route.put("/edit/:postId", isAuthenticated, editPost);
route.delete("/delete/:postId", isAuthenticated, deletePost);
route.post("/report/:postId", isAuthenticated, reportPost);

// Route for handling the likes in a post
route.put("/like/:postId", isAuthenticated, ToogleLikePost);

// Routes for handling comments in a Post
route.post("/create-comment/:postId", isAuthenticated, createComment);
route.put("/edit-comment/:id", isAuthenticated, editComment);
// route.delete("/delete-comment/:id", isAuthenticated, deleteComment);
route.delete("/:postId/delete-comment/:id", isAuthenticated, deleteComment);
route.post("/report-comment/:id", isAuthenticated, reportComment );



export default route;