import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import the hook

const Footer = () => {
  const navigate = useNavigate(); // 2. Initialize the navigate function

  return (
    <section className="max-w-7xl mx-auto py-24 px-4">
      <div className="relative bg-gradient-to-br from-slate-900 to-[#020617] rounded-[2rem] p-12 border border-slate-800 text-center overflow-hidden">
        {/* Decorative Glow Effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[80px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full"></div>

        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Ready to sell your items?
          </h2>
          
          <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
            Join the <span className="text-amber-500 font-bold font-sinhala">හෙළ</span> 
            <span className="text-amber-500 font-bold italic ml-1">Advertising</span> community today and turn your items into cash.
          </p>
          
          {/* 3. Add the onClick handler */}
          <button 
            onClick={() => navigate('/post-ad')}
            className="bg-white text-black px-12 py-4 rounded-full text-lg font-extrabold hover:bg-amber-500 transition-all transform hover:scale-105 shadow-xl hover:shadow-amber-500/20 active:scale-95"
          >
            Post Your Ad Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Footer;