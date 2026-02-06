import { createSlice } from "@reduxjs/toolkit";
import {io} from "socket.io-client";

const initialState = {
     socket: null,
     onlineUsers: [],

};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    initializeSocket: (state, action) => {
     const socket = io(import.meta.env.VITE_SERVER_URL, {
          query:{userId:action.payload}
     })
     state.socket = socket;                       // Store the socket in socket state.
    },

    setOnlineUsers: (state, action)=>{
     console.log("online users: ", action.payload);
     state.onlineUsers = action.payload;
    }
  },
});

export const { initializeSocket, setOnlineUsers } = socketSlice.actions;
export default socketSlice.reducer;
