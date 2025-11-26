import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthstore";

function ChatsList() {

  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } = useChatStore();
  // const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading)
    return <UsersLoadingSkeleton />;
  if (chats.length === 0)
    return <NoChatsFound />

  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="group p-3 rounded-xl cursor-pointer hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/5"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-4">
            <div className={`avatar online relative`}>
              {/* ${onlineUsers.includes(chat._id) ? "online" : "offline"} willl be adding this when we use socket IO */}
              <div className="size-12 rounded-full ring-2 ring-transparent group-hover:ring-primary/50 transition-all duration-300">
                <img src={chat.Profilepic || "/avatar.png"} alt={chat.FullName} className="object-cover" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-slate-200 font-medium truncate group-hover:text-primary transition-colors">{chat.FullName}</h4>
              <p className="text-xs text-slate-500 truncate group-hover:text-slate-400">Click to chat</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ChatsList;