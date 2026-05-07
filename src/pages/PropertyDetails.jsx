import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, Phone, User, CheckCircle, ArrowLeft, 
  Share2, Users, Bed, ShieldCheck, Coffee, 
  Wifi, Wind, Zap, Info, Loader2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/properties/${id}/`);
        const data = await response.json();
        setProperty(data);
        
        // Default select the first room config from API
        if (data.room_configs && data.room_configs.length > 0) {
          setSelectedPlan(data.room_configs[0]);
        }
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPropertyData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-[#00C896]" size={40} />
      </div>
    );
  }

  if (!property) return <div className="p-20 text-center font-black">Property not found.</div>;

  // Helper to split the amenities string from your API into an array
  const amenitiesList = property.amenities_tags ? property.amenities_tags.split(',').map(item => item.trim()) : [];

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
                src={property.image} 
                alt={property.name} 
                className="w-full h-[500px] object-cover rounded-[48px] shadow-2xl"
              />
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl flex items-center gap-2">
                <CheckCircle className="text-[#00C896]" size={20} />
                <span className="font-black text-[#001D3D] text-sm uppercase tracking-widest">SmartPG Verified</span>
              </div>
            </div>

            {/* Title & Location */}
            <div>
              <h1 className="text-5xl font-black text-[#001D3D] mb-4 tracking-tight">{property.name}</h1>
              <div className="flex items-center gap-2 text-slate-500 font-bold">
                <MapPin size={20} className="text-[#00C896]" />
                {property.address}
              </div>
            </div>

            {/* Room Categories */}
            <section>
              <h3 className="text-2xl font-black text-[#001D3D] mb-6 flex items-center gap-3">
                <Bed className="text-[#00C896]" /> Choose Your Sharing Plan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {property.room_configs.map((config) => (
                  <div 
                    key={config.id}
                    onClick={() => setSelectedPlan(config)}
                    className={`cursor-pointer rounded-[32px] p-2 border-2 transition-all ${
                      selectedPlan?.id === config.id ? 'border-[#00C896] bg-green-50/30' : 'border-slate-100 bg-white'
                    }`}
                  >
                    <img src={config.room_image} className="w-full h-32 object-cover rounded-[24px] mb-4" alt={config.room_type_display} />
                    <div className="px-4 pb-4">
                      <h4 className="font-black text-[#001D3D]">{config.room_type_display}</h4>
                      <p className="text-2xl font-black text-[#00C896] mt-1">₹{parseInt(config.price_per_bed).toLocaleString()}<span className="text-xs text-slate-400 font-bold">/mo</span></p>
                      <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase">
                        {config.available_beds > 0 ? `${config.available_beds} Beds Available` : 'Sold Out'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Premium Amenities */}
            <section className="bg-slate-50 rounded-[48px] p-10">
              <h3 className="text-2xl font-black text-[#001D3D] mb-8">Premium Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {amenitiesList.map((label, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#00C896] shadow-sm">
                      <ShieldCheck size={24} />
                    </div>
                    <span className="font-bold text-[#001D3D] text-sm">{label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Policies */}
            <section className="px-4">
              <h3 className="text-2xl font-black text-[#001D3D] mb-6">Property Policies</h3>
              <div className="space-y-4">
                {["1 Month Security Deposit", "30 Days Notice Period", "No Smoking in Rooms"].map((policy, i) => (
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
              <div className="p-8 bg-[#001D3D] rounded-[48px] text-white shadow-2xl shadow-blue-900/30">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">Selected Plan</p>
                <div className="text-3xl font-black mb-1">{selectedPlan?.room_type_display || "Select a Plan"}</div>
                <div className="text-sm font-bold text-[#00C896] mb-8">
                    Starting from ₹{selectedPlan ? parseInt(selectedPlan.price_per_bed).toLocaleString() : "0"}
                </div>
                
                <div className="space-y-6 mb-10 border-t border-white/10 pt-8">
                  <div className="flex items-center gap-4">
                    <User size={24} className="text-[#00C896]" />
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Manager</p>
                      <p className="font-bold">Property Manager</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone size={24} className="text-[#00C896]" />
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Contact</p>
                      <p className="font-bold">+91 Contact Office</p>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-[#00C896] text-white py-5 rounded-3xl font-black text-lg hover:brightness-110 transition-all shadow-xl shadow-green-900/20 active:scale-95">
                  Confirm Booking
                </button>
                <p className="text-center text-[10px] text-slate-500 font-bold mt-4 uppercase tracking-tighter">No brokerage • Instant Move-in</p>
              </div>

              <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                <div className="flex items-center gap-3 mb-2">
                  <Users size={20} className="text-[#001D3D]" />
                  <span className="font-black text-[#001D3D] text-sm">Community Lounge</span>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Join other residents staying at {property.name}. Regular weekend events and networking.
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