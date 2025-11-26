import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
// import { data } from "react-router";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckngAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  socket: null,
  onlineUsers: [],


  //Check if user is authenticated
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in authCheck:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },


  //signIn method
  signup: async (data) => {
    set({ isSigningUp: true })
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully!")
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isSigningUp: false });
    }
  },


  //login method
  login: async (data) => {
    set({ isLoggingIn: true })
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully")
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isLoggingIn: false });
    }
  },



  //logout method
  logout: async () => {

    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully")
      get().disconnectSocket();
    } catch (error) {
      toast.error("error logging out");
      console.log("logout error:", error);
    }
  },



  //UpdateProfile
  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("profile updated successfully");
    } catch (error) {
      console.log("Error in update profile:", error);
      toast.error(error.response.data.message);
    }
  },



  //connect socket
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return

    const socket = io(BASE_URL, {
      withCredentials: true  // this ensures cookies are sent with requests
    })

    socket.connect();
    set({ socket })

    //listen for online users event
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },


  //disconnect socket
  disconnectSocket: () => {
    const { socket } = get();
    if (!socket?.connected) return
    socket.disconnect();
    set({ socket: null, onlineUsers: [] })
  },


}));