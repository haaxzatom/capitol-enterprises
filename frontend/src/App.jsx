import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Login from './pages/Login'
import Products from './pages/Products'
import Admin from './pages/Admin'
import { setToken } from './api'

function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const t = localStorage.getItem('capitol_token')
    const r = localStorage.getItem('capitol_role')
    if (t) setUser({ token: t, role: r })
  }, [])

  useEffect(() => {
    if (user && user.token) setToken(user.token)
  }, [user])

  function logout() {
    localStorage.removeItem('capitol_token')
    localStorage.removeItem('capitol_role')
    setUser(null)
    navigate('/')
  }

  return (
    <div className="container">
      <header>
        <h1>Capitol Enterprises</h1>
        <nav>
          <Link to="/">Products</Link>
          {user && user.role === 'admin' && <Link to="/admin">Admin</Link>}
          {!user ? <Link to="/login">Login</Link> : <button onClick={logout}>Logout</button>}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/admin" element={<Admin user={user} />} />
          <Route path="/" element={<Products user={user} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
