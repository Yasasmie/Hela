import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../componennts/NavBar'; 
import Footer from '../componennts/Footer'; 
import { 
  Zap, Star, CheckCircle2, Rocket, Crown, 
  Instagram, Youtube, Users, ShieldCheck, TrendingUp,
  ChevronLeft, ChevronRight 
} from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCoverflow, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

const TikTokIcon = ({ size = 20, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const STATIC_PACKAGES = [
  { id: 1, name: "Emperor Supreme", price: "200,000", features: ["20 Videos", "20 Posts", "Boost: 1M+ Views", "Special Promotion 2 videos", "Promotion event Campaign"] },
  { id: 2, name: "Crown Master", price: "100,000", features: ["16 Videos", "16 Posts", "Boost: 100k+ Views", "300 Targeted Leads", "Promotion Campaign"] },
  { id: 3, name: "Business Elite", price: "50,000", features: ["12 Videos", "12 Posts", "Boost: 100k+ Views", "150 Targeted Leads"] },
  { id: 4, name: "Ultimate Package", price: "30,000", features: ["8 Videos", "8 Posts", "Boost: 100k+ Views"] },
  { id: 5, name: "Premium Package", price: "15,000", features: ["4 Videos", "4 Posts", "Boost: 75k+ Views"] },
  { id: 6, name: "Standard Package", price: "10,000", features: ["2 Videos", "4 Posts", "Boost: 50k+ Views"] },
  { id: 7, name: "Basic Package", price: "5,000", features: ["1 Video", "1 Post", "Boost: 25k+ Views"] }
];

const iconForName = (name) => {
  const n = name.toLowerCase();
  if (n.includes('basic')) return <Zap size={24} />;
  if (n.includes('standard')) return <Rocket size={24} />;
  if (n.includes('premium')) return <Star size={24} />;
  return <Crown size={24} />;
};

const HomePage = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

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
    { id: 3, name: "Mr. Vidu", category: "Rapper", followers: "228K+", image: "/vidu.jpeg", platform: "TikTok" },
  ];

  const handleWhatsApp = (pkg) => {
    const phoneNumber = '94769609350';
    const messageBody = `Hello හෙළ Advertising! 👋\n\nI am interested in the *${pkg.name}*.\n\n💰 *Price:* Rs.${pkg.price}/month\n✅ *Features Included:*\n• ${pkg.features.join('\n• ')}\n\nPlease let me know the next steps to get started!`;
    const encodedMessage = encodeURIComponent(messageBody);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-amber-500/30 relative">
      <Navbar />

      {/* Hero Section - Reduced pt-32 to pt-20 to move content up */}
      <section className="relative pt-20 pb-16 px-4 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-amber-600/10 blur-[120px] rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto mt-8">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-white leading-tight">
            <span className="bg-white bg-clip-text text-transparent inline-flex items-baseline justify-center gap-x-4 py-2 leading-normal">
              <span className="text-7xl md:text-[8rem] font-sinhala text-white">හෙළ</span> 
              <span className="text-4xl md:text-5xl tracking-tighter">Advertising</span>
            </span><br/>
            <span className="text-lg md:text-xl font-bold text-gray-400 tracking-[0.2em] uppercase mt-2 block">
              Sri Lanka's Ultimate Marketplace
            </span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
            Unlock your brand's potential with the most reliable digital marketing and advertising hub in the island.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto py-12 px-4">
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

      {/* Digital Marketing Packages */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Digital Marketing Packages</h2>
          <p className="text-slate-400">
            Scale your brand with <span className="text-amber-500 font-sinhala">හෙළ</span> premium strategies
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative px-4 md:px-12">
          {/* Manual Navigation Arrows */}
          <button className="nav-prev absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-slate-800/80 backdrop-blur-sm p-3 rounded-full border border-slate-700 hover:border-amber-500 text-amber-500 transition-all hover:scale-110 active:scale-90">
            <ChevronLeft size={28} />
          </button>
          <button className="nav-next absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-slate-800/80 backdrop-blur-sm p-3 rounded-full border border-slate-700 hover:border-amber-500 text-amber-500 transition-all hover:scale-110 active:scale-90">
            <ChevronRight size={28} />
          </button>

          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            navigation={{
              nextEl: '.nav-next',
              prevEl: '.nav-prev',
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="pb-16"
          >
            {STATIC_PACKAGES.map((pkg, index) => {
              const isActive = activeIndex === index;
              return (
                <SwiperSlide key={pkg.id} className="max-w-[340px] py-10">
                  <div
                    className={`relative rounded-[2.5rem] p-8 h-full transition-all duration-500 border-2 overflow-hidden
                    ${isActive
                        ? 'bg-slate-800 border-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.15)] scale-105 z-20'
                        : 'bg-slate-900/50 border-slate-800 scale-95 opacity-50 z-10'
                    }`}
                  >
                    <div className="relative z-10">
                      <div className={`mb-6 p-4 w-fit rounded-2xl transition-colors duration-500 
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
                            <span className={isActive ? 'text-slate-200' : 'text-slate-400'}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => handleWhatsApp(pkg)}
                        className={`w-full py-4 rounded-2xl font-bold transition-all active:scale-95
                        ${isActive
                            ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 hover:bg-amber-400'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
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
        </div>
      </section>

      {/* Influencer Network */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-4">Partnered Influencers</h2>
          <p className="text-slate-400 max-w-xl mb-12">Collaborate with Sri Lanka's top content creators.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {influencers.map((person) => (
              <div key={person.id} className="group relative">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-800 aspect-[4/5] border border-slate-700 group-hover:border-amber-500/50 transition-all duration-500">
                  <img src={person.image} alt={person.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="bg-amber-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase mb-2 inline-block">{person.category}</span>
                    <h4 className="text-xl font-bold text-white mb-1">{person.name}</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Users size={14} className="text-amber-500" />
                        <span className="text-sm font-medium">{person.followers} Reach</span>
                      </div>
                      {person.platform === 'YouTube' ? <Youtube size={20} className="text-red-500" /> : person.platform === 'TikTok' ? <TikTokIcon size={20} className="text-white" /> : <Instagram size={20} className="text-pink-500" />}
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
          <div className="flex flex-col items-center">
            <ShieldCheck className="text-amber-500 mb-6" size={48} />
            <h4 className="text-xl font-bold text-white mb-3">Secure Trading</h4>
            <p className="text-slate-500">Manual verification for all ads to ensure safety.</p>
          </div>
          <div className="flex flex-col items-center">
            <Zap className="text-blue-500 mb-6" size={48} />
            <h4 className="text-xl font-bold text-white mb-3">Instant Reach</h4>
            <p className="text-slate-500">Optimization that gets you live in minutes.</p>
          </div>
          <div className="flex flex-col items-center">
            <TrendingUp className="text-green-500 mb-6" size={48} />
            <h4 className="text-xl font-bold text-white mb-3">Zero Commission</h4>
            <p className="text-slate-500">You keep 100% of your earnings on every sale.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;