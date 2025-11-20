import { create } from "zustand";
import toast from "react-hot-toast";
import {axiosInstance} from "../lib/axios";


export const useChatStore=create((set,get)=>({
allContacts:[],
chats:[],
messages:[],
activeTab:"chats",
selectedUser:null,
isUserLoading:false,
isMessagesLoading:false,
isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

toggleSound:()=>{
localStorage.setItem("isSoundEnabled",!get().isSoundEnabled)
set({isSoundEnabled:!get().isSoundEnabled})
},



setActiveTab:(tab)=>set({activeTab:tab}),
setSelectedUser:(selectedUser)=>set({selectedUser}),



getAllContacts:async()=>{
 set({isUserLoading:true})
    try{
        const res = await axiosInstance.get("/messages/contacts",data);
        set({allContacts:res.data});
       }catch(error){
       toast.error(error.response.data.message)
    }finally{
        set({isUserLoading:false});
    }
},


getChatPartners:async()=>{
     set({isUserLoading:true})
    try{
        const res = await axiosInstance.get("/messages/chats",data);
        set({chats:res.data});
       }catch(error){
       toast.error(error.response.data.message)
    }finally{
        set({isUserLoading:false});
    }
},


}))