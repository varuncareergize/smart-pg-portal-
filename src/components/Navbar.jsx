import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Home } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to check active state for styling
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'Services', path: '/services' },
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* 1. Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => { navigate('/'); setIsOpen(false); }}
          >
            <div className="w-10 h-10 bg-[#00C896] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#00C896]/20 group-hover:rotate-6 transition-transform">
              <Home size={22} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-black text-[#001D3D] tracking-tighter">SmartGP</span>
          </div>

          {/* 2. Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => navigate(link.path)}
                className={`text-sm font-black uppercase tracking-widest transition-colors ${
                  isActive(link.path) ? 'text-[#00C896]' : 'text-slate-500 hover:text-[#001D3D]'
                }`}
              >
                {link.name}
              </button>
            ))}
            
            <button 
              onClick={() => navigate('/login')}
              className="bg-[#001D3D] text-white px-8 py-3 rounded-2xl font-black text-sm hover:bg-[#002d5a] transition-all active:scale-95 shadow-xl shadow-blue-900/10"
            >
              Sign In
            </button>
          </div>

          {/* 3. Mobile Menu Toggle Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#001D3D] hover:bg-slate-50 rounded-xl transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Menu Overlay */}
      <div className={`md:hidden absolute w-full bg-white border-b border-slate-100 transition-all duration-300 ease-in-out ${isOpen ? 'top-20 opacity-100' : '-top-96 opacity-0 pointer-events-none'}`}>
        <div className="px-4 pt-4 pb-8 space-y-2 bg-white">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => { navigate(link.path); setIsOpen(false); }}
              className={`block w-full text-left px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest ${
                isActive(link.path) ? 'bg-green-50 text-[#00C896]' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </button>
          ))}
          <div className="pt-4 px-2">
            <button 
              onClick={() => { navigate('/login'); setIsOpen(false); }}
              className="w-full bg-[#001D3D] text-white py-4 rounded-2xl font-black text-sm shadow-lg"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}