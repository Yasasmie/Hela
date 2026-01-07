const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// ----- In-Memory Database -----
let packages = [
  { id: 1, name: 'Basic', price: '5,000', features: ['Facebook & TikTok', '2 Videos & 2 Posts'] },
  { id: 2, name: 'Standard', price: '12,000', features: ['Facebook & TikTok', '4 Videos & 4 Posts', 'FB Ad Boosting'] }
];

let ads = [
  { id: 1, category: 'vehicles', title: 'Toyota Aqua 2014', price: '8,500,000', location: 'Colombo', date: '2024-05-20' },
  { id: 2, category: 'electronics', title: 'iPhone 15 Pro', price: '320,000', location: 'Kandy', date: '2024-05-21' }
];

// ----- Admin Auth -----
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') return res.json({ success: true });
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// ----- Packages Routes -----
app.get('/api/packages', (req, res) => res.json(packages));

app.post('/api/packages', (req, res) => {
  const newPkg = { id: Date.now(), ...req.body };
  packages.push(newPkg);
  res.status(201).json(newPkg);
});

app.put('/api/packages/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = packages.findIndex(p => p.id === id);
  if (index !== -1) {
    packages[index] = { ...packages[index], ...req.body, id };
    return res.json(packages[index]);
  }
  res.status(404).json({ message: "Package not found" });
});

app.delete('/api/packages/:id', (req, res) => {
  packages = packages.filter(p => p.id !== Number(req.params.id));
  res.json({ success: true });
});

// ----- Ads Routes -----
app.get('/api/ads', (req, res) => res.json(ads));

app.post('/api/ads', (req, res) => {
  const newAd = { id: Date.now(), ...req.body, date: new Date().toISOString().split('T')[0] };
  ads.push(newAd);
  res.status(201).json(newAd);
});

app.put('/api/ads/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = ads.findIndex(a => a.id === id);
  if (index !== -1) {
    ads[index] = { ...ads[index], ...req.body, id };
    return res.json(ads[index]);
  }
  res.status(404).json({ message: "Ad not found" });
});

app.delete('/api/ads/:id', (req, res) => {
  ads = ads.filter(ad => ad.id !== Number(req.params.id));
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));