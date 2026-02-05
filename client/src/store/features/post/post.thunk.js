import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../utilities/axiosInstance";


// Code to create post...
export const postCreateThunk = createAsyncThunk(
  "createPost",
  async (postData, { rejectWithValue }) => {
    try {

     // Create FormData object
     const formData = new FormData();

     formData.append("caption", postData.caption);
     if(postData.photo){
          formData.append("photo", postData.photo);
     }

     const response = await axiosInstance.post(
        "/post/create",
        formData,                  // When we are handling file upload, we send formData object instead of plain object....
     );

      console.log(response?.data);
      return response?.data;                 // return created post and success message object...

    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);


// Code to edit post...
export const editPostThunk = createAsyncThunk(
  "editPost",
  async ({caption, postId}, {rejectWithValue}) => {
    try {

     const response = await axiosInstance.put(
        `/post/edit/${postId}`,
        {caption},                  // When we are handling file upload, we send formData object instead of plain object....
     );

      console.log(response?.data);
      return response?.data;                 // post edit message success message object...

    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);


// Code to report post...
export const reportPostThunk = createAsyncThunk(
  "reportPost",
  async ({report, postId}, {rejectWithValue}) => {
    try {


     const response = await axiosInstance.post(
        `/post/report/${postId}`,
        {reportMessage:report},              
     );

      console.log(response?.data);
      return response?.data?.message;                 // post report success message object...

    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);


// Code to delete post...
export const deletePostThunk = createAsyncThunk(
  "deletePost",
  async ({postId}, {rejectWithValue}) => {
    try {


     const response = await axiosInstance.delete(`/post/delete/${postId}`);

      console.log(response?.data);
      return response?.data;                 // post report success message object...

    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);


// Code to fetch all notifications...
export const getNotificationsThunk = createAsyncThunk(
  "getNotification",
  async ({page=1}, { rejectWithValue }) => {
    try {
     const response = await axiosInstance.get(`/notification?page=${page}`);

      console.log(response?.data);
      return response?.data;                 // return created post and success message object...

    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);






// Code to fetch all posts...
export const getPostsThunk = createAsyncThunk(
  "getPosts",
  async ({page=1}, { rejectWithValue }) => {
    try {
     const response = await axiosInstance.get(`/post?page=${page}`);

      console.log(response?.data);
      return response?.data;                 // return created post and success message object...

    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);



// Code to fetch all posts form one profile...
export const getProfilePostsThunk = createAsyncThunk(
  "getProfilePosts",
  async ({page=1, userId}, { rejectWithValue }) => {
    try {
     const response = await axiosInstance.get(`/user/get-profile-posts/${userId}?page=${page}`);

      // console.log(response?.data);
      return response?.data;                 // return created post and success message object...

    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);




// Code to one post...
export const getPostThunk = createAsyncThunk(
  "getPost",
  async (postId, { rejectWithValue }) => {
    try {
     console.log('get post req')
     const response = await axiosInstance.get(`/post/view-post/${postId}`);
     console.log('get post res')

      console.log(response?.data);
      return response?.data;                 // return created post and success message object...

    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Code to fetch all comments from a post...
export const getPostCommentsThunk = createAsyncThunk(
  "getPostComments",
  async (postId, { rejectWithValue }) => {
    try {
     const response = await axiosInstance.get(`/post/${postId}/comments/`);
     
     // console.log(response?.data?.comments);         // Displays all the comments...
     return response?.data?.comments;                 // return created post and success message object...

    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);


// Code to comment on a post...
export const likePostThunk = createAsyncThunk(
  "likePostComment",
  async ({postId}, { rejectWithValue }) => {
    try {

     const response = await axiosInstance.put(`/post/like/${postId}`);

      console.log("response data:", response?.data);
      return response?.data?.comment;                 // return created post and success message object...

    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);





// Code to comment on a post...
export const createPostCommentThunk = createAsyncThunk(
  "createPostComment",
  async ({comment, postId}, { rejectWithValue }) => {
    try {

     const response = await axiosInstance.post(
        `/post/create-comment/${postId}`,
        {commentMessage: comment},                  
     );

      console.log("response data:", response?.data);
      return response?.data?.comment;                 // return created post and success message object...

    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);


// Code to edit post comment...
export const editPostCommentThunk = createAsyncThunk(
  "editPostComment",
  async ({comment, commentId}, {rejectWithValue}) => {
    try {

     const response = await axiosInstance.put(
        `/post/edit-comment/${commentId}`,
        {commentMessage:comment},                
     );

      console.log(response?.data);
      return response?.data;                 // post edit message success message object...

    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);



// Code to delete post comment...
export const deletePostCommentThunk = createAsyncThunk(
  "deletePostComment",
  async ({commentId, postId}, {rejectWithValue}) => {
    try {

      // alert(`${commentId}${postId}`)
     const response = await axiosInstance.delete(
        `/post/${postId}/delete-comment/${commentId}`);

      console.log(response?.data);
      return response?.data;                 // post edit message success message object...

    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);