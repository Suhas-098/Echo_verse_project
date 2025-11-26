import { Server } from "socket.io";
import { ENV } from "./env.js";
import express from "express";
import http from "http";
import { socketAuthMiddleware } from "../middlerware/socket.auth.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ENV.CLIENT_URL,
        credentials: true,
    },
});

//apply auth middleware to all socket connections
io.use(socketAuthMiddleware);

//this is for storing all online users
const userSocketMap = {};//{userId:socketId}

io.on("connection", (socket) => {  //when a user connects
    console.log("A user connected", socket.user.FullName)//log user name

    const userId = socket.userId //get user id from socket
    userSocketMap[userId] = socket.id //store user id and socket id in map

    io.emit("getOnlineUsers", Object.keys(userSocketMap)); //emit updated list of online users

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.user.FullName);
        delete userSocketMap[userId]; //remove user from socket map
        io.emit("getOnlineUsers", Object.keys(userSocketMap)); //emit updated list of online users
    });

});

export { io, app, server };