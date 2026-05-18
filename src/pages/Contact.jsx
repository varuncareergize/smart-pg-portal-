import React, { useState } from 'react';
import { Check, Phone, Mail, ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    // Rich, multi-layered dark mesh background
    <div className="min-h-screen bg-[#030207] text-white font-sans antialiased relative overflow-hidden">
      {/* Subtle ambient light glows in the background */}
      <div className="absolute top-24 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-24 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="pt-36 pb-28 px-4 max-w-7xl mx-auto relative z-10">
        
        {/* Next-Gen Shared Container with fine micro-borders */}
        <div className="w-full max-w-6xl mx-auto bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.5)] grid grid-cols-1 lg:grid-cols-12">
          
          {/* LEFT PANEL: Modern Tech Copywriting & Features (5 Columns) */}
          <div className="lg:col-span-5 p-8 md:p-14 flex flex-col justify-between bg-gradient-to-b from-white/[0.02] to-transparent">
            <div className="space-y-8">
              {/* Premium Pill Badge */}
             
              <div className="space-y-4">
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
                  Scale Your <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400">
                    Property Empire.
                  </span>
                </h1>
                <p className="text-slate-400 text-sm md:text-base font-normal leading-relaxed">
                  Ditch the notebooks. Automate operations, plug revenue leaks, and keep tenants delighted with Livzz.
                </p>
              </div>

              {/* Enhanced Visual Feature List */}
              <div className="space-y-5 pt-2">
                <div className="flex items-start gap-4 group">
                  <div className="mt-0.5 w-6 h-6 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                    <Zap size={14} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Smart Automated Rent Reminders</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Gentle WhatsApp prompts that clear dues without awkward calls.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="mt-0.5 w-6 h-6 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0 text-violet-400 group-hover:bg-violet-500 group-hover:text-white transition-all duration-300">
                    <Check size={14} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">100% Tax & Digital Footprint Privacy</h4>
                    <p className="text-xs text-slate-400 mt-0.5">A flexible ledger structured like your personal private diary.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="mt-0.5 w-6 h-6 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center flex-shrink-0 text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
                    <ShieldCheck size={14} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Instant One-Click Onboarding</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Upload all your resident information in minutes hassle-free.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Clean, Minimalist Contact Channels */}
            <div className="flex flex-wrap gap-4 pt-10 border-t border-white/[0.06] mt-8 lg:mt-0">
              <a href="tel:+918069451894" className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors">
                <Phone size={14} className="text-indigo-400" />
                <span>+91 80694-51894</span>
              </a>
              <span className="text-white/20 hidden sm:inline">•</span>
              <a href="mailto:hello@livzzapp.com" className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors">
                <Mail size={14} className="text-indigo-400" />
                <span>hello@livzzapp.com</span>
              </a>
            </div>
          </div>

          {/* RIGHT PANEL: Floating Minimalist Form (7 Columns) */}
          <div className="lg:col-span-7 p-4 md:p-8 flex items-center justify-center bg-white/[0.01]">
            <div className="w-full bg-white text-slate-900 rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
              
              {/* Accent element to break visual monotony */}
              <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500" />

              <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  Experience Smarter Management
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Book a personalized walk-through with our product specialists.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 ml-1">Your Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g., Rajesh Kumar"
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 ml-1">Company / PG Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g., Stanza Living"
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 ml-1">Total Capacity (Beds)</label>
                  <input 
                    required
                    type="number" 
                    placeholder="How many tenants do you manage?"
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 ml-1">City Location</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g., Bengaluru"
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 ml-1">Contact Number</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="Ten-digit mobile number"
                      className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 ml-1">Additional Requirements (Optional)</label>
                  <textarea 
                    rows="3" 
                    placeholder="Tell us about any specific operational bottlenecks you face..."
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all resize-none"
                  />
                </div>

                {/* Animated Interactive Gradient Button */}
                <button 
                  disabled={status === 'sending'}
                  className="w-full mt-3 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 hover:opacity-95 text-white py-4 rounded-xl font-semibold text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.99] disabled:opacity-50 shadow-xl shadow-indigo-600/20 group"
                >
                  {status === 'sending' ? (
                    'Securing Your Demo slot...'
                  ) : status === 'success' ? (
                    'Awesome, Talk Soon!'
                  ) : (
                    <>
                      <span>Secure Free Demo Access</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}