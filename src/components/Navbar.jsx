import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Menu, X, Home, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-[#001D3D]/80 backdrop-blur-lg border-b border-slate-100 dark:border-white/10 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Brand Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
            onClick={() => setIsOpen(false)}
          >
            <div className="w-11 h-11 bg-[#00C896] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-[#00C896]/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Home size={24} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-black text-[#001D3D] dark:text-white tracking-tighter transition-colors">
              SmartPG
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <div className="flex items-center gap-2 mr-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 text-[11px] font-black uppercase tracking-widest transition-all group ${
                    isActive(link.path) 
                      ? 'text-[#00C896]' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-[#001D3D] dark:hover:text-white'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-4 right-4 h-0.5 bg-[#00C896] transition-transform duration-300 ${
                    isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>
              ))}
            </div>
            
            <button 
              onClick={() => navigate('/login')}
              className="bg-[#001D3D] dark:bg-white text-white dark:text-[#001D3D] px-7 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#00C896] dark:hover:bg-[#00C896] dark:hover:text-white hover:shadow-lg hover:shadow-green-500/20 transition-all active:scale-95"
            >
              Sign In
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 text-[#001D3D] dark:text-white bg-slate-50 dark:bg-white/5 rounded-2xl transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden absolute w-full bg-white dark:bg-[#001D3D] border-b border-slate-100 dark:border-white/10 shadow-2xl transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pt-4 pb-10 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between w-full px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                isActive(link.path) 
                  ? 'bg-green-50 dark:bg-green-500/10 text-[#00C896]' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
              }`}
            >
              {link.name}
              <ChevronRight size={16} className={isActive(link.path) ? 'opacity-100' : 'opacity-0'} />
            </Link>
          ))}
          <div className="pt-6">
            <button 
              onClick={() => { navigate('/login'); setIsOpen(false); }}
              className="w-full bg-[#001D3D] dark:bg-white text-white dark:text-[#001D3D] py-5 rounded-[24px] font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}