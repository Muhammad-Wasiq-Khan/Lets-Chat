import React from 'react'
import { useAuthStore } from '../Store/useAuthStore'

function ChatPage() {
  const { logout } = useAuthStore()
  return (
    <div className='z-10'>
      <button onClick={logout} className='btn'>Logout</button>
      <h1>Chatapp</h1>
    </div>
  )
}

export default ChatPage
