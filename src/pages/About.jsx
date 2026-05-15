import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Handshake, ShieldCheck, Zap, Users } from 'lucide-react';

export default function AboutUs() {
  const values = [
    {
      icon: <Users className="text-[#00C896]" size={28} />,
      title: "Direct Connection",
      description: "We eliminate the middleman. By facilitating one-to-one communication between landlords and tenants, we ensure transparency and lower costs."
    },
    {
      icon: <Zap className="text-[#00C896]" size={28} />,
      title: "Efficient Booking",
      description: "Our streamlined process helps rental parties get their rooms booked in a proper, organized manner without the usual back-and-forth."
    },
    {
      icon: <ShieldCheck className="text-[#00C896]" size={28} />,
      title: "Broker-Free Zone",
      description: "We believe in a marketplace built on trust, not commissions. Say goodbye to heavy brokerage fees and hidden charges."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-32">
        {/* Simple Hero Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 border-b border-slate-50">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-black text-[#001D3D] tracking-tight mb-6">
              Making rentals <span className="text-[#00C896]">transparent</span> and human.
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed font-medium">
              UULYV is a direct-to-customer rental platform designed to bridge the gap 
              between property owners and seekers. No brokers, no hidden fees—just 
              one-to-one connections.
            </p>
          </div>
        </section>

        {/* The Problem & Vision Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-[#001D3D]">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed">
                Finding a place to stay should be as simple as booking a hotel. Currently, the market 
                is fragmented by brokers who add unnecessary costs and complexity. 
              </p>
              <p className="text-slate-600 leading-relaxed">
                Our vision is to empower the rental party to showcase their property in a 
                professional manner while giving customers a reliable, verified way to 
                find their next home directly from the landlord.
              </p>
              <div className="pt-4">
                <div className="flex items-center gap-4 py-3 border-l-4 border-[#00C896] pl-6 bg-slate-50 rounded-r-xl">
                  <Handshake className="text-[#00C896]" />
                  <span className="font-bold text-[#001D3D]">A marketplace built on mutual trust.</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-100 rounded-[40px] aspect-video overflow-hidden">
               <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000" 
                alt="Professional Workspace" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </section>

        {/* Core Principles (Three Column) */}
        <section className="bg-slate-50 py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Core Principles</span>
              <h2 className="text-4xl font-black text-[#001D3D] mt-2">Why Livzz ??</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((v, i) => (
                <div key={i} className="bg-white p-10 rounded-[32px] shadow-sm border border-slate-100">
                  <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-8">
                    {v.icon}
                  </div>
                  <h3 className="text-xl font-black text-[#001D3D] mb-4">{v.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-black text-[#001D3D] mb-8">Ready to skip the broker?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#001D3D] text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#00C896] transition-all">
                I am a Tenant
              </button>
              <button className="border-2 border-[#001D3D] text-[#001D3D] px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all">
                I am a Landlord
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}