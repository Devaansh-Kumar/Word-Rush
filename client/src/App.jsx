import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Wordle from './components/Game/Wordle'
import InviteLink from './components/Button/InviteLink'
import Home from './pages/Home'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/invite" element={<InviteLink />} />
        <Route path="/game" element={<Wordle />} />
      </Routes>
    </>
  )
}

export default App
