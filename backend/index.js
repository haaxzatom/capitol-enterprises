const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const fs = require('fs')
const multer = require('multer')

const db = require('./db')

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Simple mock auth: admin/adminpass => admin role
function authenticate(req, res, next) {
  const auth = req.headers['authorization'] || '';
  if (auth === 'Bearer admintoken') {
    req.user = { role: 'admin' };
  } else if (auth === 'Bearer customertoken') {
    req.user = { role: 'customer' };
  }
  next();
}

app.use(authenticate);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Capitol Enterprises API server running', version: '1.0' });
});

// init DB and upload dir
const UPLOAD_DIR = path.join(__dirname, 'uploads')
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR)
const storage = multer.diskStorage({ destination: UPLOAD_DIR, filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname) })
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) cb(null, true)
  else cb(new Error('Only image files allowed'), false)
}
const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } })

db.init().catch(err => console.error('DB init failed', err))
app.use('/uploads', express.static(UPLOAD_DIR))

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'adminpass') {
    return res.json({ token: 'admintoken', role: 'admin' });
  }
  // any other user is treated as customer for demo
  return res.json({ token: 'customertoken', role: 'customer' });
});

app.get('/api/products', async (req, res) => {
  const rows = await db.all('SELECT * FROM products')
  const mapped = rows.map(r => ({ ...r, sizes: r.sizes ? r.sizes.split(',') : [] }))
  res.json(mapped)
})

app.post('/api/products', async (req, res) => {
  if (!req.user || req.user.role !== 'admin') return res.status(403).json({ error: 'forbidden' })
  const { name, description, price, image, sizes } = req.body
  const sizesStr = Array.isArray(sizes) ? sizes.join(',') : (sizes || '')
  const result = await db.run('INSERT INTO products (name,description,price,image,sizes) VALUES (?,?,?,?,?)', [name, description, price, image, sizesStr])
  const id = result.lastID
  res.status(201).json({ id, name, description, price, image, sizes: sizesStr.split(',') })
})

app.put('/api/products/:id', async (req, res) => {
  if (!req.user || req.user.role !== 'admin') return res.status(403).json({ error: 'forbidden' })
  const id = parseInt(req.params.id, 10)
  const { name, description, price, image, sizes } = req.body
  const sizesStr = Array.isArray(sizes) ? sizes.join(',') : (sizes || '')
  await db.run('UPDATE products SET name=?, description=?, price=?, image=?, sizes=? WHERE id=?', [name, description, price, image, sizesStr, id])
  res.json({ id, name, description, price, image, sizes: sizesStr.split(',') })
})

app.delete('/api/products/:id', async (req, res) => {
  if (!req.user || req.user.role !== 'admin') return res.status(403).json({ error: 'forbidden' })
  const id = parseInt(req.params.id, 10)
  await db.run('DELETE FROM products WHERE id=?', [id])
  res.json({ ok: true })
})

app.get('/api/messages', async (req, res) => {
  if (req.user && req.user.role === 'admin') {
    const rows = await db.all('SELECT * FROM messages')
    return res.json(rows)
  }
  const email = req.query.email
  if (!email) return res.status(400).json([])
  const rows = await db.all('SELECT * FROM messages WHERE sender = ?', [email])
  res.json(rows)
})

app.post('/api/messages', async (req, res) => {
  const { productId, from, text } = req.body
  const result = await db.run('INSERT INTO messages (productId,sender,text) VALUES (?,?,?)', [productId, from, text])
  res.status(201).json({ id: result.lastID, productId, from, text })
})

app.post('/api/messages/:id/reply', async (req, res) => {
  if (!req.user || req.user.role !== 'admin') return res.status(403).json({ error: 'forbidden' })
  const id = parseInt(req.params.id, 10)
  await db.run('UPDATE messages SET reply = ? WHERE id = ?', [req.body.reply, id])
  const rows = await db.all('SELECT * FROM messages WHERE id = ?', [id])
  res.json(rows[0])
})

app.post('/api/orders', async (req, res) => {
  const { productId, quantity, size, customer, email, notes } = req.body
  if (!productId || !quantity || !customer || !email) return res.status(400).json({ error: 'missing fields' })
  const result = await db.run('INSERT INTO orders (productId,quantity,size,customer,email,notes) VALUES (?,?,?,?,?,?)', [productId, quantity, size, customer, email, notes])
  res.status(201).json({ id: result.lastID, productId, quantity, size, customer, email, notes })
})

app.get('/api/orders', async (req, res) => {
  if (!req.user || req.user.role !== 'admin') return res.status(403).json({ error: 'forbidden' })
  const rows = await db.all('SELECT * FROM orders')
  res.json(rows)
})

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.user || req.user.role !== 'admin') return res.status(403).json({ error: 'forbidden' })
  if (!req.file) return res.status(400).json({ error: 'no file provided' })
  const filename = path.basename(req.file.path)
  const url = `http://localhost:4000/uploads/${filename}`
  console.log(`Uploaded: ${url}`)
  res.json({ url })
})


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API server listening on ${PORT}`));
