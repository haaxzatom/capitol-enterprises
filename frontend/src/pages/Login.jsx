import React, { useState } from 'react'
import API, { setToken } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function submit(e) {
    e.preventDefault()
    const res = await API.post('/auth/login', { username, password })
    const { token, role } = res.data
    localStorage.setItem('capitol_token', token)
    localStorage.setItem('capitol_role', role)
    setToken(token)
    onLogin({ token, role })
    navigate('/')
  }

  return (
    <form className="card" onSubmit={submit}>
      <h2>Login</h2>
      <label>Username</label>
      <input value={username} onChange={e => setUsername(e.target.value)} />
      <label>Password</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Login</button>
      <p>Use <strong>admin/adminpass</strong> for Admin access.</p>
    </form>
  )
}
