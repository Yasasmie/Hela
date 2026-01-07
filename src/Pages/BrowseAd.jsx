import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../componennts/NavBar';
import Footer from '../componennts/Footer';
import { Tag, MapPin, Clock, ImageIcon } from 'lucide-react';

const categories = [
  { name: 'Vehicles', icon: '🚗', id: 'vehicles' },
  { name: 'Property', icon: '🏠', id: 'property' },
  { name: 'Electronics', icon: '💻', id: 'electronics' },
  { name: 'Services', icon: '🛠️', id: 'services' },
  { name: 'Animals', icon: '🐾', id: 'animals' },
  { name: 'Education', icon: '📚', id: 'education' },
];

const BrowseAds = () => {
  const [ads, setAds] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category');
  const sectionRefs = useRef({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/ads').then(res => setAds(res.data));
  }, []);

  const scrollToSection = (id) => {
    const el = sectionRefs.current[id];
    if (el) window.scrollTo({ top: el.offsetTop - 120, behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeCategory) setTimeout(() => scrollToSection(activeCategory), 100);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <Navbar />
      <main className="pt-28 pb-20 px-4 max-w-7xl mx-auto">
        
        <div className="sticky top-20 z-40 bg-[#020617]/90 backdrop-blur-md py-4 border-b border-slate-800 mb-12 flex flex-wrap gap-2 justify-center">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => { setSearchParams({ category: cat.id }); scrollToSection(cat.id); }}
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${activeCategory === cat.id ? 'bg-amber-500 border-amber-500 text-black' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        <div className="space-y-20">
          {categories.map(cat => (
            <section key={cat.id} ref={el => sectionRefs.current[cat.id] = el} className="scroll-mt-32">
              <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-4">
                <h2 className="text-3xl font-bold flex items-center gap-3">{cat.icon} {cat.name}</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {ads.filter(ad => ad.category === cat.id).length > 0 ? (
                  ads.filter(ad => ad.category === cat.id).map(ad => (
                    <div key={ad.id} className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden hover:border-amber-500/30 transition-all group">
                      <div className="aspect-video bg-slate-800 overflow-hidden flex items-center justify-center">
                        {ad.image ? (
                          <img src={ad.image} alt={ad.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <div className="text-slate-600 flex flex-col items-center gap-2">
                            <ImageIcon size={24}/>
                            <span className="text-[10px] uppercase font-bold tracking-widest">No Image</span>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="text-amber-500 font-bold text-lg flex items-center gap-1"><Tag size={16}/> Rs. {ad.price}</div>
                        <h4 className="text-white font-medium my-2 group-hover:text-amber-500 transition-colors line-clamp-1">{ad.title}</h4>
                        <div className="flex justify-between text-slate-500 text-[10px] mt-4">
                          <span className="flex items-center gap-1"><MapPin size={10}/> {ad.location}</span>
                          <span className="flex items-center gap-1"><Clock size={10}/> {ad.date}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-600 italic py-10">No ads listed in this category yet.</p>
                )}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BrowseAds;