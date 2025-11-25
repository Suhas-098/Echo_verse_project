import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthstore";
import { useChatStore } from "../store/useChatStore";
import ChatsHeader from "./ChatsHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessagesInput from "./MessagesInput";
import MessageLoadingSkeleton from "./MessageLoadingSkeleton";

function ChatContainer() {

  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading } = useChatStore()
  const { authUser } = useAuthStore()

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
  }, [selectedUser, getMessagesByUserId]);


  return (
    <>
      <ChatsHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8 custom-scrollbar">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              >
                <div
                  className={`chat-bubble relative shadow-lg ${msg.senderId === authUser._id
                      ? "bg-gradient-to-br from-primary to-secondary text-white rounded-br-none"
                      : "bg-surface/80 backdrop-blur-sm text-slate-200 border border-white/5 rounded-bl-none"
                    }`}
                >
                  {msg.image && (
                    <img src={msg.image} alt="Shared" className="rounded-lg h-48 object-cover mb-2 border border-white/10" />
                  )}
                  {msg.text && <p className="leading-relaxed">{msg.text}</p>}
                  <p className={`text-[10px] mt-1 flex items-center gap-1 ${msg.senderId === authUser._id ? "text-white/70" : "text-slate-400"
                    }`}>
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {/* 👇 scroll target */}
            {/* <div ref={messageEndRef} /> */}
          </div>
        ) : isMessagesLoading ? (
          <MessageLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.FullName} />
        )}
      </div>

      <MessagesInput />
    </>
  );
}

export default ChatContainer;