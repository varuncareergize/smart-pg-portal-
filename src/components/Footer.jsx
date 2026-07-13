import React from 'react';
import { Globe, Rss, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0b2238] border-t border-white/5 pt-20 pb-10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-2 space-y-6">
            <h4 className="text-2xl font-black text-white">LivZZ</h4>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              © 2026 Livzz | Powered by Careergize.LLP. Reliable Property Management. Designed for comfort, managed with precision.
            </p>
            <div className="flex gap-4 text-gray-500">
              <Globe size={20} className="hover:text-[#00C896] cursor-pointer transition-colors" />
              <Rss size={20} className="hover:text-[#00C896] cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h5 className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Company</h5>
            <ul className="space-y-4 text-sm font-bold text-gray-400">
              <li>
                <Link to="/about-us" className="hover:text-white cursor-pointer transition-colors">About Us</Link>
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
              <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
              <li>
                <Link to="/contact" className="hover:text-white cursor-pointer transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-6">
            <h5 className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Locations</h5>
            <ul className="space-y-4 text-sm font-bold text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">Bangalore</li>
              <li className="hover:text-white cursor-pointer transition-colors">Chennai</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 lg:col-span-1 space-y-6">
            <h5 className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Newsletter</h5>
            <p className="text-gray-400 text-sm">Stay updated with premium listings.</p>
            <div className="flex p-2 bg-white/5 rounded-2xl border border-white/10 items-center backdrop-blur-sm focus-within:border-white/20 transition-all">
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-transparent px-4 outline-none w-full text-sm font-bold text-white placeholder:text-gray-500" 
              />
              <button className="bg-[#00C896] p-3 rounded-xl text-white shadow-md shadow-green-900/20 hover:bg-[#00b587] transition-colors cursor-pointer">
                <Send size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}