import { createSlice } from "@reduxjs/toolkit";
import {
  changeCoverPicThunk,
  changeForgotPasswordThunk,
  changePasswordThunk,
  changeProfilePicThunk,
  editUserInformationThunk,
  getProfileThunk,
  getTotalUserThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  verifyForgotPasswordThunk,
  verifyRegisterEmailThunk,
} from "./user.thunk";
import toast from "react-hot-toast";

const initialState = {
  isAuthenticated: false,
  userProfile: null,            //state to store currently logged in user details - name, email, profile picture, cover photo, etc...
  profileIndicator: false,
  verificationCodeField: false,
  showOtherFields: false,       // State to show / hide verification code, new & confirm password fields in forgot password page. false -> hide, ture -> show...
  success: false,               // State to redirect to different pages on any operation success.
  profileInfo: null,            // state to store profile information - name, cover, profile, social media links, etc...
  editProfile:false,
  editLoader: false,
  totalUsers: 0,
  onlineUsers: 1,
 
  editSuccess: false,
  profileLoader: false,
  profileLoadSuccess: false,
  
  // Loaders
  authLoader: true, // To show loader untill data is read from localstorage...
  loader: false,

};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfileIndicator: (state, action) => {
      state.profileIndicator = action.payload;
    },

    setSuccess: (state, action) => {
      state.success = action.payload;
    },

    toggleProfileIndicator: (state) => {
      state.profileIndicator = !state.profileIndicator;
    },

    loadSelfState: (state) => {
      const auth = localStorage.getItem("isAuthenticated");
      const profile = localStorage.getItem("userProfile");

      state.isAuthenticated = auth ? JSON.parse(auth) : false;
      state.userProfile = profile ? JSON.parse(profile) : null;
      state.authLoader = false;
    },

    showVerificationCodeField: (state) => {
      state.verificationCodeField = true;
    },

    setEditProfile: (state, action)=>{
      state.editProfile = action.payload;
    }
  },

  // All the asynchobous operations are put into extraReducers.
  extraReducers: (builder) => {
    // User Login States
    builder.addCase(loginUserThunk.pending, (state, action) => {
      console.log("pending");
      state.loader = true;
    });

    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      //  console.log(action);
      console.log("fullfilled");
      state.isAuthenticated = true;
      state.userProfile = action.payload.user; // store the user details on userProfile.
      state.loader = false;
      localStorage.setItem("isAuthenticated", JSON.stringify(true));              // Store state on localstorage.
      localStorage.setItem("userProfile", JSON.stringify(action.payload.user));   // store userProfile also.
      toast.success(action.payload?.message);
    });

    builder.addCase(loginUserThunk.rejected, (state, action) => {
      console.log("rejected");
      state.isAuthenticated = false;
      state.userProfile = null;
      state.loader = false;
      console.log(action);
      toast.error(action.payload);
    });

    // User Logout States
    builder.addCase(logoutUserThunk.pending, (state, action) => {
      console.log("pending");
      state.loader = true;
    });

    builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loader = false;
      state.isAuthenticated = false;
      state.userProfile = null;
      localStorage.removeItem("isAuthenticated"); // Clear state from localstorage.
      localStorage.removeItem("userProfile"); // Clear state from userProfile state.
      toast.success(action.payload); // Show logout success message
    });

    builder.addCase(logoutUserThunk.rejected, (state, action) => {
      console.log("rejected");
      state.loader = false;
      state.userProfile = null;
      toast.error(action.payload); // Show logout failed message
    });

    // Email Verification - Register States
    builder.addCase(verifyRegisterEmailThunk.pending, (state, action) => {
      console.log("pending");
      state.loader = true;
    });

    builder.addCase(verifyRegisterEmailThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loader = false;
      state.verificationCodeField = true;
      toast(action.payload); // Show verification code send success message
    });

    builder.addCase(verifyRegisterEmailThunk.rejected, (state, action) => {
      console.log("rejected");
      state.loader = false;
      toast.error(action.payload); // Show logout failed message
    });

    // User Registration States
    builder.addCase(registerUserThunk.pending, (state, action) => {
      console.log("pending");
      state.loader = true;
    });

    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.isAuthenticated = true;
      state.userProfile = action.payload.user;        // store the user details on userProfile.
      state.loader = false;

      localStorage.setItem("isAuthenticated", JSON.stringify(true)); // Store state on localstorage.
      localStorage.setItem("userProfile", JSON.stringify(action.payload?.user)); // store userProfile also.
      state.verificationCodeField = false;
      toast.success(action.payload?.message); // Show verification code send success message
    });

    builder.addCase(registerUserThunk.rejected, (state, action) => {
      console.log("rejected");
      state.loader = false;
      toast.error(action.payload); // Show register failed message
    });

    // code to getting verification code for Email - password change
    builder.addCase(verifyForgotPasswordThunk.pending, (state, action) => {
      console.log("pending");
      state.loader = true;
      state.showOtherFields = false;
    });

    builder.addCase(verifyForgotPasswordThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loader = false;
      state.showOtherFields = true;
      toast.success(action.payload); // Show verification code send success message
    });

    builder.addCase(verifyForgotPasswordThunk.rejected, (state, action) => {
      console.log("rejected");
      state.loader = false;
      toast.error(action.payload); // Show verification code send failed message
    });

    // code to changing forgot password...
    builder.addCase(changeForgotPasswordThunk.pending, (state, action) => {
      console.log("pending");
      state.loader = true;
      state.success = false;
    });

    builder.addCase(changeForgotPasswordThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loader = false;
      state.success = true;
      state.showOtherFields = false;
      toast.success(action.payload); // Show password change success message
    });

    builder.addCase(changeForgotPasswordThunk.rejected, (state, action) => {
      console.log("rejected");
      state.loader = false;
      toast.error(action.payload); // Show password change success message
    });

    // code for fetching profile data...
    builder.addCase(getProfileThunk.pending, (state, action) => {
      console.log("pending");
      state.profileLoader = true;
      state.profileLoadSuccess = false;
    });

    builder.addCase(getProfileThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.profileLoader = false;
      state.profileLoadSuccess = true;
      state.profileInfo = action.payload.user;
      // toast.success(action.payload?.message); // comment this when in production
    });

    builder.addCase(getProfileThunk.rejected, (state, action) => {
      console.log("rejected");
      state.profileLoader = false;
      console.log(action.payload);
      // toast.error(action.payload.message); // comment this when in production
    });

    // code for profile picture edit states...
    builder.addCase(changeProfilePicThunk.pending, (state, action) => {
      console.log("pending");
      state.loader = true;
      state.success = false;
    });

    builder.addCase(changeProfilePicThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loader = false;
      state.success = true;
      // console.log(action?.payload);
      state.profileInfo.photo = action?.payload?.updatedPhoto;
      state.userProfile.photo = action?.payload?.updatedPhoto;
      localStorage.setItem("userProfile", JSON.stringify(state.userProfile));          // store userProfile in localstorage.
      // console.log(state.profileInfo);
      toast.success(action?.payload?.message); // Show password change success message
    });

    builder.addCase(changeProfilePicThunk.rejected, (state, action) => {
      console.log("rejected");
      state.loader = false;
      toast.error(action?.payload?.message); // Show password change success message
    });    
    
    // code for cover picture edit states...
    builder.addCase(changeCoverPicThunk.pending, (state, action) => {
      console.log("pending");
      state.loader = true;
      state.success = false;
    });

    builder.addCase(changeCoverPicThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loader = false;
      state.success = true;
      console.log("payload:",action?.payload);
      state.profileInfo.coverPhoto = action?.payload?.updatedCover;
      // console.log(state.profileInfo);
      toast.success(action?.payload?.message); // Show password change success message
    });

    builder.addCase(changeCoverPicThunk.rejected, (state, action) => {
      console.log("rejected");
      state.loader = false;
      toast.error(action?.payload?.message); // Show password change success message
    });
    
    // code for profile information edit...
    builder.addCase(editUserInformationThunk.pending, (state, action) => {
      console.log("pending");
      state.editLoader = true;
      state.editSuccess = false;
    });

    builder.addCase(editUserInformationThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.editLoader = false;
      state.editSuccess = true;

      // console.log("payload:", action?.payload);
      state.profileInfo = action?.payload?.user;
      // console.log(state.profileInfo);
      toast.success(action?.payload?.message); // Show password change success message
    });

    builder.addCase(editUserInformationThunk.rejected, (state, action) => {
      console.log("rejected");
      state.editLoader = false;
      toast.error(action?.payload?.message); // Show password change success message
    });

    // code for password update ...
    builder.addCase(changePasswordThunk.pending, (state, action) => {
      console.log("pending");
      state.passwordChangeLoader = true;
      state.passwordChangeSuccess = false;
    });

    builder.addCase(changePasswordThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.passwordChangeLoader = false;
      state.passwordChangeSuccess = true;
      state.isAuthenticated = false;
      state.userProfile = null;
      state.profileInfo = null;
      state.posts = null;
      localStorage.removeItem("isAuthenticated"); // Clear state from localstorage.
      localStorage.removeItem("userProfile"); // Clear state from userProfile state.
      toast.success(action?.payload); // Show password change success message
    });

    builder.addCase(changePasswordThunk.rejected, (state, action) => {
      console.log("rejected");
      state.passwordChangeLoader = false;
      toast.error(action?.payload); // Show password change success message
    });

    // code for fetching total user number...
    builder.addCase(getTotalUserThunk.pending, (state, action) => {
      console.log("pending");
      state.loader = true;
      state.success = false;
    });

    builder.addCase(getTotalUserThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loader = false;
      state.success = true;
      state.totalUsers = action.payload;
      // toast.success(action.payload?.message); // comment this when in production
    });

    builder.addCase(getTotalUserThunk.rejected, (state, action) => {
      console.log("rejected");
      state.loader = false;
      console.log(action.payload);
      // toast.error(action.payload.message); // comment this when in production
    });

  },
});

export const {
  loadSelfState,
  setProfileIndicator,
  setSuccess,
  toggleProfileIndicator,
  showVerificationCodeField,
  setEditProfile
} = userSlice.actions;
export default userSlice.reducer;
