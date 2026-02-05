import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../utilities/axiosInstance";



// Code to get all messages ...
export const getMessagesThunk = createAsyncThunk(
  "getAllMessages",
  async ({page=1}, { rejectWithValue }) => {
    try {
     const response = await axiosInstance.get(`/message/get-messages?page=${page}`);

      console.log(response?.data);
      return response?.data;                     

    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);




// Code to send Message...
export const sendMessageThunk = createAsyncThunk(
  "sendMessage",
  async ({message}, { rejectWithValue }) => {
    try {

     const response = await axiosInstance.post(
        `/message/send-message`,
        {message},                  
     );

      console.log("response data:", response?.data);
      return response?.data;                 // return created post and success message object...

    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);



// Code to delete Message...
export const deleteMessageThunk = createAsyncThunk(
  "deleteMessage",
  async ({messageId}, { rejectWithValue }) => {
    try {

     const response = await axiosInstance.delete(
        `/message/delete-message/${messageId}`);

      console.log("response data:", response?.data);
      return response?.data;                    

    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);


// Code to edit Message...
export const editMessageThunk = createAsyncThunk(
  "editMessage",
  async ({messageId, editMessage}, { rejectWithValue }) => {
    try {

     const response = await axiosInstance.put(
        `/message/edit-message/${messageId}`, {message:editMessage});

      console.log("response data:", response?.data);
      return response?.data;                    

    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(error?.response?.data?.message);
    }
  },
);