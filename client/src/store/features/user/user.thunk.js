import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../utilities/axiosInstance";

// Code to verify email during User registration...
export const verifyRegisterEmailThunk = createAsyncThunk(
  "verifyRegisterEmail",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/user/get-verification-code-for-register",
        { email },
      );

      // Verification Code success message
      return response?.data?.message;
    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Code for user registration...
export const registerUserThunk = createAsyncThunk(
  "RegisterUSer",
  async (
    {
      email,
      verificationCode,
      name,
      password,
      gender,
      semester,
      program,
      college,
      address,
    },
    { rejectWithValue },
  ) => {
    try {
      console.log("req send... register");
      const response = await axiosInstance.post("/user/register", {
        email,
        code: verificationCode,
        password,
        gender,
        program,
        college,
        semester,
        address,
        name,
      });

      // Register data....
      return response?.data;
    } catch (error) {
      console.log("error from catch:", error?.response?.data?.message);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// COde to login the user....
export const loginUserThunk = createAsyncThunk(
  "LoginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/login", {
        email,
        password,
      });
      console.log("response: ", response);

      // This goes to fulfilled state.
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Code to logout the user....
export const logoutUserThunk = createAsyncThunk(
  "LogoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/logout");

      // Logout success message
      return response?.data?.message;
    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Code to verify the user email for forgot password.....
export const verifyForgotPasswordThunk = createAsyncThunk(
  "verifyForgotPasswordEmail",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/user/forgot-password/get-verification-code",
        { email },
      );

      // Verification Code success message
      return response?.data?.message;
    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Code to send email, password, and code to backend for password change (through forgot password).....
export const changeForgotPasswordThunk = createAsyncThunk(
  "ChangeForgotPassword",
  async ({ email, password, code }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "/user/forgot-password/change-password",
        { email, password, code },
      );

      // Forgot Password change success message
      return response?.data?.message;
    } catch (error) {
      console.log("error:", error);

      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Code to fetch profile details notifications...
export const getProfileThunk = createAsyncThunk(
  "getProfile",
  async ({ userId }, { rejectWithValue }) => {
    try {
      // const response = await axiosInstance.get(`/user/get-profile/${userId}`);
      const response = await axiosInstance.get(`/user/get-profile/${userId}`);

      // console.log(response?.data);
      return response?.data;        
    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Code to change profile pic...
export const changeProfilePicThunk = createAsyncThunk(
  "changeProfilePicture",
  async (photo, { rejectWithValue }) => {
    try {
      if (!photo) {
        rejectWithValue("No photo selected.");
      }

      const formData = new FormData();
      formData.append("profile-photo", photo);
      const response = await axiosInstance.put(
        `/user/edit-profile-pic`,
        formData,
      );

      //  console.log(response?.data)
      return response?.data; // return created post and success message object...
    } catch (error) {
      console.log("error:", error?.response);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Code to change cover pic...
export const changeCoverPicThunk = createAsyncThunk(
  "changeCoverPicture",
  async (photo, { rejectWithValue }) => {
    try {
      if (!photo) {
        rejectWithValue("No photo selected.");
      }

      const formData = new FormData();
      formData.append("cover-photo", photo);
      const response = await axiosInstance.put(`/user/edit-cover`, formData);

      console.log(response?.data);
      return response?.data; // return created post and success message object...
    } catch (error) {
      console.log("error:", error?.response);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Code for user information update...
export const editUserInformationThunk = createAsyncThunk(
  "editUserInformation",
  async (updatedData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "/user/edit-profile",
        updatedData,
      );

      // console.log(response?.data);
      // Register data....
      return response?.data;
    } catch (error) {
      console.log("error from catch:", error?.response?.data?.message);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

// Change Password thunk....
export const changePasswordThunk = createAsyncThunk(
  "ChangePassword",
  async (data, { rejectWithValue }) => {
    try {
     
      console.log(data)
      const response = await axiosInstance.put("/user/update-password", data);

      // console.log(response?.data);
      // Forgot Password change success message
      return response?.data?.message;
    } catch (error) {
      console.log("error:", error);
      console.log("error:", error?.response?.data);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);




// Code to fetch total user number...
export const getTotalUserThunk = createAsyncThunk(
  "getTotalUser",
  async (_, { rejectWithValue }) => {
    try {
      // const response = await axiosInstance.get(`/user/get-profile/${userId}`);
      const response = await axiosInstance.get(`/user/get-total-users`);

      // console.log(response?.data);
      return response?.data?.totalUsers; // return created post and success message object...
    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);
