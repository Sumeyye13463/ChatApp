import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login/Login.jsx'
import Chat from './Pages/Chat/Chat.jsx'
import ProfileUpdate from './Pages/ProfileUpdate/ProfileUpdate.jsx'
const App = () => {
  return (
    <>
     <Routes>
        <Route path="/" element={<Login />} />
         <Route path="/chat" element={<Chat />}/>
         <Route path="/profile" element={<ProfileUpdate />}/>
      </Routes> 
    </>
  )
}

export default App
