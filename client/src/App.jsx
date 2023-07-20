import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Wordle from './components/Game/Wordle'
import PrivateRoute from './utils/PrivateRoute'
import InviteLink from './components/Button/InviteLink'

function App () {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/invite" element={<InviteLink />} />
        <Route path="/game" element={<Wordle />}/>
      </Routes>
    </>
  )
}

export default App
