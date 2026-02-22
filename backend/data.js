// In-memory mock data for products and messages
const products = [
  {
    id: 1,
    name: 'Hex Bolt (M8 x 40)',
    description: 'High-strength hex bolt, zinc-plated.',
    price: 0.5,
    image: 'https://images.unsplash.com/photo-1581091215367-6f3c8a7b8a6b?w=800&h=600&fit=crop',
    sizes: ['M6','M8','M10']
  },
  {
    id: 2,
    name: 'Concrete Anchor (12mm)',
    description: 'Reliable concrete anchor for heavy fixtures.',
    price: 1.2,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
    sizes: ['12mm','16mm']
  },
  {
    id: 3,
    name: 'Galvanized Steel Pipe (2m)',
    description: 'Durable pipe for water and structural use.',
    price: 15.0,
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=800&h=600&fit=crop',
    sizes: ['1m','2m','3m']
  }
];

const messages = [
  // Example message
  {
    id: 1,
    productId: 1,
    from: 'customer1@example.com',
    text: 'Do you have this in stainless steel?',
    reply: 'We can source stainless on request. Contact admin.'
  }
];

const orders = [
  // Example order
  {
    id: 1,
    productId: 2,
    quantity: 10,
    size: '12mm',
    customer: 'Customer One',
    email: 'cust@example.com',
    notes: 'Require delivery next week'
  }
];

module.exports = { products, messages, orders };


