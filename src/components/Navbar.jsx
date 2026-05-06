import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, X, Home, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect for that premium "sticky" feel
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-100 py-3 shadow-sm' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* 1. Brand Logo - Updated to UULYV */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
            onClick={() => setIsOpen(false)}
          >
            <div className="w-12 h-12 bg-[#001F3F] rounded-2xl flex items-center justify-center text-[#FFC107] shadow-2xl shadow-blue-900/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              <Zap size={26} fill="currentColor" strokeWidth={0} />
            </div>
            <span className={`text-3xl font-black tracking-tighter transition-colors duration-300 ${
              scrolled ? 'text-[#001F3F]' : 'text-white'
            }`}>
              UULYV
            </span>
          </Link>

          {/* 2. Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-4 mr-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] transition-all group ${
                    isActive(link.path) 
                      ? 'text-[#FFC107]' 
                      : scrolled ? 'text-slate-500 hover:text-[#001F3F]' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.name}
                  {/* Premium indicator for active state */}
                  <span className={`absolute -bottom-1 left-4 right-4 h-0.5 bg-[#FFC107] transition-transform duration-500 ${
                    isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>
              ))}
            </div>
            
            <button 
              onClick={() => navigate('/login')}
              className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.15em] transition-all active:scale-95 shadow-xl ${
                scrolled 
                ? 'bg-[#001F3F] text-white hover:bg-[#FFC107] hover:text-[#001F3F] shadow-blue-900/10' 
                : 'bg-[#FFC107] text-[#001F3F] hover:bg-white'
              }`}
            >
              Sign In
            </button>
          </div>

          {/* 3. Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`p-4 rounded-2xl transition-all active:scale-90 ${
                scrolled ? 'bg-slate-50 text-[#001F3F]' : 'bg-white/10 text-white backdrop-blur-md'
              }`}
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute w-full bg-white border-b border-slate-100 shadow-2xl overflow-hidden"
          >
            <div className="px-8 pt-6 pb-12 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between w-full px-8 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest transition-all ${
                    isActive(link.path) 
                      ? 'bg-[#FFC107]/10 text-[#001F3F]' 
                      : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                  <ChevronRight size={18} className={isActive(link.path) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'} />
                </Link>
              ))}
              <div className="pt-8">
                <button 
                  onClick={() => { navigate('/login'); setIsOpen(false); }}
                  className="w-full bg-[#001F3F] text-white py-6 rounded-[28px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-900/30 active:scale-95 transition-transform"
                >
                  Member Login
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}