import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, Heart, User, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSavedProperties } from '../utils/propertyHelpers';

export default function Navbar({ variant = 'default' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const isMarketplace = variant === 'marketplace';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMarketplace) {
      setSavedCount(getSavedProperties().length);
      const interval = setInterval(() => setSavedCount(getSavedProperties().length), 2000);
      return () => clearInterval(interval);
    }
  }, [isMarketplace, location]);

  const navLinks = isMarketplace
    ? [
        { name: 'Browse', path: '/properties' },
        { name: 'About Us', path: '/about-us' },
        { name: 'Services', path: '/services' },
        { name: 'Contact', path: '/contact' },
      ]
    : [
        { name: 'About Us', path: '/about-us' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'Services', path: '/services' },
      ];

  const navClasses = isMarketplace
    ? scrolled
      ? 'livzz-glass-dark py-3 shadow-lg'
      : 'bg-[#001F3F]/95 backdrop-blur-md py-4'
    : 'bg-[#090909] border-b border-white/10 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.18)]';

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${navClasses}`}>
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-12">
          <Link to="/" className="flex items-center gap-1" onClick={() => setIsOpen(false)}>
            {isMarketplace ? (
              <span className="text-2xl md:text-3xl font-black tracking-tight">
                <span className="text-white">Liv</span>
                <span className="text-[#FFC107]">ZZ</span>
              </span>
            ) : (
              <span className="text-white text-2xl font-black tracking-[-0.06em] lowercase md:text-3xl">
                livzz<span className="text-indigo-500 font-black">.</span>
              </span>
            )}
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-5">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  <Link
                    to={link.path}
                    className={`flex items-center gap-1 text-[11px] font-black uppercase tracking-[0.14em] transition-colors duration-200 ${
                      isMarketplace
                        ? location.pathname === link.path
                          ? 'text-[#FFC107]'
                          : 'text-white/80 hover:text-[#FFC107]'
                        : 'text-white/65 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <ChevronDown size={14} className="opacity-60 group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </Link>
                </div>
              ))}
            </div>

            {isMarketplace && (
              <>
                <button
                  onClick={() => navigate('/properties')}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white text-sm font-semibold transition-all"
                >
                  <Search size={16} />
                  Search
                </button>

                <button
                  onClick={() => navigate('/properties')}
                  className="relative p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all"
                >
                  <Heart size={18} />
                  {savedCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFC107] text-[#001F3F] text-[10px] font-black rounded-full flex items-center justify-center">
                      {savedCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => navigate('/login')}
                  className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all"
                >
                  <User size={18} />
                </button>

                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#FFC107] text-[#001F3F] font-black rounded-xl text-sm hover:shadow-lg hover:shadow-[#FFC107]/30 transition-all active:scale-95"
                >
                  <Plus size={16} />
                  List Property
                </button>
              </>
            )}

            {!isMarketplace && (
              <button
                onClick={() => navigate('/login')}
                className="rounded-full bg-white px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.12em] text-black transition-all duration-200 hover:bg-neutral-200 active:scale-95"
              >
                Sign-In
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 transition-colors ${isMarketplace ? 'text-white' : 'text-white hover:text-indigo-400'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden absolute w-full shadow-2xl overflow-hidden ${
              isMarketplace ? 'bg-[#001F3F] border-b border-[#FFC107]/10' : 'bg-[#0B0A12] border-b border-white/5'
            }`}
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block w-full text-base font-semibold py-2 transition-colors ${
                    isMarketplace ? 'text-white/80 hover:text-[#FFC107]' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {isMarketplace && (
                <button
                  onClick={() => { navigate('/login'); setIsOpen(false); }}
                  className="w-full bg-[#FFC107] text-[#001F3F] py-3 rounded-xl text-sm font-black text-center"
                >
                  List Property
                </button>
              )}
              {!isMarketplace && (
                <div className="pt-4 border-t border-white/5">
                  <button
                    onClick={() => { navigate('/login'); setIsOpen(false); }}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg text-sm font-medium text-center"
                  >
                    Sign-In
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
