import express from "express";
import { Server } from "socket.io";
import http from "http";
import "dotenv/config";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials:true,
  },
});


// Object to store the active users.
const userSocketMap = {
     // userId: socketId
};


io.on("connection", (socket) => {
  // console.log("Socket Id Connected: ", socket.id);

  const userId = socket.handshake.query.userId;
  // console.log("userid from socket:", userId)

  if(!userId || userId === "undefined") return;

  userSocketMap[userId] = socket.id;
  // console.log(userId, "user connected... with socket ID - ", socket.id)

  // send online users array...
  io.emit("onlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", ()=>{
    // console.log(socket.id, "is disconnected.");
    delete userSocketMap[userId];

    // emit the updated onlineUsers object...
    io.emit("onlineUsers", Object.keys(userSocketMap));
  })

});



export { app, io, server };
