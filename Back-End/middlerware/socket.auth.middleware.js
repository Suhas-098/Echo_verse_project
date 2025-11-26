import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import User from "../models/user.js";


export const socketAuthMiddleware = async (socket, next) => {
    try {
        //extract token from cookie
        const token = socket.handshake.headers.cookie
            ?.split("; ")
            .find((row) => row.startsWith("jwt="))
            ?.split("=")[1];

        if (!token) {
            console.log("socket connection rejected: NO token provided");
            return next(new Error("Unauthorized--no token provided"));
        }

        //verify token
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        if (!decoded) {
            console.log("socket connection rejected: Invalid token");
            return next(new Error("Unauthorized--Invalid token"));
        }

        //find user from db
        const user = await User.findById(decoded.userId).select("-Password");
        if (!user) {
            console.log("socket connection rejected: User not found");
            return next(new Error("Unauthorized--User not found"));
        }

        //attach user to socket
        socket.user = user;
        socket.userId = user._id.toString();

        console.log(`socket connection accepted for user: ${user.FullName}(${user._id})`);
        next();
    } catch (error) {
        console.log("socket connection rejected: Error verifying token", error.message);
        next(new Error("Unauthorized--Error verifying token"));
    }
};