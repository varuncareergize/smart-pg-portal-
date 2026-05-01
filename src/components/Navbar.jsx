import React from 'react';
import { Bell, Heart, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-[100] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
        
        {/* Brand & Desktop Links */}
        <div className="flex items-center gap-10">
          <h1 className="text-2xl font-black text-[#001D3D] tracking-tighter cursor-pointer">
            SmartGP
          </h1>
          <div className="hidden md:flex gap-8 text-sm font-bold">
            <a href="/" className="text-[#00C896] border-b-2 border-[#00C896] pb-1">Discover</a>
            <a href="#" className="text-slate-400 hover:text-[#001D3D] transition-all">Support</a>
          </div>
        </div>

        {/* Icons & CTA */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
            <Bell size={22} />
          </button>
          <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors">
            <Heart size={22} />
          </button>
          <button className="hidden sm:block text-sm font-black text-[#001D3D] px-4">
            Sign In
          </button>
          <button className="bg-[#00C896] text-white px-5 sm:px-7 py-2.5 rounded-xl font-black text-sm shadow-lg shadow-green-100 hover:scale-[1.02] transition-all active:scale-95">
            List Property
          </button>
          <button className="md:hidden p-2 text-[#001D3D]">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}