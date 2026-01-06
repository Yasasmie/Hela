import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, PlusCircle, Trash2, Edit3, 
  LogOut, Package, DollarSign, CheckCircle2, 
  AlertCircle, XCircle 
} from 'lucide-react';

// Replace 'localhost' with your PC's IP address (e.g., 192.168.1.10) to work on mobile
const API_BASE_URL = 'http://localhost:5000/api/packages';

const AdminPanel = () => {
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState({ id: null, name: '', price: '', featuresText: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadPackages = async () => {
    try {
      const res = await axios.get(API_BASE_URL);
      setPackages(res.data);
    } catch (err) {
      setError('Failed to load packages. Ensure backend is running.');
    }
  };

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      navigate('/admin');
      return;
    }
    loadPackages();
  }, [navigate]);

  const resetForm = () => {
    setForm({ id: null, name: '', price: '', featuresText: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const features = form.featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    try {
      if (form.id) {
        await axios.put(`${API_BASE_URL}/${form.id}`, {
          name: form.name,
          price: form.price,
          features,
        });
      } else {
        await axios.post(API_BASE_URL, {
          name: form.name,
          price: form.price,
          features,
        });
      }
      await loadPackages();
      resetForm();
    } catch (err) {
      setError('Save failed. Check network connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pkg) => {
    setForm({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      featuresText: pkg.features.join('\n'),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this package?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      await loadPackages();
    } catch (err) {
      setError('Delete failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-slate-950/50 border-r border-slate-800 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-10 px-2">
          <span className="text-2xl font-bold text-amber-500">හෙළ</span>
          <span className="text-sm font-bold tracking-tighter text-slate-400">ADMIN</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-lg shadow-amber-900/10">
            <LayoutDashboard size={20} />
            <span className="font-semibold">Packages</span>
          </button>
        </nav>

        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all mt-auto">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight">Manage Packages</h1>
            <p className="text-slate-500">Create and update your advertising service tiers</p>
          </header>

          {error && (
            <div className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl">
              <AlertCircle size={20} />
              {error}
            </div>
          )}

          <section className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl shadow-xl mb-10 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6">
              <PlusCircle className="text-amber-500" size={24} />
              <h2 className="text-xl font-bold text-white">{form.id ? 'Edit Package' : 'Create New Package'}</h2>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 ml-1">Package Name</label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:ring-2 focus:ring-amber-500/50 outline-none text-white"
                    placeholder="e.g., Basic"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 ml-1">Price (LKR)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input
                    type="number"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:ring-2 focus:ring-amber-500/50 outline-none text-white"
                    placeholder="5000"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-slate-400 ml-1">Features (One per line)</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:ring-2 focus:ring-amber-500/50 outline-none text-white resize-none"
                  value={form.featuresText}
                  onChange={(e) => setForm({ ...form, featuresText: e.target.value })}
                  required
                />
              </div>

              <div className="md:col-span-2 flex items-center gap-4">
                <button type="submit" disabled={loading} className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-3.5 rounded-xl transition-all disabled:opacity-50">
                  {loading ? 'Processing...' : form.id ? 'Update Package' : 'Publish Package'}
                </button>
                {form.id && (
                  <button type="button" onClick={resetForm} className="px-6 py-3.5 rounded-xl border border-slate-700 text-slate-300">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <CheckCircle2 className="text-green-500" size={24} />
              Current Active Offerings
            </h2>
            <div className="grid gap-4">
              {packages.map((pkg) => (
                <div key={pkg.id} className="flex flex-col md:flex-row md:items-center justify-between bg-slate-900/40 border border-slate-800/50 p-6 rounded-2xl hover:border-amber-500/30 transition-all">
                  <div>
                    <h3 className="text-lg font-bold text-white">{pkg.name}</h3>
                    <p className="text-amber-500 font-semibold text-sm">Rs. {Number(pkg.price).toLocaleString()} / month</p>
                    <div className="flex flex-wrap gap-x-3 mt-2">
                      {pkg.features.map((feat, idx) => (
                        <span key={idx} className="text-xs text-slate-500 flex items-center gap-1">
                          <CheckCircle2 size={12} /> {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4 md:mt-0">
                    <button onClick={() => handleEdit(pkg)} className="p-3 bg-slate-800 hover:text-blue-400 rounded-xl"><Edit3 size={18} /></button>
                    <button onClick={() => handleDelete(pkg.id)} className="p-3 bg-slate-800 hover:text-red-400 rounded-xl"><Trash2 size={18} /></button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;