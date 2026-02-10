import { createSlice } from "@reduxjs/toolkit";
import { createPostCommentThunk, deletePostThunk, editPostThunk, getNotificationsThunk, getPostCommentsThunk, editPostCommentThunk, getPostsThunk, getPostThunk, getProfilePostsThunk, likePostThunk, postCreateThunk, reportPostThunk, deletePostCommentThunk } from "./post.thunk";
import toast from "react-hot-toast";

const initialState = {
  posts: [], // state to hold posts...
  profilePosts: [],                             // state to hold profile posts
  post: null,                                     // state to hold current post...
  comments: [],
  notifications: [],
  muteNotifications: localStorage.getItem("muteNotifications") === "true" ? true : false || false,

  // Loaders
  loader: false,
  success: false, // State to redirect to different pages on any operation success.
  editPostSuccess: false,
  deletePostSuccess: false,
  postLoader:false,
  postSucess:false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setSuccess: (state, action) => {
      state.success = action.payload;
      console.log("success:", action.payload)
    },

    toggleLike: (state, action)=>{
      const {postId, userId} = action.payload;
      
      const post = state.posts.find(p=>p._id===postId);
      if(!post) return;      

      // Toggle like ? unlike
      if(!post.likerIds)
        post.likerIds = [];

      if(post.likerIds.includes(userId)){
        post.likerIds = post.likerIds.filter(id => id !== userId)
        post.likeCount -= 1;
      }else{
        post.likerIds.push(userId);
        post.likeCount += 1;
      }
    },

    createComment: (state, action)=>{
      const {postId} = action.payload;
      const post = state.posts.find(p=>p._id === postId);
      if(!post) return;
      post.commentCount += 1;
    },

    deleteComment: (state, action)=>{
      const {postId} = action.payload;
      const post = state.posts.find(p=>p._id === postId);
      if(!post) return;
      post.commentCount -= 1;
    },
    
    setEditPostSuccess: (state, action)=>{
      state.editPostSuccess = action.payload;
    },
     setDeletePostSuccess: (state, action)=>{
      state.deletePostSuccess = action.payload;
    },
    appendNotification: (state, action)=>{
      state.notifications = [action.payload, ...state.notifications];
    },

    setMuteNotifications: (state, action)=>{
      state.muteNotifications = action.payload;
      localStorage.setItem("muteNotifications", action.payload);
    },
  },

  // All the asynchobous operations are put into extraReducers.
  extraReducers: (builder) => {
    // code for post create states...
    builder.addCase(postCreateThunk.pending, (state, action) => {
      console.log("pending");
      state.loader = true;
      state.success = false;
    });

    builder.addCase(postCreateThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loader = false;
      state.success = true;
      state.posts = [action.payload?.post, ...state.posts];
      toast.success(action.payload?.message); // Show password change success message
      console.log(state.posts);
    });

    builder.addCase(postCreateThunk.rejected, (state, action) => {
      console.log("rejected");
      state.loader = false;
      toast.error(action.payload); // Show password change success message
    });
    
    
    // code for post edit states...
    builder.addCase(editPostThunk.pending, (state, action) => {
      console.log("pending");
      state.loader = true;
      state.success = false;
    });

    builder.addCase(editPostThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loader = false;
      state.success = true;

      const updatedPost = action.payload?.post;
      console.log("updated post:", updatedPost);
      state.posts = state.posts.map(post=>( post._id === updatedPost._id ? updatedPost : post ))
      state.editPostSuccess = true;
      toast.success(action.payload?.message); // Show password change success message
      console.log(state.posts);
    });

    builder.addCase(editPostThunk.rejected, (state, action) => {
      console.log("rejected");
      state.loader = false;
      toast.error(action.payload); // Show password change success message
    });


    // code for post report states...
    builder.addCase(reportPostThunk.pending, (state, action) => {
      console.log("pending");
      state.loader = true;
      state.success = false;
    });

    builder.addCase(reportPostThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loader = false;
      state.success = true;
      toast.success(action.payload);         
      console.log(state.posts);
    });

    builder.addCase(reportPostThunk.rejected, (state, action) => {
      console.log("rejected");
      state.loader = false;
      toast.error(action.payload); 
    });


    // code for post delete states...
    builder.addCase(deletePostThunk.pending, (state, action) => {
      console.log("pending");
      state.loader = true;
      state.success = false;
    });

    builder.addCase(deletePostThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loader = false;
      state.success = true;

      const deletedPost = action?.payload?.post;
      state.posts = state.posts.filter(p=>p?._id !== deletedPost?._id);
      
      toast.success(action?.payload?.message);         
      console.log(state.posts);
    });

    builder.addCase(deletePostThunk.rejected, (state, action) => {
      console.log("rejected");
      state.loader = false;
      toast.error(action.payload); 
    });


    // code for fetching all notifications...
    builder.addCase(getNotificationsThunk.pending, (state, action) => {
      console.log("pending");
      state.loader = true;
      state.success = false;
    });

    builder.addCase(getNotificationsThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loader = false;
      state.success = true;
      state.notifications = action.payload?.notifications;
      // toast.success(action.payload?.message);               // comment this when in production
    });

    builder.addCase(getNotificationsThunk.rejected, (state, action) => {
      console.log("rejected");
      state.loader = false;
      console.log(action.payload);
      // toast.error(action.payload);                          // comment this when in production
    });

    
    // code for fetching all posts...
    builder.addCase(getPostsThunk.pending, (state, action) => {
      console.log("pending");
      state.loader = true;
      state.success = false;
    });

    builder.addCase(getPostsThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loader = false;
      state.success = true;
      // state.posts = [...state.posts, ...action.payload?.posts];
      state.posts = action.payload?.posts;
      //  toast.success(action.payload?.message);               // comment this when in production
    });

    builder.addCase(getPostsThunk.rejected, (state, action) => {
      console.log("rejected");
      state.loader = false;
      console.log(action.payload);
      // toast.error(action.payload);                          // comment this when in production
    });    
    
    
    // code for fetching all posts for one profile...
    builder.addCase(getProfilePostsThunk.pending, (state, action) => {
      console.log("pending");
      state.loader = true;
      state.success = false;
    });

    builder.addCase(getProfilePostsThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loader = false;
      state.success = true;
      // state.profiePosts = [...state.profilePosts, ...action.payload?.posts];
      state.profilePosts = action.payload?.posts;
      //  toast.success(action.payload?.message);               // comment this when in production
    });

    builder.addCase(getProfilePostsThunk.rejected, (state, action) => {
      console.log("rejected");
      state.loader = false;
      console.log(action.payload);
      // toast.error(action.payload);                          // comment this when in production
    });



    // code for fetching one post...
    builder.addCase(getPostThunk.pending, (state, action) => {
      console.log("pending");
      state.post = null;            // clear previous post data
      state.postLoader = true;
      state.postSuccess = false;
    });

    builder.addCase(getPostThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.postLoader = false;
      state.postSuccess = true;
      state.post = action.payload.post;                     // Store loaded post in post state..
      //  toast.success(action.payload?.message);               // comment this when in production
    });

    builder.addCase(getPostThunk.rejected, (state, action) => {
      console.log("rejected");
      state.postLoader = false;
      state.postLoader = false;
      console.log(action.payload);
    });
    
    
    // code for fetching all comments of one post...
    builder.addCase(getPostCommentsThunk.pending, (state, action) => {
      console.log("pending");
      state.loader = true;
      state.success = false;
    });

    builder.addCase(getPostCommentsThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loader = false;
      state.success = true;
      state.comments = action.payload;                      // Store loaded comments in comments state..
      //  toast.success(action.payload?.message);               // comment this when in production
    });

    builder.addCase(getPostCommentsThunk.rejected, (state, action) => {
      console.log("rejected");
      state.loader = false;
      console.log(action.payload);        // Display message
      // toast.error(action.payload);       // comment this when in production
    });
        
    
    // code for liking a post...
    builder.addCase(likePostThunk.pending, (state, action) => {
      console.log("pending");
      state.loader = true;
      state.success = false;
    });

    builder.addCase(likePostThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loader = false;
      state.success = true;
      //  toast.success(action.payload?.message);               // comment this when in production
    });

    builder.addCase(likePostThunk.rejected, (state, action) => {
      console.log("rejected");
      state.loader = false;
      console.log(action.payload);        // Display message
      // toast.error(action.payload);       // comment this when in production
    });   
    
  
    
    // code for fetching all comments of one post...
    builder.addCase(createPostCommentThunk.pending, (state, action) => {
      console.log("pending");
      state.loader = true;
      state.success = false;
    });

    builder.addCase(createPostCommentThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loader = false;
      state.success = true;
      state.comments = [action.payload, ...state.comments];                      // Store loaded comments in comments state..
    });

    builder.addCase(createPostCommentThunk.rejected, (state, action) => {
      console.log("rejected");
      state.loader = false;
      console.log(action.payload);        // Display message
    });
  
    
    // code for editing comment of a post...
    builder.addCase(editPostCommentThunk.pending, (state, action) => {
      console.log("pending");
      state.loader = true;
      state.success = false;
    });

    builder.addCase(editPostCommentThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loader = false;
      state.success = true;
      const comment = action?.payload?.comment;
      state.comments = state.comments?.map(c=>c._id !== comment._id ? c : comment);                      // Store loaded comments in comments state..
       toast.success(action.payload?.message);                               // comment this when in production
    });

    builder.addCase(editPostCommentThunk.rejected, (state, action) => {
      console.log("rejected");
      state.loader = false;
      toast.error(action?.payload);       // comment this when in production
      console.log(action.payload?.message);        // Display message
    });
    
    

    // code for deleting comment of a post...
    builder.addCase(deletePostCommentThunk.pending, (state, action) => {
      console.log("pending");
      state.loader = true;
      state.success = false;
    });

    builder.addCase(deletePostCommentThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loader = false;
      state.success = true;
      const deletedComment = action?.payload?.comment;
      const post = action?.payload?.post;       
      state.comments= state.comments.filter(c=>c._id !== deletedComment._id), 
      
      // updating the post comment Count
      state.posts = state.posts.map(p=>(
        (p._id === post._id) ? {
          ...p,
          commentCount: p.commentCount -1
        } : p
      ))



      toast.success(action.payload?.message);                               
    });

    builder.addCase(deletePostCommentThunk.rejected, (state, action) => {
      console.log("rejected");
      state.loader = false;
      console.log(action.payload);        // Display message
      toast.error(action.payload?.message);       // comment this when in production
    });



  },
});

export const { setSuccess, toggleLike, createComment, setEditPostSuccess, setDeletePostSuccess, appendNotification, setMuteNotifications } = postSlice.actions;
export default postSlice.reducer;
