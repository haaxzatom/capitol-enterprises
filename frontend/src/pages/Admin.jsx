import React, { useEffect, useState } from 'react'
import API, { setToken } from '../api'

export default function Admin({ user }) {
  const [messages, setMessages] = useState([])
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '', sizes: '' })
  const [imageFile, setImageFile] = useState(null)
  const [showMessages, setShowMessages] = useState(false)

  useEffect(() => {
    if (!user) return
    setToken(user.token)
    API.get('/messages').then(r => setMessages(r.data))
  }, [user])

  async function addProduct(e) {
    e.preventDefault()
    if (!form.name || !form.price) return alert('Name and price required')
    let imageUrl = form.image
    if (imageFile) {
      try {
        const fd = new FormData()
        fd.append('image', imageFile)
        const up = await API.post('/upload', fd)
        imageUrl = up.data.url
      } catch (err) {
        return alert('Upload failed: ' + (err.response?.data?.error || err.message))
      }
    }
    try {
      const payload = { ...form, price: parseFloat(form.price), sizes: form.sizes.split(',').map(s => s.trim()).filter(s => s), image: imageUrl }
      await API.post('/products', payload)
      setForm({ name: '', description: '', price: '', image: '', sizes: '' })
      setImageFile(null)
      alert('Product added successfully!')
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message))
    }
  }

  if (!user || user.role !== 'admin') return <p>Admin access required.</p>

  return (
    <div>
      <section className="card">
        <h2>Add New Product</h2>
        <form onSubmit={addProduct}>
          <label>Name *</label>
          <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <label>Description</label>
          <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <label>Price (₹) *</label>
          <input required type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          <label>Image URL</label>
          <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
          <label>Or upload image</label>
          <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} />
          <label>Sizes (comma separated)</label>
          <input value={form.sizes} onChange={e => setForm({ ...form, sizes: e.target.value })} />
          <button type="submit">Add Product</button>
        </form>
      </section>

      <section className="card">
        <h2>Messages & Support</h2>
        <button onClick={() => setShowMessages(!showMessages)}>
          {showMessages ? 'Hide Messages' : 'Show Messages'}
        </button>
        {showMessages && (
          <div style={{marginTop:16}}>
            {messages.length === 0 ? (
              <p style={{color:'#666'}}>No messages yet</p>
            ) : (
              messages.map(m => (
                <div key={m.id} style={{border:'1px solid #ddd',padding:12,marginBottom:8,borderRadius:6}}>
                  <p><strong>From:</strong> {m.from || m.sender}</p>
                  <p><strong>Product ID:</strong> {m.productId}</p>
                  <p>{m.text}</p>
                  <p><strong>Reply:</strong> {m.reply || '—'}</p>
                  <button onClick={() => {
                    const reply = prompt('Your reply')
                    if (!reply) return
                    API.post(`/messages/${m.id}/reply`, { reply }).then(() => {
                      API.get('/messages').then(r => setMessages(r.data))
                    })
                  }}>Reply</button>
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </div>
  )
}
