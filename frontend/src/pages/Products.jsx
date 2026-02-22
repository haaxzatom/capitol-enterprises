import React, { useEffect, useState } from 'react'
import API, { setToken } from '../api'

export default function Products({ user }) {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [sizeFilter, setSizeFilter] = useState('')
  const [email, setEmail] = useState('')
  const [ordering, setOrdering] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [editImage, setEditImage] = useState(null)

  useEffect(() => {
    if (user && user.token) setToken(user.token)
    API.get('/products').then(r => setProducts(r.data))
  }, [user])

  const sizes = Array.from(new Set(products.flatMap(p => p.sizes || [])))

  const visible = products.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.description.toLowerCase().includes(search.toLowerCase())) return false
    if (sizeFilter && !(p.sizes || []).includes(sizeFilter)) return false
    return true
  })

  async function placeOrder(productId, order) {
    try {
      await API.post('/orders', { productId, ...order })
      alert('Order submitted — admin will contact you')
      setOrdering(null)
    } catch (err) {
      alert(err.response?.data?.error || 'failed')
    }
  }

  function startEdit(product) {
    setEditingId(product.id)
    setEditForm({ name: product.name, description: product.description, price: product.price, image: product.image, sizes: (product.sizes || []).join(',') })
    setEditImage(null)
  }

  function cancelEdit() {
    setEditingId(null)
    setEditForm({})
    setEditImage(null)
  }

  async function saveEdit() {
    if (!editForm.name || !editForm.price) return alert('Name and price required')
    let imageUrl = editForm.image
    if (editImage) {
      try {
        const fd = new FormData()
        fd.append('image', editImage)
        const up = await API.post('/upload', fd)
        imageUrl = up.data.url
      } catch (err) {
        return alert('Upload failed: ' + err.message)
      }
    }
    try {
      await API.put(`/products/${editingId}`, { ...editForm, price: parseFloat(editForm.price), image: imageUrl, sizes: editForm.sizes.split(',').map(s => s.trim()).filter(s => s) })
      const r = await API.get('/products')
      setProducts(r.data)
      cancelEdit()
    } catch (err) {
      alert('Save failed: ' + err.message)
    }
  }

  async function deleteProduct() {
    if (!confirm('Delete this product?')) return
    try {
      await API.delete(`/products/${editingId}`)
      const r = await API.get('/products')
      setProducts(r.data)
      cancelEdit()
    } catch (err) {
      alert('Delete failed: ' + err.message)
    }
  }

  return (
    <div>
      <div style={{display:'flex',gap:12,marginBottom:16}}>
        <input placeholder="Search products" value={search} onChange={e => setSearch(e.target.value)} />
        <select value={sizeFilter} onChange={e => setSizeFilter(e.target.value)}>
          <option value="">All sizes</option>
          {sizes.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {editingId && (
        <section className="card" style={{marginBottom:16}}>
          <h2>Edit Product</h2>
          <form onSubmit={e => { e.preventDefault(); saveEdit() }}>
            <label>Name *</label>
            <input required value={editForm.name || ''} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
            <label>Description</label>
            <input value={editForm.description || ''} onChange={e => setEditForm({ ...editForm, description: e.target.value })} />
            <label>Price (₹) *</label>
            <input required type="number" step="0.01" value={editForm.price || ''} onChange={e => setEditForm({ ...editForm, price: e.target.value })} />
            <label>Image URL</label>
            <input value={editForm.image || ''} onChange={e => setEditForm({ ...editForm, image: e.target.value })} />
            <label>Or upload new image</label>
            <input type="file" accept="image/*" onChange={e => setEditImage(e.target.files?.[0] || null)} />
            <label>Sizes (comma separated)</label>
            <input value={editForm.sizes || ''} onChange={e => setEditForm({ ...editForm, sizes: e.target.value })} />
            <div style={{display:'flex',gap:8,marginTop:12}}>
              <button type="submit">Save Changes</button>
              <button type="button" onClick={cancelEdit}>Cancel</button>
              <button type="button" onClick={deleteProduct} style={{background:'#d9534f'}}>Delete</button>
            </div>
          </form>
        </section>
      )}

      <div className="grid">
        {visible.map(p => (
          <div className="card product" key={p.id}>
            <img src={p.image} alt={p.name} onError={e => e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ccc" width="200" height="200"/%3E%3Ctext x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E'} />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p className="price">₹{p.price}</p>
            <div style={{display:'flex',gap:8,marginTop:8,flexWrap:'wrap'}}>
              <button onClick={() => setOrdering({ product: p, quantity:1, size: (p.sizes||[])[0] || '' })}>Order</button>
              {user && user.role === 'admin' && <button onClick={() => startEdit(p)} style={{background:'#5cb85c'}}>Edit</button>}
            </div>
          </div>
        ))}
      </div>

      {ordering && (
        <div className="card">
          <h3>Order: {ordering.product.name}</h3>
          <label>Your name</label>
          <input value={ordering.customer || ''} onChange={e => setOrdering({ ...ordering, customer: e.target.value })} />
          <label>Your email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <label>Quantity</label>
          <input type="number" min="1" value={ordering.quantity} onChange={e => setOrdering({ ...ordering, quantity: parseInt(e.target.value||1,10) })} />
          <label>Size</label>
          <select value={ordering.size} onChange={e => setOrdering({ ...ordering, size: e.target.value })}>
            {(ordering.product.sizes||[]).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <label>Notes</label>
          <textarea value={ordering.notes || ''} onChange={e => setOrdering({ ...ordering, notes: e.target.value })} />
          <div style={{display:'flex',gap:8,marginTop:8}}>
            <button onClick={() => placeOrder(ordering.product.id, { quantity: ordering.quantity, size: ordering.size, customer: ordering.customer || 'Anonymous', email, notes: ordering.notes })}>Submit Order</button>
            <button onClick={() => setOrdering(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
