import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-32 pb-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left Side: Info */}
          <div className="space-y-12">
            <div>
              <h1 className="text-6xl font-black text-[#001D3D] leading-[0.9] tracking-tighter mb-6">
                Let’s talk <br /> 
                <span className="text-[#00C896]">Property.</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-md">
                Have questions about a listing or want to partner with us? Our team usually responds within 2 hours.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#00C896]">
                  <Mail size={28} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Email Us</p>
                  <p className="text-lg font-bold text-[#001D3D]">hello@smartgp.com</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#00C896]">
                  <Phone size={28} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Call Us</p>
                  <p className="text-lg font-bold text-[#001D3D]">+91 80 4567 8901</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#00C896]">
                  <MapPin size={28} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Visit HQ</p>
                  <p className="text-lg font-bold text-[#001D3D]">Indiranagar, Bengaluru, KA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="bg-[#001D3D] rounded-[48px] p-8 md:p-12 shadow-2xl shadow-blue-900/30">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#00C896] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Email Address</label>
                  <input 
                    required
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#00C896] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Subject</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#00C896] appearance-none cursor-pointer">
                  <option className="bg-[#001D3D]">General Inquiry</option>
                  <option className="bg-[#001D3D]">Booking Support</option>
                  <option className="bg-[#001D3D]">Property Listing (Owners)</option>
                  <option className="bg-[#001D3D]">Careers</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Message</label>
                <textarea 
                  required
                  rows="4" 
                  placeholder="Tell us how we can help..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#00C896] transition-colors resize-none"
                />
              </div>

              <button 
                disabled={status === 'sending'}
                className="w-full bg-[#00C896] text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:brightness-110 transition-all active:scale-95 disabled:opacity-50"
              >
                {status === 'success' ? (
                  <>Sent Successfully!</>
                ) : (
                  <>Send Message <Send size={20} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}