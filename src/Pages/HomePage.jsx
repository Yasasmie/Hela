import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../componennts/NavBar'; 
import Footer from '../componennts/Footer'; 
import { 
  Search, MapPin, TrendingUp, ShieldCheck, Zap, 
  Star, CheckCircle2, Rocket, Crown, Instagram, 
  Youtube, Users, ExternalLink, Loader2 
} from 'lucide-react';
import axios from 'axios';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const API_BASE_URL = 'http://localhost:5000/api/packages';

const iconForName = (name) => {
  const n = name.toLowerCase();
  if (n.includes('basic')) return <Zap size={24} />;
  if (n.includes('standard')) return <Rocket size={24} />;
  if (n.includes('premium')) return <Star size={24} />;
  if (n.includes('ultimate') || n.includes('crown')) return <Crown size={24} />;
  return <Zap size={24} />;
};

const HomePage = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: 'Vehicles', icon: '🚗', id: 'vehicles' },
    { name: 'Property', icon: '🏠', id: 'property' },
    { name: 'Electronics', icon: '💻', id: 'electronics' },
    { name: 'Services', icon: '🛠️', id: 'services' },
    { name: 'Animals', icon: '🐾', id: 'animals' },
    { name: 'Education', icon: '📚', id: 'education' },
  ];

  const influencers = [
    { id: 1, name: "Yasas Basuru", category: "Owner", followers: "5K+", image: "/yasas.jpeg", platform: "TikTok" },
    { id: 2, name: "Iththawa", category: "Blogger", followers: "11K+", image: "/iththawa.jpeg", platform: "YouTube" },
  ];

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(API_BASE_URL);
        setPackages(res.data);
      } catch (err) {
        console.error('Error fetching packages:', err);
        setPackages([]); 
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const handleWhatsApp = (pkg) => {
    const phoneNumber = '94769609350';
    const messageBody = `Hello හෙළ Advertising! 👋\n\nI am interested in the *${pkg.name} Package*.\n\n💰 *Price:* Rs.${pkg.price}/month\n✅ *Features Included:*\n• ${pkg.features.join('\n• ')}\n\nPlease let me know the next steps to get started!`;
    const encodedMessage = encodeURIComponent(messageBody);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-amber-500/30 relative">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-amber-600/10 blur-[120px] rounded-full"></div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white leading-tight">
          <span className="bg-white bg-clip-text text-transparent inline-flex items-baseline justify-center gap-x-4 py-4 leading-normal">
            <span className="text-8xl md:text-[9rem] font-sinhala">හෙළ</span> 
            <span className="text-4xl md:text-5xl tracking-tighter">Advertising</span>
          </span><br/>
          <span className="text-xl md:text-2xl font-bold text-gray-400 tracking-widest uppercase mt-4 block">
            Sri Lanka's Ultimate Marketplace
          </span>
        </h1>
        
        <p className="text-slate-400 max-w-2xl mx-auto mb-12 text-lg leading-relaxed">
          Unlock your brand's potential with the most reliable digital marketing and advertising hub in the island.
        </p>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-white mb-10 border-l-4 border-amber-500 pl-4">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat) => (
            <div 
              key={cat.name} 
              onClick={() => navigate(`/browse?category=${cat.id}`)}
              className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2rem] text-center hover:border-amber-500/50 hover:bg-slate-800/50 transition-all group cursor-pointer"
            >
              <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">{cat.icon}</div>
              <h3 className="font-bold text-slate-200 group-hover:text-amber-500 transition-colors">{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* DIGITAL MARKETING PACKAGES */}
      <section className="py-24 px-4 relative">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Digital Marketing Packages</h2>
          <p className="text-slate-400">
            Scale your brand with <span className="text-amber-500 font-sinhala">හෙළ</span> premium strategies
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-amber-500 mb-4" size={40} />
              <p className="text-slate-500">Loading custom packages...</p>
            </div>
          ) : packages.length > 0 ? (
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              coverflowEffect={{
                rotate: 30,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              modules={[EffectCoverflow, Pagination, Autoplay]}
              className="pb-20"
            >
              {packages.map((pkg, index) => {
                const isActive = activeIndex === index;
                return (
                  <SwiperSlide key={pkg.id || index} className="max-w-[360px] py-10">
                    <div
                      className={`relative rounded-[2.5rem] p-8 h-full transition-all duration-700 border-2 overflow-hidden
                      ${isActive
                          ? 'bg-slate-800 border-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.2)] scale-105 z-20'
                          : 'bg-slate-900 border-slate-800 scale-90 opacity-60 z-10'
                      }`}
                    >
                      {isActive && (
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[50px] rounded-full"></div>
                      )}

                      <div className="relative z-10">
                        <div
                          className={`mb-6 p-4 w-fit rounded-2xl transition-colors duration-500 
                          ${isActive ? 'bg-amber-500 text-black' : 'bg-slate-800 text-amber-500'}`}
                        >
                          {iconForName(pkg.name)}
                        </div>

                        <h3 className={`text-2xl font-bold mb-2 transition-colors ${isActive ? 'text-white' : 'text-slate-400'}`}>
                          {pkg.name}
                        </h3>

                        <div className="flex items-baseline gap-1 mb-8">
                          <span className={`text-4xl font-black transition-colors ${isActive ? 'text-amber-500' : 'text-slate-300'}`}>
                            Rs.{pkg.price}
                          </span>
                          <span className="text-slate-500 text-sm">/month</span>
                        </div>

                        <ul className="space-y-4 text-left mb-10">
                          {pkg.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-3 text-sm">
                              <CheckCircle2 size={18} className={isActive ? 'text-amber-500' : 'text-slate-600'} />
                              <span className={isActive ? 'text-slate-200' : 'text-slate-500'}>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <button
                          onClick={() => handleWhatsApp(pkg)}
                          className={`w-full py-4 rounded-2xl font-bold transition-all active:scale-95
                          ${isActive
                              ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 hover:bg-amber-400'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          Get Started
                        </button>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <div className="text-center py-20 bg-slate-900/20 rounded-3xl border border-dashed border-slate-800">
              <p className="text-slate-500">No active marketing packages available.</p>
            </div>
          )}
        </div>
      </section>

      {/* Influencer Network */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="text-left">
              <h2 className="text-4xl font-bold text-white mb-4">Partnered Influencers</h2>
              <p className="text-slate-400 max-w-xl">
                Collaborate with Sri Lanka's top content creators to give your brand the massive exposure it deserves.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {influencers.map((person) => (
              <div key={person.id} className="group relative">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-800 aspect-[4/5] border border-slate-700 group-hover:border-amber-500/50 transition-all duration-500">
                  <img 
                    src={person.image} 
                    alt={person.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 group-hover:-translate-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        {person.category}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-1">{person.name}</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Users size={14} className="text-amber-500" />
                        <span className="text-sm font-medium">{person.followers} Reach</span>
                      </div>
                      {person.platform === 'YouTube' ? (
                        <Youtube size={20} className="text-red-500" />
                      ) : (
                        <Instagram size={20} className="text-pink-500" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-slate-800 bg-slate-900/20 py-24 px-4 mb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          <div className="flex flex-col items-center group">
            <div className="p-4 rounded-full bg-amber-500/10 mb-6 group-hover:bg-amber-500/20 transition-colors">
              <ShieldCheck className="text-amber-500" size={48} />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Secure Trading</h4>
            <p className="text-slate-500 leading-relaxed">Manual verification for all ads to ensure the highest safety standards.</p>
          </div>
          <div className="flex flex-col items-center group">
            <div className="p-4 rounded-full bg-blue-500/10 mb-6 group-hover:bg-blue-500/20 transition-colors">
              <Zap className="text-blue-500" size={48} />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Instant Reach</h4>
            <p className="text-slate-500 leading-relaxed">Optimization that gets your products in front of buyers in under 5 minutes.</p>
          </div>
          <div className="flex flex-col items-center group">
            <div className="p-4 rounded-full bg-green-500/10 mb-6 group-hover:bg-green-500/20 transition-colors">
              <TrendingUp className="text-green-500" size={48} />
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Zero Commission</h4>
            <p className="text-slate-500 leading-relaxed">We don't take a cut. You keep 100% of your earnings on every sale.</p>
          </div>
        </div>
      </section>
            
      <Footer />
    </div>
  );
};

export default HomePage;