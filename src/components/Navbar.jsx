import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', path: '/features', hasDropdown: true },
    { name: 'Portfolio', path: '/portfolio', hasDropdown: true },
    { name: 'Smart Meter', path: '/smart-meter' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Resources', path: '/resources' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0B0A12]/90 backdrop-blur-md border-b border-white/5 py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-12">
          
          {/* 1. Brand Logo (Matches clean lowercase font) */}
          <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
            <span className="text-white text-3xl font-extrabold tracking-tight lowercase">
              livzz<span className="text-indigo-500 font-black">.</span>
            </span>
          </Link>

          {/* 2. Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  <Link
                    to={link.path}
                    className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <ChevronDown size={14} className="text-slate-400 group-hover:text-white transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </Link>
                </div>
              ))}
            </div>
            
            {/* Sign-In Button (Elegant, small padding pill shape) */}
            <button 
              onClick={() => navigate('/login')}
              className="px-5 py-2.5 bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/30 hover:border-indigo-500 text-white rounded-lg text-sm font-medium transition-all duration-200 active:scale-95 shadow-lg shadow-indigo-600/10"
            >
              Sign-In
            </button>
          </div>

          {/* 3. Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white hover:text-indigo-400 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute w-full bg-[#0B0A12] border-b border-white/5 shadow-2xl overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-base font-medium text-slate-300 hover:text-white transition-colors py-2"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/5">
                <button 
                  onClick={() => { navigate('/login'); setIsOpen(false); }}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg text-sm font-medium text-center shadow-xl transition-transform active:scale-95"
                >
                  Sign-In
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}