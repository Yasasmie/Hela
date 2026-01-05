import React, { useState } from 'react';
import Navbar from '../componennts/NavBar';
import Footer from '../componennts/Footer';
import { Camera, Send, Info, Tag, MapPin, Phone } from 'lucide-react';

const PostAdPage = () => {
  const [formData, setFormData] = useState({
    category: 'Vehicles',
    title: '',
    price: '',
    location: '',
    condition: 'Used',
    description: '',
    contact: ''
  });

  const categories = ['Vehicles', 'Property', 'Electronics', 'Services', 'Animals', 'Education'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const phoneNumber = "94769609350";
    
    // Constructing the professional Ad message
    const adMessage = `✨ *NEW AD SUBMISSION* ✨
-----------------------------
📌 *Category:* ${formData.category}
📝 *Title:* ${formData.title}
💰 *Price:* Rs. ${formData.price}
📍 *Location:* ${formData.location}
🛠️ *Condition:* ${formData.condition}
📞 *Contact:* ${formData.contact}

📖 *Description:*
${formData.description}
-----------------------------
_Sent via හෙළ Advertising Portal_`;

    const encodedMessage = encodeURIComponent(adMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-amber-500/30">
      <Navbar />

      <div className="max-w-3xl mx-auto pt-28 pb-20 px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-3">
            Post Your <span className="text-amber-500 font-sinhala">Ad</span>
          </h1>
          <p className="text-slate-400">Fill in the details below to reach thousands of buyers instantly.</p>
        </div>

        {/* Form Card */}
        <form 
          onSubmit={handleSubmit}
          className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-8 backdrop-blur-md shadow-xl"
        >
          <div className="space-y-6">
            
            {/* Category & Title */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-2">
                  <Tag size={16} className="text-amber-500" /> Category
                </label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors text-white"
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-2">
                  <Info size={16} className="text-amber-500" /> Ad Title
                </label>
                <input 
                  required
                  type="text"
                  name="title"
                  placeholder="e.g. Toyota Vitz 2018 for Sale"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors text-white"
                />
              </div>
            </div>

            {/* Price & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-2">
                  💰 Price (Rs.)
                </label>
                <input 
                  required
                  type="number"
                  name="price"
                  placeholder="Enter Amount"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors text-white"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-2">
                  <MapPin size={16} className="text-amber-500" /> Location
                </label>
                <input 
                  required
                  type="text"
                  name="location"
                  placeholder="e.g. Colombo 07"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors text-white"
                />
              </div>
            </div>

            {/* Condition & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-2">
                  ✨ Condition
                </label>
                <div className="flex gap-4">
                  {['Used', 'Brand New'].map((cond) => (
                    <button
                      key={cond}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, condition: cond }))}
                      className={`flex-1 py-3 rounded-xl border transition-all ${
                        formData.condition === cond 
                        ? 'bg-amber-500 border-amber-500 text-black font-bold' 
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      {cond}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-400 mb-2">
                  <Phone size={16} className="text-amber-500" /> Contact Number
                </label>
                <input 
                  required
                  type="tel"
                  name="contact"
                  placeholder="07x xxxx xxx"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors text-white"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Description</label>
              <textarea 
                required
                name="description"
                rows="4"
                placeholder="Describe what you are selling..."
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 transition-colors text-white resize-none"
              ></textarea>
            </div>

            {/* Image Info Note */}
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex gap-3">
              <Camera className="text-blue-400 shrink-0" size={20} />
              <p className="text-xs text-blue-200/70">
                Note: You can send your item photos directly in the WhatsApp chat once you click submit.
              </p>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-black py-4 rounded-xl font-extrabold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.98]"
            >
              <Send size={20} />
              Post Ad on WhatsApp
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default PostAdPage;