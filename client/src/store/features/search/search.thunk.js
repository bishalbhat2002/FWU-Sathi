import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../utilities/axiosInstance";



// Code to get all users ...
export const getAllUserThunk = createAsyncThunk(
  "getAllUser",
  async ({page=1}, { rejectWithValue }) => {
    try {
     const response = await axiosInstance.get(`/search/get-all-users?page=${page}`);

      console.log(response?.data);
      return response?.data;                     

    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);


// Code to search users ...
export const searchUserThunk = createAsyncThunk(
  "searchUser",
  async (searchString, { rejectWithValue }) => {
    try {
      // console.log("search:", searchString)
     const response = await axiosInstance.get(`/search?searchString=${searchString}`);

      console.log(response?.data);
      return response?.data;                 // return created post and success message object...

    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);

