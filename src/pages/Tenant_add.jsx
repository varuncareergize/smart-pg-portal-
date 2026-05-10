import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  User, 
  Phone, 
  Mail, 
  Home, 
  Calendar,
  CreditCard,
  Fingerprint,
  Image as ImageIcon
} from 'lucide-react';

export default function TenantsAdd() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]); 
  const [roomsLoading, setRoomsLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    room: '', 
    join_date: new Date().toISOString().split('T')[0],
    security_deposit: '',
    monthly_rent: '',
    id_proof_type: 'Aadhar',
    is_paid: false, // Defaulting to false
  });
  const [idImage, setIdImage] = useState(null);

  // Fetch available rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setRoomsLoading(true);
        const response = await fetch('https://smart-pg-backend.onrender.com/rooms/');
        if (!response.ok) throw new Error('Failed to fetch rooms');
        
        const data = await response.json();
        // Handle DRF pagination if it exists
        setRooms(Array.isArray(data) ? data : data.results || []);
      } catch (error) {
        console.error("Room Fetch Error:", error);
      } finally {
        setRoomsLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.room) {
      alert("Please select a room first!");
      return;
    }

    setLoading(true);
    const uploadData = new FormData();
    
    // Append all fields to FormData
    Object.keys(formData).forEach(key => {
      uploadData.append(key, formData[key]);
    });
    
    // Append File if exists
    if (idImage) {
      uploadData.append('id_proof_image', idImage);
    }

    try {
      const response = await fetch('https://smart-pg-backend.onrender.com/tenants/', {
        method: 'POST',
        body: uploadData, // Browser handles Content-Type for FormData
      });

      if (response.ok) {
        navigate('/tenants');
      } else {
        const errorData = await response.json();
        console.error("Server Error:", errorData);
        alert("Registration failed. Please check the logs.");
      }
    } catch (error) {
      console.error("Network Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-[#001D3D] outline-none focus:ring-2 focus:ring-[#00C896]/10 focus:border-[#00C896] transition-all appearance-none";
  const labelClass = "text-[10px] font-black text-[#001D3D] uppercase tracking-widest ml-1 mb-2 block";
  const sectionCardClass = "bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden";

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 px-4">
      {/* Header */}
      <div className="flex items-center justify-between pt-8">
        <button 
          onClick={() => navigate('/tenants')}
          className="group flex items-center gap-2 text-slate-400 hover:text-[#001D3D] font-bold text-sm transition-colors"
        >
          <div className="p-2 rounded-full group-hover:bg-slate-100 transition-all">
            <ArrowLeft size={18} /> 
          </div>
          Back to List
        </button>
        <div className="text-right">
          <h2 className="text-3xl font-black text-[#001D3D] italic">Onboard Resident</h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-tighter">SmartPG Management System</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section 01: Personal Profile */}
        <div className={sectionCardClass}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#00C896]/10 text-[#00C896] rounded-xl flex items-center justify-center">
              <User size={20} strokeWidth={2.5} />
            </div>
            <h3 className="font-black text-[#001D3D] uppercase text-sm tracking-wide">01. Personal Profile</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className={labelClass}>Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-slate-300" size={18} />
                <input 
                  type="text" required placeholder="Full Name" className={inputClass}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className={labelClass}>Contact Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 text-slate-300" size={18} />
                <input 
                  type="tel" required placeholder="Phone Number" className={inputClass}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 02: Room Allocation */}
        <div className={sectionCardClass}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
              <Home size={20} strokeWidth={2.5} />
            </div>
            <h3 className="font-black text-[#001D3D] uppercase text-sm tracking-wide">02. Room Allocation</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className={labelClass}>Assign Room</label>
              <div className="relative">
                <Home className="absolute left-4 top-3.5 text-slate-300" size={18} />
                <select 
                  required
                  className={inputClass}
                  value={formData.room}
                  onChange={(e) => setFormData({...formData, room: e.target.value})}
                >
                  <option value="">
                    {roomsLoading ? "Loading rooms..." : "Choose available room..."}
                  </option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      Room {room.room_number} — {room.room_type || 'Standard'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className={labelClass}>Joining Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-3.5 text-slate-300" size={18} />
                <input 
                  type="date" required className={inputClass} value={formData.join_date}
                  onChange={(e) => setFormData({...formData, join_date: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 03: Identity Verification */}
        <div className={sectionCardClass}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center">
              <Fingerprint size={20} strokeWidth={2.5} />
            </div>
            <h3 className="font-black text-[#001D3D] uppercase text-sm tracking-wide">03. Verification</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className={labelClass}>ID Type</label>
              <select 
                className={inputClass.replace("pl-11", "pl-4")}
                onChange={(e) => setFormData({...formData, id_proof_type: e.target.value})}
              >
                <option value="Aadhar">Aadhar Card</option>
                <option value="PAN">PAN Card</option>
                <option value="Passport">Passport</option>
                <option value="Driving License">Driving License</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Upload ID Proof (Photo)</label>
              <div className="relative">
                <input 
                  type="file" 
                  accept="image/*"
                  className="hidden" 
                  id="id-upload"
                  onChange={(e) => setIdImage(e.target.files[0])}
                />
                <label 
                  htmlFor="id-upload" 
                  className="flex items-center gap-2 w-full px-4 py-3 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-xs font-bold text-slate-400 cursor-pointer hover:border-[#00C896] hover:text-[#00C896] transition-all"
                >
                  <ImageIcon size={18} />
                  {idImage ? idImage.name : "Select Image File..."}
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Section 04: Billing Details */}
        <div className={sectionCardClass}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
              <CreditCard size={20} strokeWidth={2.5} />
            </div>
            <h3 className="font-black text-[#001D3D] uppercase text-sm tracking-wide">04. Billing Details</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className={labelClass}>Monthly Rent (₹)</label>
              <input 
                type="number" required placeholder="8000" className={inputClass.replace("pl-11", "pl-6")}
                onChange={(e) => setFormData({...formData, monthly_rent: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className={labelClass}>Security Deposit (₹)</label>
              <input 
                type="number" required placeholder="16000" className={inputClass.replace("pl-11", "pl-6")}
                onChange={(e) => setFormData({...formData, security_deposit: e.target.value})}
              />
            </div>

            {/* ✅ UPDATED BOOLEAN LOGIC */}
            <div className="space-y-1">
              <label className={labelClass}>Current Payment Status</label>
              <select 
                className={inputClass.replace("pl-11", "pl-4")}
                value={formData.is_paid.toString()} // Ensure UI reflects the boolean state
                onChange={(e) => setFormData({
                  ...formData, 
                  is_paid: e.target.value === 'true' // Logic: 'true' string becomes True boolean
                })}
              >
                <option value="false">Unpaid</option>
                <option value="true">Paid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/tenants')}
            className="flex-1 py-4 rounded-3xl font-black text-slate-400 hover:bg-slate-100 transition-all uppercase tracking-widest text-[11px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-[2] bg-[#001D3D] text-white py-4 rounded-3xl font-black flex items-center justify-center gap-3 hover:bg-[#00C896] shadow-2xl shadow-[#001D3D]/20 transition-all active:scale-[0.97] disabled:opacity-50"
          >
            {loading ? "Registering..." : <><Save size={22} /> Register Tenant</>}
          </button>
        </div>
      </form>
    </div>
  );
}