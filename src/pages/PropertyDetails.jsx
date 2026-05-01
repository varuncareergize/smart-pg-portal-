import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, Phone, User, CheckCircle, ArrowLeft, 
  Share2, Users, Bed, ShieldCheck, Coffee, 
  Wifi, Wind, Zap, Info
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State to track which room category is selected for booking
  const [selectedPlan, setSelectedPlan] = useState('Double Sharing');

  const property = {
    title: "Luxury Studio in Indiranagar",
    location: "12th Main, Indiranagar, Bengaluru",
    contact: "+91 98765 43210",
    manager: "Suresh Kumar",
    description: "Experience premium living in the heart of the city. This property is designed for young professionals and students who value comfort, community, and connectivity.",
    mainImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=2000",
    
    // Room Sharing Options
    sharingOptions: [
      { 
        type: "Single Sharing", 
        price: "₹24,000", 
        desc: "Private room for ultimate focus.",
        img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800" 
      },
      { 
        type: "Double Sharing", 
        price: "₹15,000", 
        desc: "Perfect balance of social & private.",
        img: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800" 
      },
      { 
        type: "Triple Sharing", 
        price: "₹11,500", 
        desc: "Budget friendly community living.",
        img: "https://images.unsplash.com/photo-1555854817-5b2738f7516d?auto=format&fit=crop&q=80&w=800" 
      },
    ],

    amenities: [
      { icon: Wifi, label: "500 Mbps Wi-Fi" },
      { icon: Wind, label: "AC Rooms" },
      { icon: Zap, label: "24/7 Power" },
      { icon: Coffee, label: "Common Kitchen" },
      { icon: ShieldCheck, label: "CCTV Security" },
      { icon: Bed, label: "Premium Linen" },
    ],
    
    policies: ["1 Month Security Deposit", "30 Days Notice Period", "No Smoking in Rooms"]
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4">
        {/* Top Actions */}
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 font-bold hover:text-[#001D3D] transition-colors">
            <ArrowLeft size={20} /> Back to Search
          </button>
          <div className="flex gap-2">
            <button className="p-3 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors">
              <Share2 size={20} className="text-[#001D3D]" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Hero Image */}
            <div className="relative group">
              <img 
                src={property.mainImage} 
                alt="Main" 
                className="w-full h-[500px] object-cover rounded-[48px] shadow-2xl"
              />
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl flex items-center gap-2">
                <CheckCircle className="text-[#00C896]" size={20} />
                <span className="font-black text-[#001D3D] text-sm uppercase tracking-widest">SmartPG Verified</span>
              </div>
            </div>

            {/* Title & Location */}
            <div>
              <h1 className="text-5xl font-black text-[#001D3D] mb-4 tracking-tight">{property.title}</h1>
              <div className="flex items-center gap-2 text-slate-500 font-bold">
                <MapPin size={20} className="text-[#00C896]" />
                {property.location}
              </div>
            </div>

            {/* Room Categories - NEW SECTION */}
            <section>
              <h3 className="text-2xl font-black text-[#001D3D] mb-6 flex items-center gap-3">
                <Bed className="text-[#00C896]" /> Choose Your Sharing Plan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {property.sharingOptions.map((option) => (
                  <div 
                    key={option.type}
                    onClick={() => setSelectedPlan(option.type)}
                    className={`cursor-pointer rounded-[32px] p-2 border-2 transition-all ${
                      selectedPlan === option.type ? 'border-[#00C896] bg-green-50/30' : 'border-slate-100 bg-white'
                    }`}
                  >
                    <img src={option.img} className="w-full h-32 object-cover rounded-[24px] mb-4" alt={option.type} />
                    <div className="px-4 pb-4">
                      <h4 className="font-black text-[#001D3D]">{option.type}</h4>
                      <p className="text-2xl font-black text-[#00C896] mt-1">{option.price}<span className="text-xs text-slate-400 font-bold">/mo</span></p>
                      <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase">{option.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Amenities Grid */}
            <section className="bg-slate-50 rounded-[48px] p-10">
              <h3 className="text-2xl font-black text-[#001D3D] mb-8">Premium Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {property.amenities.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#00C896] shadow-sm">
                      <item.icon size={24} />
                    </div>
                    <span className="font-bold text-[#001D3D] text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Policies */}
            <section className="px-4">
              <h3 className="text-2xl font-black text-[#001D3D] mb-6">Property Policies</h3>
              <div className="space-y-4">
                {property.policies.map((policy, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                    <Info size={18} className="text-slate-300" />
                    {policy}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              {/* Main Booking Card */}
              <div className="p-8 bg-[#001D3D] rounded-[48px] text-white shadow-2xl shadow-blue-900/30">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">Selected Plan</p>
                <div className="text-3xl font-black mb-1">{selectedPlan}</div>
                <div className="text-sm font-bold text-[#00C896] mb-8">Starting from {property.sharingOptions.find(o => o.type === selectedPlan).price}</div>
                
                <div className="space-y-6 mb-10 border-t border-white/10 pt-8">
                  <div className="flex items-center gap-4">
                    <User size={24} className="text-[#00C896]" />
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Manager</p>
                      <p className="font-bold">{property.manager}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone size={24} className="text-[#00C896]" />
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Contact</p>
                      <p className="font-bold">{property.contact}</p>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-[#00C896] text-white py-5 rounded-3xl font-black text-lg hover:brightness-110 transition-all shadow-xl shadow-green-900/20 active:scale-95">
                  Confirm Booking
                </button>
                <p className="text-center text-[10px] text-slate-500 font-bold mt-4 uppercase tracking-tighter">No brokerage • Instant Move-in</p>
              </div>

              {/* Quick Help Card */}
              <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                <div className="flex items-center gap-3 mb-2">
                  <Users size={20} className="text-[#001D3D]" />
                  <span className="font-black text-[#001D3D] text-sm">Community Lounge</span>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Join 20+ other professionals staying at this property. Regular weekend events and networking.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}