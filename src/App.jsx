// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AboutUsPage from './Pages/AboutUsPage';
import PostAdPage from './Pages/PostAdPage';
import AdminLogin from './Pages/AdminLogin';
import AdminPanel from './Pages/AdminPanel';
import Contact from './Pages/Contact';

function App() {
  return (
    <Router>
      <main className="antialiased text-slate-900">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/post-ad" element={<PostAdPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/panel" element={<AdminPanel />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
