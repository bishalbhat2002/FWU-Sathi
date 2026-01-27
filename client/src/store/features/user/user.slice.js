import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     isAuthenticated:false,
     userProfile:null,
     userPosts:null,

     // Loaders
     isAuthenticatedLoader:true,
     userProfileLoader:true,
     userPostsLoader:true,
     emailValidated:false,                   // First validate email... No access to website core features, without email validation.
}

export const userSlice = createSlice({
     name:"user",
     initialState,
     reducers:{

     }
})