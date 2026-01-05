import React, { useState } from 'react';
import Navbar from '../componennts/NavBar'; // Adjust path based on your folder structure
import Footer from '../componennts/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: ''
  });

  const whatsappNumber = "+94769609350";

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    // Constructing the WhatsApp message
    const text = `*New Inquiry from Hela Advertising*%0A%0A` +
                 `*Name:* ${formData.name}%0A` +
                 `*Subject:* ${formData.subject}%0A` +
                 `*Message:* ${formData.message}`;
    
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-orange-500">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-20 pb-12 text-center">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-600/10 blur-[120px] rounded-full"></div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Get in <span className="text-orange-500">Touch</span>
        </h1>
        <p className="text-slate-400 max-w-lg mx-auto px-4">
          Have questions about posting an ad or our premium services? We are here to help you grow your business.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 pb-20">
        
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center gap-5 hover:border-orange-500/50 transition-colors">
            <div className="bg-orange-500/10 p-4 rounded-xl text-orange-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-200">Email Us</h3>
              <p className="text-slate-400">info@helaadvertising.com</p>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center gap-5 hover:border-orange-500/50 transition-colors">
            <div className="bg-orange-500/10 p-4 rounded-xl text-orange-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-200">Our Hub</h3>
              <p className="text-slate-400">Colombo, Sri Lanka</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl backdrop-blur-sm shadow-xl">
          <form onSubmit={handleSendMessage} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
              <input 
                type="text" 
                name="name"
                required
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-all text-white placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Subject</label>
              <input 
                type="text" 
                name="subject"
                required
                onChange={handleChange}
                placeholder="Advertising Inquiry"
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-all text-white placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
              <textarea 
                rows="4" 
                name="message"
                required
                onChange={handleChange}
                placeholder="How can we help you today?"
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-all text-white placeholder:text-slate-600 resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>Send via WhatsApp</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Contact;