// Backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Simple in‑memory "DB"
let packages = [
  {
    id: 1,
    name: 'Basic',
    price: '5,000',
    features: ['Facebook & TikTok', '2 Videos & 2 Posts', 'Comments Reply', 'Messenger & TikTok Reply']
  },
  {
    id: 2,
    name: 'Standard',
    price: '12,000',
    features: ['Facebook & TikTok', '4 Videos & 4 Posts', 'FB Ad Boosting', 'Comments Reply', 'FB & TikTok Reply']
  },
  {
    id: 3,
    name: 'Premium',
    price: '22,000',
    features: ['Facebook & TikTok', '5 Videos & 5 Posts', 'FB Ad Boosting', 'Influencer Marketing', 'Comments Reply', 'FB & TikTok Reply']
  },
  {
    id: 4,
    name: 'Ultimate',
    price: '32,000',
    features: ['6 Videos & 6 Posts', 'Web Shop Included', 'Influencer Marketing', 'FB Ad Boosting', 'Comments Reply', 'FB & TikTok Reply']
  }
];

app.use(cors());
app.use(bodyParser.json());

// ----- very simple admin "auth" (dummy) -----
// username: admin, password: admin123
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    // in real app return JWT here
    return res.json({ success: true });
  }
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// ----- packages CRUD -----

// Get all packages
app.get('/api/packages', (req, res) => {
  res.json(packages);
});

// Add package
app.post('/api/packages', (req, res) => {
  const { name, price, features } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required' });
  }
  const newPkg = {
    id: Date.now(),
    name,
    price,
    features: features || []
  };
  packages.push(newPkg);
  res.status(201).json(newPkg);
});

// Update package
app.put('/api/packages/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name, price, features } = req.body;

  const index = packages.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Package not found' });
  }

  packages[index] = {
    ...packages[index],
    name: name ?? packages[index].name,
    price: price ?? packages[index].price,
    features: features ?? packages[index].features
  };

  res.json(packages[index]);
});

// Delete package
app.delete('/api/packages/:id', (req, res) => {
  const id = Number(req.params.id);
  const exists = packages.some(p => p.id === id);
  if (!exists) return res.status(404).json({ message: 'Package not found' });

  packages = packages.filter(p => p.id !== id);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
