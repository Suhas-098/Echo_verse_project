import {create } from "zustand";

export const useAuthStore = create((set)=>({
    authUser: {name:"suhas",_id:123,age:22},
    isLoggedIn: false,
    isLoading: false,

    login: ()=>{
        console.log("we just logged in");
        set({isLoggedIn:true, isLoading:true});
        },
}));