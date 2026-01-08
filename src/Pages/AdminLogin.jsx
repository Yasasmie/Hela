import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
// CHANGE THIS LINE ONLY in handleSubmit:
const res = await axios.post('/admin/login', {  // Relative path works everywhere
  username,
  password,
});

      if (res.data.success) {
        localStorage.setItem('isAdmin', 'true');
        navigate('/admin/panel');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#020617] overflow-hidden font-sans">
      
      {/* Animated Background Elements (Simulating the screenshot) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20 animate-pulse"
            style={{
              width: Math.random() * 4 + 'px',
              height: Math.random() * 4 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDuration: Math.random() * 3 + 2 + 's',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo Section mimicking the screenshot */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-5xl font-bold text-[#f59e0b] drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
              හෙළ
            </span>
            <span className="text-3xl font-extrabold text-[#f97316] italic tracking-tight">
              Advertising
            </span>
          </div>
          <p className="text-slate-400 text-sm uppercase tracking-widest font-medium">
            Admin Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 p-8 rounded-3xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm justify-center">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-1.5 ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/50 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-medium mb-1.5 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/50 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-bold py-3.5 rounded-xl shadow-lg shadow-orange-900/20 transform transition-active active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Authenticating...' : 'Access Admin Panel'}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-slate-500 text-xs">
          © 2025 Hela Advertising Hub. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;