const path = require('path')
const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()

const DB_PATH = path.join(__dirname, 'data.sqlite')
const exists = fs.existsSync(DB_PATH)
const db = new sqlite3.Database(DB_PATH)

function run(sql, params=[]) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) { if (err) reject(err); else resolve(this); })
  })
}

function all(sql, params=[]) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => { if (err) reject(err); else resolve(rows) })
  })
}

async function init() {
  // create tables if missing
  await run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price REAL,
    image TEXT,
    sizes TEXT
  )`)

  await run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productId INTEGER,
    sender TEXT,
    text TEXT,
    reply TEXT
  )`)

  await run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productId INTEGER,
    quantity INTEGER,
    size TEXT,
    customer TEXT,
    email TEXT,
    notes TEXT
  )`)

  // seed products if empty
  const rows = await all('SELECT COUNT(*) as c FROM products')
  if (rows[0].c === 0) {
    const seeds = [
      ['Hex Bolt (M8 x 40)', 'High-strength hex bolt, zinc-plated.', 0.5, 'https://images.unsplash.com/photo-1581091215367-6f3c8a7b8a6b?w=800&h=600&fit=crop', 'M6,M8,M10'],
      ['Concrete Anchor (12mm)', 'Reliable concrete anchor for heavy fixtures.', 1.2, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop', '12mm,16mm'],
      ['Galvanized Steel Pipe (2m)', 'Durable pipe for water and structural use.', 15.0, 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800&h=600&fit=crop', '1m,2m,3m']
    ]
    for (const s of seeds) await run('INSERT INTO products (name,description,price,image,sizes) VALUES (?,?,?,?,?)', s)
  }
}

module.exports = { init, run, all }
