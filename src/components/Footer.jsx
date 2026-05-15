import React from 'react';
import { Globe, Rss, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-2 space-y-6">
            <h4 className="text-2xl font-black text-[#001D3D]">LivZZ</h4>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              © 2026 Livzz | Powerd by Careergize.LLP. Reliable Property Management. Designed for comfort, managed with precision.
             
            </p>
            <div className="flex gap-4 text-slate-300">
              <Globe size={20} className="hover:text-[#00C896] cursor-pointer" />
              <Rss size={20} className="hover:text-[#00C896] cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
  <h5 className="text-[10px] font-black text-[#001D3D] uppercase tracking-widest">Company</h5>
  <ul className="space-y-4 text-sm font-bold text-slate-400">
    <li>
      <Link to="/about-us" className="hover:text-[#001D3D] cursor-pointer transition-colors">About Us</Link>
    </li>
    <li className="hover:text-[#001D3D] cursor-pointer">Terms of Service</li>
    <li className="hover:text-[#001D3D] cursor-pointer">Privacy Policy</li>
    <li>
      <Link to="/contact" className="hover:text-[#001D3D] cursor-pointer transition-colors">Contact</Link>
    </li>
  </ul>
</div>
          <div className="space-y-6">
            <h5 className="text-[10px] font-black text-[#001D3D] uppercase tracking-widest">Locations</h5>
            <ul className="space-y-4 text-sm font-bold text-slate-400">
              <li className="hover:text-[#001D3D] cursor-pointer">Bangalore</li>
              <li className="hover:text-[#001D3D] cursor-pointer">Chennai</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 lg:col-span-1 space-y-6">
            <h5 className="text-[10px] font-black text-[#001D3D] uppercase tracking-widest">Newsletter</h5>
            <p className="text-slate-400 text-sm">Stay updated with premium listings.</p>
            <div className="flex p-2 bg-slate-50 rounded-2xl border border-slate-100 items-center">
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-transparent px-4 outline-none w-full text-sm font-bold text-[#001D3D] placeholder:text-slate-300" 
              />
              <button className="bg-[#00C896] p-3 rounded-xl text-white shadow-md shadow-green-100">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}