import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  deleteMessageThunk,
  editMessageThunk,
  getMessagesThunk,
  sendMessageThunk,
} from "./message.thunk";

const initialState = {
  messages: [],
  muteMessage : localStorage.getItem("muteMessage") === "true" ? true : false || false,

  // Loaders
  loader: false,
  success: false, // State to redirect to different pages on any operation success.
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setSuccess: (state, action) => {
      state.success = action.payload;
      console.log("success:", action.payload);
    },

    appendMessage:(state, action)=>{
      state.messages = [action?.payload, ...state.messages]
    },

    setMuteMessage: (state, action)=>{
      state.muteMessage = action.payload;
      localStorage.setItem("muteMessage", action.payload);  
    }
  },

  // All the asynchobous operations are put into extraReducers.
  extraReducers: (builder) => {
    // code for getting messages...
    builder.addCase(getMessagesThunk.pending, (state, action) => {
      //  console.log("pending");
      state.loader = true;
      state.success = false;
    });

    builder.addCase(getMessagesThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loader = false;
      state.success = true;
      state.messages = action?.payload?.messages;
      //  console.log(action?.payload);
    });

    builder.addCase(getMessagesThunk.rejected, (state, action) => {
      console.log("rejected");
      state.loader = false;
      toast.error(action.payload); // comment this when in production
    });

    // code for sending messages...
    builder.addCase(sendMessageThunk.pending, (state, action) => {
      // console.log("pending");
      state.loader = true;
      state.success = false;
    });

    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      // console.log("fullfilled");
      state.loader = false;
      state.success = true;
      //  console.log("payload: ",action?.payload);
    });

    builder.addCase(sendMessageThunk.rejected, (state, action) => {
      // console.log("rejected");
      state.loader = false;
      // toast.error(action.payload);                          // comment this when in production
    });

    // code for deleting messages...
    builder.addCase(deleteMessageThunk.pending, (state, action) => {
      console.log("pending");
      state.loader = true;
      state.success = false;
    });

    builder.addCase(deleteMessageThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loader = false;
      state.success = true;
      const message = action.payload?.deletedMessage;
      state.messages = state.messages.filter((msg) => msg._id !== message._id);

      console.log(state.messages);
      //  console.log("payload: ",action?.payload);
      toast.success(action.payload?.message);
    });

    builder.addCase(deleteMessageThunk.rejected, (state, action) => {
      console.log("rejected");
      state.loader = false;
      toast.error(action.payload); // comment this when in production
    });

    // code for editing messages...
    builder.addCase(editMessageThunk.pending, (state, action) => {
      //  console.log("pending");
      state.loader = true;
      state.success = false;
    });

    builder.addCase(editMessageThunk.fulfilled, (state, action) => {
      console.log("fullfilled");
      state.loader = false;
      state.success = true;
      const updatedMessage = action?.payload?.updatedMessage;
      state.messages = state.messages.map(message=>message._id === updatedMessage._id ?
        {...message, message:updatedMessage.message} : message
      );
      //  console.log(action?.payload);
    });

    builder.addCase(editMessageThunk.rejected, (state, action) => {
      console.log("rejected");
      state.loader = false;
      toast.error(action.payload); // comment this when in production
    });
  },
});

export const { setSuccess, appendMessage, setMuteMessage } = messageSlice.actions;
export default messageSlice.reducer;
