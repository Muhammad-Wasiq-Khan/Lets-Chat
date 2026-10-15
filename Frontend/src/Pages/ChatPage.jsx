import React from 'react'
// import { useAuthStore } from '../Store/useAuthStore'
import { useChatStore } from '../Store/useChatStore'

import  ActiveTabSwitch  from "../Components/ActiveTabSwitch";
import  ProfileHeader  from "../Components/ProfileHeader";
import  ChatsList  from "../Components/ChatsList";
import  ContactsList  from "../Components/ContactsList";
import  NoConversationPlaceholder  from "../Components/NoConversationPlaceholder";
import  ChatContainer  from "../Components/ChatContainer";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore()
  return (
    <div>
      <div className='relative w-full max-w-6xl '>
        <div className='w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col'>
          <ProfileHeader />
          <ActiveTabSwitch />

          <div className='flex-1 overflow-y-auto p-4 space-y-2'>
            {activeTab === "chat" ? <ChatsList /> : <ContactsList />}
          </div>
        </div>
      </div>
      <div className='flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm'>
        {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
      </div>
    </div>
  )
}

export default ChatPage
