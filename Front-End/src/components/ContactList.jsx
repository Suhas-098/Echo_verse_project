import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore';
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { Contact } from 'lucide-react';

function ContactList() {

  const { getAllContacts, allContacts, isUsersLoading, setSelectedUser } = useChatStore();
  // const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading)
    return <UsersLoadingSkeleton />;


  return (
    <>
      {allContacts.map((Contact) => (
        <div
          key={Contact._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(Contact)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar online`}>
              {/* ${onlineUsers.includes(chat._id) ? "online" : "offline"} willl be adding this when we use socket IO */}
              <div className="size-12 rounded-full">
                <img src={Contact.Profilepic || "/avatar.png"} alt={Contact.FullName} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">{Contact.FullName}</h4>
          </div>
        </div>
      ))}
    </>
  )
}

export default ContactList;