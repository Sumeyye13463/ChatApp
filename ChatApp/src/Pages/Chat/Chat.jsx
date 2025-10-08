import React from 'react'
import "./Chat.css"
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar'
import RightSidebar from '../../Components/RightSidebar/RightSidebar'
import ChatBox from '../../Components/ChatBox/ChatBox'

const Chat = () => {
  return (
    <div className='chat'>
     <div className="chat-container">
      <LeftSideBar />
      <ChatBox />
      <RightSidebar />
     </div>
    </div>
  )
}

export default Chat
