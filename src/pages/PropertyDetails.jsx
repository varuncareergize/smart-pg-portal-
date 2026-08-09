import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, Phone, User, CheckCircle, ArrowLeft, 
  Share2, Users, Bed, ShieldCheck, Info, Loader2, RefreshCw, AlertCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BASE_URL = "http://127.0.0.1:8000";
const AUTH_TOKEN = "6288a3edf900378478ea833b695615e6d4c8dd71";
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop";

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const fetchPropertyData = async () => {
    try {
      setLoading(true);
      setError(null);

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${AUTH_TOKEN}`
      };

      let response;
      try {
        response = await fetch(`${BASE_URL}/owner/properties/${id}/`, { method: 'GET', headers });
      } catch (err) {
        // Fallback attempt with localhost
        response = await fetch(`http://localhost:8000/owner/properties/${id}/`, { method: 'GET', headers });
      }

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      // Extract the payload from result.data if encapsulated
      const data = result.data ? result.data : result;

      if (!data || !data.id) {
        throw new Error("Property not found or invalid response format.");
      }

      // Format image URL
      let formattedImage = DEFAULT_IMAGE;
      if (data.image) {
        formattedImage = data.image.startsWith("http") ? data.image : `${BASE_URL}${data.image}`;
      }

      const processedProperty = {
        ...data,
        image: formattedImage
      };

      setProperty(processedProperty);

      // Select initial room config if available, or generate a fallback plan from main price
      if (data.room_configs && data.room_configs.length > 0) {
        setSelectedPlan(data.room_configs[0]);
      } else {
        setSelectedPlan({
          id: 'default',
          room_type_display: data.property_type || 'Standard Sharing',
          price_per_bed: data.price || 0,
          available_beds: data.total_rooms || 1,
          room_image: formattedImage
        });
      }

    } catch (err) {
      console.error("Error fetching property details:", err);
      setError(err.message || "Failed to load property details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPropertyData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-[#00C896]" size={40} />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-black text-[#001D3D] mb-2">Unable to Load Property</h2>
        <p className="text-slate-500 text-sm max-w-md mb-6">{error || "Property does not exist or has been removed."}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-[#001D3D] text-white font-bold rounded-2xl flex items-center gap-2 hover:bg-slate-800 transition"
        >
          <ArrowLeft size={18} /> Go Back
        </button>
      </div>
    );
  }

  // Parse amenities whether provided as an Array or a comma-separated String
  let amenitiesList = [];
  if (Array.isArray(property.amenities)) {
    amenitiesList = property.amenities;
  } else if (typeof property.amenities === 'string') {
    amenitiesList = property.amenities.split(',').map(item => item.trim());
  } else if (property.amenities_tags) {
    amenitiesList = property.amenities_tags.split(',').map(item => item.trim());
  }

  // Normalize location / address string
  const hasValidCity = property.city && property.city !== "undefined" && property.city !== "null";
  const displayAddress = hasValidCity 
    ? `${property.address}, ${property.city}` 
    : property.address || "Location details unavailable";

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4">
        {/* Top Navigation & Share */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-slate-500 font-bold hover:text-[#001D3D] transition-colors"
          >
            <ArrowLeft size={20} /> Back to Search
          </button>
          <div className="flex gap-2">
            <button 
              onClick={() => navigator.clipboard?.writeText(window.location.href)}
              className="p-3 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors"
              title="Share Listing"
            >
              <Share2 size={20} className="text-[#001D3D]" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Hero Image */}
            <div className="relative group">
              <img 
                src={property.image} 
                alt={property.name} 
                className="w-full h-[450px] sm:h-[500px] object-cover rounded-[48px] shadow-2xl"
              />
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg">
                <CheckCircle className="text-[#00C896]" size={20} />
                <span className="font-black text-[#001D3D] text-sm uppercase tracking-widest">UULYV Verified</span>
              </div>
            </div>

            {/* Title & Address */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-emerald-50 text-[#00C896] text-xs font-black rounded-full uppercase tracking-wider">
                  {property.gender_filter || property.property_type || "Co-living"}
                </span>
                {property.rating && (
                  <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full">
                    ★ {property.rating}
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-[#001D3D] mb-4 tracking-tight leading-tight">
                {property.name}
              </h1>
              <div className="flex items-start sm:items-center gap-2 text-slate-500 font-bold text-sm">
                <MapPin size={20} className="text-[#00C896] shrink-0 mt-0.5 sm:mt-0" />
                <span>{displayAddress}</span>
              </div>
            </div>

            {/* Property Description */}
            {property.description && (
              <section className="space-y-3">
                <h3 className="text-xl font-black text-[#001D3D]">About this property</h3>
                <p className="text-slate-600 leading-relaxed font-medium text-sm sm:text-base">
                  {property.description}
                </p>
              </section>
            )}

            {/* Room Sharing Configurations */}
            <section>
              <h3 className="text-2xl font-black text-[#001D3D] mb-6 flex items-center gap-3">
                <Bed className="text-[#00C896]" /> Choose Your Sharing Plan
              </h3>
              
              {property.room_configs && property.room_configs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {property.room_configs.map((config) => {
                    const roomImg = config.room_image 
                      ? (config.room_image.startsWith("http") ? config.room_image : `${BASE_URL}${config.room_image}`) 
                      : property.image;

                    return (
                      <div 
                        key={config.id}
                        onClick={() => setSelectedPlan(config)}
                        className={`cursor-pointer rounded-[32px] p-2 border-2 transition-all ${
                          selectedPlan?.id === config.id ? 'border-[#00C896] bg-green-50/30 shadow-md' : 'border-slate-100 bg-white hover:border-slate-200'
                        }`}
                      >
                        <img 
                          src={roomImg} 
                          className="w-full h-32 object-cover rounded-[24px] mb-4" 
                          alt={config.room_type_display} 
                        />
                        <div className="px-4 pb-4">
                          <h4 className="font-black text-[#001D3D]">{config.room_type_display}</h4>
                          <p className="text-2xl font-black text-[#00C896] mt-1">
                            ₹{parseInt(config.price_per_bed || 0).toLocaleString()}
                            <span className="text-xs text-slate-400 font-bold">/mo</span>
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase tracking-wide">
                            {config.available_beds > 0 ? `${config.available_beds} Beds Available` : 'Sold Out'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Fallback layout if room_configs array is empty */
                <div className="bg-slate-50 border-2 border-[#00C896] p-6 rounded-[32px] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-black text-[#001D3D] text-lg">{property.property_type || "Standard Stay"}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      {property.total_rooms ? `${property.total_rooms} Rooms Available` : 'Ready for Move-in'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-[#00C896]">
                      ₹{parseInt(property.price || 0).toLocaleString()}
                      <span className="text-xs text-slate-400 font-bold">/mo</span>
                    </p>
                  </div>
                </div>
              )}
            </section>

            {/* Premium Amenities */}
            <section className="bg-slate-50 rounded-[48px] p-8 sm:p-10">
              <h3 className="text-2xl font-black text-[#001D3D] mb-8">Included Amenities</h3>
              {amenitiesList.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {amenitiesList.map((label, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#00C896] shadow-sm shrink-0">
                        <ShieldCheck size={24} />
                      </div>
                      <span className="font-bold text-[#001D3D] text-sm">{label}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 font-medium">Standard co-living amenities included.</p>
              )}
            </section>

            {/* Property Policies */}
            <section className="px-2">
              <h3 className="text-2xl font-black text-[#001D3D] mb-6">Property Policies</h3>
              <div className="space-y-4">
                {["1 Month Security Deposit Required", "30 Days Notice Period for Vacating", "No Smoking in Common & Room Areas"].map((policy, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                    <Info size={18} className="text-slate-400 shrink-0" />
                    {policy}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Booking & Owner Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              
              <div className="p-8 bg-[#001D3D] rounded-[48px] text-white shadow-2xl shadow-blue-900/20">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">Selected Plan</p>
                <div className="text-2xl font-black mb-1">
                  {selectedPlan?.room_type_display || property.property_type || "Standard Stay"}
                </div>
                <div className="text-lg font-bold text-[#00C896] mb-8">
                  ₹{selectedPlan ? parseInt(selectedPlan.price_per_bed || property.price || 0).toLocaleString() : parseInt(property.price || 0).toLocaleString()} <span className="text-xs text-slate-300 font-medium">/ month</span>
                </div>
                
                <div className="space-y-6 mb-10 border-t border-white/10 pt-8">
                  <div className="flex items-center gap-4">
                    <User size={24} className="text-[#00C896] shrink-0" />
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Property Manager</p>
                      <p className="font-bold text-sm">
                        {property.owner?.name && property.owner.name.trim() !== "" 
                          ? property.owner.name 
                          : "UULYV Resident Desk"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone size={24} className="text-[#00C896] shrink-0" />
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Contact</p>
                      <p className="font-bold text-sm">
                        {property.owner?.contact_number && property.owner.contact_number.trim() !== "" 
                          ? property.owner.contact_number 
                          : "+91 Support Desk"}
                      </p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => alert(`Booking initiated for ${property.name}`)}
                  className="w-full bg-[#00C896] text-white py-5 rounded-3xl font-black text-lg hover:brightness-110 transition-all shadow-xl shadow-green-900/20 active:scale-95"
                >
                  Confirm Booking
                </button>
                <p className="text-center text-[10px] text-slate-400 font-bold mt-4 uppercase tracking-wider">
                  Zero Brokerage • Instant Move-In
                </p>
              </div>

              {/* Community Banner */}
              <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                <div className="flex items-center gap-3 mb-2">
                  <Users size={20} className="text-[#001D3D]" />
                  <span className="font-black text-[#001D3D] text-sm">Community Lounge</span>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Join other verified residents staying at {property.name}. Access social spaces and community events.
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