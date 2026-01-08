const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// CORS for Vercel + local
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-hela-app.vercel.app'  // Replace with your Vercel URL
    : 'http://localhost:5173'  // Vite default
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

// In-Memory Database
let packages = [
  { id: 1, name: 'Basic', price: '5,000', features: ['Facebook & TikTok', '2 Videos & 2 Posts'] },
  { id: 2, name: 'Standard', price: '12,000', features: ['Facebook & TikTok', '4 Videos & 4 Posts', 'FB Ad Boosting'] }
];

let ads = [
  { id: 1, category: 'vehicles', title: 'Toyota Aqua 2014', price: '8,500,000', location: 'Colombo', date: '2024-05-20', image: null }
];

// Admin Auth
app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    return res.json({ success: true });
  }
  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// Packages Routes
app.get('/packages', (req, res) => res.json(packages));

app.post('/packages', (req, res) => {
  const newPkg = { id: Date.now(), ...req.body };
  packages.push(newPkg);
  res.status(201).json(newPkg);
});

app.put('/packages/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = packages.findIndex(p => p.id === id);
  if (index !== -1) {
    packages[index] = { ...packages[index], ...req.body, id };
    return res.json(packages[index]);
  }
  res.status(404).json({ message: "Package not found" });
});

app.delete('/packages/:id', (req, res) => {
  packages = packages.filter(p => p.id !== Number(req.params.id));
  res.json({ success: true });
});

// Ads Routes
app.get('/ads', (req, res) => res.json(ads));

app.post('/ads', (req, res) => {
  try {
    const newAd = { 
      id: Date.now(), 
      ...req.body, 
      date: new Date().toISOString().split('T')[0] 
    };
    ads.push(newAd);
    res.status(201).json(newAd);
  } catch (error) {
    res.status(500).json({ message: "Server error saving ad" });
  }
});

app.put('/ads/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = ads.findIndex(a => a.id === id);
  if (index !== -1) {
    ads[index] = { ...ads[index], ...req.body, id };
    return res.json(ads[index]);
  }
  res.status(404).json({ message: "Ad not found" });
});

app.delete('/ads/:id', (req, res) => {
  ads = ads.filter(ad => ad.id !== Number(req.params.id));
  res.json({ success: true });
});

module.exports = app;  // Vercel serverless export [web:14]
