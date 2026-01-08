import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, PlusCircle } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Browse Ads', href: '/browse' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-[#020617]/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* Logo Section - Now navigates to Admin Login */}
          <Link to="/admin" className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-3 group cursor-pointer">
              <div className="group-hover:scale-105 transition-transform duration-200">
                <img 
                  src="/හෙළ.png" 
                  alt="Hela Advertising Logo" 
                  className="w-12 h-12 md:w-14 md:h-14 object-cover rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                />
              </div>
              
              
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) => 
                  `font-medium transition-all duration-200 text-sm uppercase tracking-wider ${
                    isActive 
                      ? 'text-amber-500 border-b-2 border-amber-500 pb-1' 
                      : 'text-slate-400 hover:text-amber-500' 
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            
            <Link to="/post-ad">
              <button className="flex items-center gap-2 bg-amber-500 text-black px-6 py-2.5 rounded-full font-bold hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20 active:scale-95">
                <PlusCircle size={18} />
                Post an Ad
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-amber-500 focus:outline-none transition-colors"
            >
              {isOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-[#020617] border-t border-slate-800">
          <div className="px-4 pt-4 pb-8 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => 
                  `block px-4 py-4 text-lg font-medium rounded-2xl transition-all ${
                    isActive 
                      ? 'bg-amber-500/10 text-amber-500' 
                      : 'text-slate-300 hover:bg-slate-800/50 hover:text-amber-500'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            
            <div className="pt-4 px-4">
               <Link to="/post-ad" onClick={() => setIsOpen(false)}>
                  <button className="w-full flex items-center justify-center gap-2 bg-amber-500 text-black py-4 rounded-2xl font-bold">
                    <PlusCircle size={20} />
                    Post an Ad
                  </button>
               </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;  