import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, Trash2, Edit3, LogOut, Package, 
  AlertCircle, Megaphone, MapPin, X, Image as ImageIcon, Upload, Loader2
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

const AdminPanel = () => {
  const [view, setView] = useState('packages');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  const [pkgForm, setPkgForm] = useState({ name: '', price: '', featuresText: '' });
  const [adForm, setAdForm] = useState({ category: 'vehicles', title: '', price: '', location: '', image: '' });

  const categories = [
    { name: 'Vehicles', id: 'vehicles' }, { name: 'Property', id: 'property' },
    { name: 'Electronics', id: 'electronics' }, { name: 'Services', id: 'services' },
    { name: 'Animals', id: 'animals' }, { name: 'Education', id: 'education' }
  ];

  const fetchData = async () => {
    setError('');
    try {
      const res = await axios.get(`${API_BASE}/${view}`);
      setData(res.data);
    } catch (err) { setError(`Failed to fetch ${view}`); }
  };

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') navigate('/admin');
    fetchData();
  }, [view, navigate]);

  const resetForms = () => {
    setEditId(null);
    setError('');
    setPkgForm({ name: '', price: '', featuresText: '' });
    setAdForm({ category: 'vehicles', title: '', price: '', location: '', image: '' });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB Limit for the browser side
        setError("Image is too large. Please select a file under 10MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdForm(prev => ({ ...prev, image: reader.result }));
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePkgSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const features = pkgForm.featuresText.split('\n').filter(Boolean);
    try {
      if (editId) await axios.put(`${API_BASE}/packages/${editId}`, { ...pkgForm, features });
      else await axios.post(`${API_BASE}/packages`, { ...pkgForm, features });
      fetchData();
      resetForms();
    } catch (err) { setError('Package save failed'); }
    setLoading(false);
  };

  const handleAdSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (editId) {
        await axios.put(`${API_BASE}/ads/${editId}`, adForm);
      } else {
        await axios.post(`${API_BASE}/ads`, adForm);
      }
      await fetchData();
      resetForms();
    } catch (err) { 
      console.error(err);
      setError(err.response?.data?.message || 'Ad save failed. Image might be too large.'); 
    }
    setLoading(false);
  };

  const startEdit = (item) => {
    setEditId(item.id);
    if (view === 'packages') {
      setPkgForm({ name: item.name, price: item.price, featuresText: item.features.join('\n') });
    } else {
      setAdForm({ category: item.category, title: item.title, price: item.price, location: item.location, image: item.image || '' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Confirm deletion?')) return;
    try {
      await axios.delete(`${API_BASE}/${view}/${id}`);
      fetchData();
    } catch (err) { setError('Delete failed'); }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-slate-950/50 border-r border-slate-800 p-6 flex flex-col">
        <div className="text-2xl font-bold text-amber-500 mb-10">හෙළ <span className="text-white text-xs">ADMIN</span></div>
        <nav className="space-y-2 flex-1">
          <button onClick={() => { setView('packages'); resetForms(); }} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${view === 'packages' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:bg-slate-800'}`}>
            <Package size={20} /> Packages
          </button>
          <button onClick={() => { setView('ads'); resetForms(); }} className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all ${view === 'ads' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:bg-slate-800'}`}>
            <Megaphone size={20} /> Category Ads
          </button>
        </nav>
        <button onClick={() => { localStorage.removeItem('isAdmin'); navigate('/'); }} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl mt-auto">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      <main className="flex-1 p-6 md:p-10">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white capitalize">Manage {view}</h1>
          {error && <p className="text-red-400 mt-2 flex items-center gap-2 bg-red-500/10 p-3 rounded-lg border border-red-500/20"><AlertCircle size={16}/> {error}</p>}
        </header>

        <section className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl mb-12 relative">
          {editId && (
            <button onClick={resetForms} className="absolute top-4 right-4 text-slate-500 hover:text-white flex items-center gap-1 text-xs">
              <X size={14}/> Cancel Edit
            </button>
          )}
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <PlusCircle className="text-amber-500" /> 
            {editId ? `Edit ${view === 'packages' ? 'Package' : 'Ad'}` : `New ${view === 'packages' ? 'Marketing Tier' : 'Advertisement'}`}
          </h2>

          {view === 'packages' ? (
            <form onSubmit={handlePkgSubmit} className="grid md:grid-cols-2 gap-4">
              <input className="bg-slate-950 border border-slate-800 p-3 rounded-xl outline-none focus:border-amber-500" placeholder="Package Name" value={pkgForm.name} onChange={e => setPkgForm({...pkgForm, name: e.target.value})} required />
              <input className="bg-slate-950 border border-slate-800 p-3 rounded-xl outline-none focus:border-amber-500" placeholder="Price (LKR)" type="text" value={pkgForm.price} onChange={e => setPkgForm({...pkgForm, price: e.target.value})} required />
              <textarea className="bg-slate-950 border border-slate-800 p-3 rounded-xl md:col-span-2 outline-none focus:border-amber-500" placeholder="Features (One per line)" rows="3" value={pkgForm.featuresText} onChange={e => setPkgForm({...pkgForm, featuresText: e.target.value})} required />
              <button disabled={loading} className={`${editId ? 'bg-blue-600' : 'bg-amber-500'} text-black font-bold py-3 rounded-xl hover:opacity-90 flex items-center justify-center`}>
                {loading ? <Loader2 className="animate-spin" /> : editId ? 'Update Package' : 'Publish Package'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleAdSubmit} className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-3xl p-6 bg-slate-950/50 hover:border-amber-500/50 transition-colors relative group">
                {adForm.image ? (
                  <div className="relative w-full h-48 flex justify-center">
                    <img src={adForm.image} alt="Preview" className="h-full object-contain rounded-xl" />
                    <button type="button" onClick={() => setAdForm({...adForm, image: ''})} className="absolute top-2 right-2 bg-red-500 p-1 rounded-full text-white"><X size={16}/></button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center w-full">
                    <Upload className="text-slate-500 group-hover:text-amber-500 mb-2" size={32} />
                    <span className="text-slate-400 group-hover:text-slate-200">Click to upload Ad Image</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  </label>
                )}
              </div>
              <select className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-white outline-none" value={adForm.category} onChange={e => setAdForm({...adForm, category: e.target.value})}>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <input className="bg-slate-950 border border-slate-800 p-3 rounded-xl outline-none focus:border-amber-500" placeholder="Ad Title" value={adForm.title} onChange={e => setAdForm({...adForm, title: e.target.value})} required />
              <input className="bg-slate-950 border border-slate-800 p-3 rounded-xl outline-none focus:border-amber-500" placeholder="Price (LKR)" value={adForm.price} onChange={e => setAdForm({...adForm, price: e.target.value})} required />
              <input className="bg-slate-950 border border-slate-800 p-3 rounded-xl outline-none focus:border-amber-500" placeholder="Location" value={adForm.location} onChange={e => setAdForm({...adForm, location: e.target.value})} required />
              <button disabled={loading} className={`${editId ? 'bg-blue-600' : 'bg-amber-500'} text-black font-bold py-3 rounded-xl md:col-span-2 hover:opacity-90 transition-all flex items-center justify-center`}>
                {loading ? <Loader2 className="animate-spin" /> : editId ? 'Update Ad' : 'Post Ad'}
              </button>
            </form>
          )}
        </section>

        <div className="grid gap-4">
          {data.map(item => (
            <div key={item.id} className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl flex justify-between items-center group hover:border-amber-500/50 transition-all">
              <div className="flex items-center gap-4">
                {item.image ? (
                   <img src={item.image} className="w-16 h-16 object-cover rounded-xl border border-slate-700" alt="" />
                ) : (
                   <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center text-slate-600"><ImageIcon size={20}/></div>
                )}
                <div>
                  <h3 className="font-bold text-lg text-white">{item.name || item.title}</h3>
                  <div className="flex gap-4 text-sm text-slate-400 mt-1">
                    <span className="text-amber-500 font-bold">Rs. {item.price}</span>
                    {item.category && <span className="bg-slate-800 px-2 rounded uppercase text-[10px] flex items-center">{item.category}</span>}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(item)} className="p-3 bg-slate-800 text-slate-400 hover:text-blue-400 rounded-xl"><Edit3 size={18} /></button>
                <button onClick={() => handleDelete(item.id)} className="p-3 bg-slate-800 text-slate-400 hover:text-red-400 rounded-xl"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;