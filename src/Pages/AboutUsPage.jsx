import React from 'react';
import Navbar from '../componennts/NavBar'; 
import Footer from '../componennts/Footer';
import { Target, Eye, Heart, Users, Award, Globe, Zap, ArrowRight, CheckCircle } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { label: 'Ads Published', value: '50,000+' },
    { label: 'Active Clients', value: '1,200+' },
    { label: 'Daily Reach', value: '100k+' },
    { label: 'Success Rate', value: '98%' },
  ];

  const values = [
    {
      title: 'Local Roots, Global Standards',
      desc: 'We combine Sri Lankan cultural insights with world-class digital marketing technologies.',
      icon: <Globe className="text-amber-500" size={32} />
    },
    {
      title: 'Result-Oriented',
      desc: 'We don’t just post ads; we drive conversions, sales, and measurable brand growth.',
      icon: <Target className="text-blue-500" size={32} />
    },
    {
      title: 'Radical Transparency',
      desc: 'From pricing to analytics, we believe in 100% honesty with our clients.',
      icon: <CheckCircle className="text-green-500" size={32} />
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-amber-500/30">
      <Navbar />

      {/* Hero Section / Header */}
      <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-amber-600/10 blur-[120px] rounded-full"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white leading-tight">
            We are the Pulse of <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent py-2 inline-block leading-normal">
              Sri Lankan Commerce
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Hela Advertising isn’t just a platform—it’s a digital ecosystem designed to empower local businesses and connect them with the right audience across the island.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-slate-900/40 border border-slate-800 rounded-[3rem] p-10 backdrop-blur-sm">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-5xl font-black text-amber-500 mb-2">{stat.value}</div>
              <div className="text-slate-500 text-sm uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto py-24 px-4 grid md:grid-cols-2 gap-12">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-12 rounded-[2.5rem] border border-slate-700 hover:border-amber-500/30 transition-all group">
          <div className="bg-amber-500/10 p-4 w-fit rounded-2xl mb-6 group-hover:bg-amber-500 transition-colors">
            <Target className="text-amber-500 group-hover:text-black" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-slate-400 leading-relaxed text-lg">
            To provide Sri Lankan entrepreneurs with an accessible, high-tech, and culture-driven advertising platform that eliminates barriers to digital growth and maximizes return on investment.
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-12 rounded-[2.5rem] border border-slate-700 hover:border-blue-500/30 transition-all group">
          <div className="bg-blue-500/10 p-4 w-fit rounded-2xl mb-6 group-hover:bg-blue-500 transition-colors">
            <Eye className="text-blue-500 group-hover:text-white" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
          <p className="text-slate-400 leading-relaxed text-lg">
            To be the #1 digital marketing hub in Sri Lanka, where every business—from local artisans to corporate giants—thrives through innovative storytelling and strategic advertising.
          </p>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose <span className="text-amber-500 font-sinhala leading-normal">හෙළ</span></h2>
            <div className="h-1 w-24 bg-amber-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:-translate-y-2 transition-transform duration-300">
                <div className="mb-6">{v.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
                <p className="text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="max-w-7xl mx-auto py-24 px-4 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-amber-500/20 blur-[100px] rounded-full"></div>
            <div className="relative bg-slate-800 aspect-square rounded-[3rem] overflow-hidden border border-slate-700">
               {/* Replace with your actual team or office photo */}
               <div className="w-full h-full flex items-center justify-center text-slate-600 italic px-10 text-center">
                 [Image: Hela Advertising Team at Work]
               </div>
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-bold text-white leading-tight">Founded on Trust, <br/>Built for the Future</h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Established with the goal of revolutionizing the local advertising landscape, Hela Advertising started as a simple classifieds concept. Today, we have evolved into a full-scale digital agency.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed">
              We understand the Sri Lankan consumer better than anyone else. Our platform is optimized for local search behaviors, ensuring that your ads reach people who are actually ready to buy.
            </p>
            <button className="flex items-center gap-2 bg-amber-500 text-black px-8 py-4 rounded-2xl font-bold hover:bg-amber-400 transition-all active:scale-95">
              Contact Our Team <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 py-24">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-[3rem] p-12 text-center shadow-2xl shadow-amber-500/20">
          <h2 className="text-4xl font-black text-black mb-6">Ready to Grow Your Business?</h2>
          <p className="text-black/80 text-xl mb-10 max-w-2xl mx-auto font-medium">
            Join thousands of successful Sri Lankan brands already using Hela Advertising to dominate the digital space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-900 transition-all">
              Post an Ad Now
            </button>
            <button className="bg-white/20 backdrop-blur-md text-black px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all border border-black/10">
              View Packages
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;