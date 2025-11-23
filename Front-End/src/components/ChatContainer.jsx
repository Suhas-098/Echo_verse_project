import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthstore";
import { useChatStore } from "../store/useChatStore";
import ChatsHeader from "./ChatsHeader";

function ChatContainer() {
  
  const {selectedUser,getMessagesByUserId,messages}=useChatStore()
  const {authUser}=useAuthStore()

 useEffect(()=>{
  getMessagesByUserId(selectedUser._id);
 },[selectedUser,getMessagesByUserId]);


  return (
    <>
    <ChatsHeader />
    
    
    </>
  );
}

export default ChatContainer;