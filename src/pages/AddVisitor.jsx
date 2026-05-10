import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, UserPlus, ShieldCheck, Phone, 
  Home, FileText, Loader2 
} from 'lucide-react';

export default function AddVisitor() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize with the current property ID from your owner's session
  const currentPropertyId = localStorage.getItem('currentPropertyId') || '1';

  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    room: '', // Must be the ID of the room
    property: currentPropertyId, 
    purpose: 'Relative',
    resident_name: '',
    status: 'Checked-In'
  });

  // Fetch rooms for the current property so the user can select one
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`https://smart-pg-backend.onrender.com/rooms/?property_id=${currentPropertyId}`);
        setRooms(response.data);
      } catch (error) {
        console.error("Failed to load rooms:", error);
      }
    };
    fetchRooms();
  }, [currentPropertyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // POST directly to your visitors endpoint
      await axios.post('https://smart-pg-backend.onrender.com/visitors/', formData);
      navigate('/visitors'); 
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      alert("Registration failed. Please check your inputs.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 hover:text-[#001D3D] transition-colors mb-6"
      >
        <ArrowLeft size={18} />
        <span className="text-[10px] font-black uppercase tracking-widest">Back to Logs</span>
      </button>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-[#001D3D] p-8 text-white">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-white/10 rounded-2xl">
              <UserPlus className="text-[#00C896]" size={24} />
            </div>
            <h1 className="text-2xl font-black italic">New Visitor</h1>
          </div>
          <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Security Gate Entry</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              <FileText size={12} /> Full Name
            </label>
            <input 
              required
              type="text"
              placeholder="Enter visitor name"
              className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-[#001D3D] focus:ring-2 focus:ring-[#00C896] transition-all"
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                <Phone size={12} /> Phone Number
              </label>
              <input 
                required
                type="tel"
                placeholder="+91 00000 00000"
                className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-[#001D3D] focus:ring-2 focus:ring-[#00C896] transition-all"
                onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
                <Home size={12} /> Target Room
              </label>
              <select 
                required
                className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-[#001D3D] focus:ring-2 focus:ring-[#00C896] transition-all appearance-none"
                onChange={(e) => setFormData({...formData, room: e.target.value})}
              >
                <option value="">Select Room</option>
                {rooms.map(r => (
                  <option key={r.id} value={r.id}>{r.room_number}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
              Resident To Visit
            </label>
            <input 
              required
              type="text"
              placeholder="Who are they visiting?"
              className="w-full bg-slate-50 border-none rounded-2xl p-4 font-bold text-[#001D3D] focus:ring-2 focus:ring-[#00C896] transition-all"
              onChange={(e) => setFormData({...formData, resident_name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Purpose of Visit</label>
            <div className="flex flex-wrap gap-2">
              {['Relative', 'Delivery', 'Maintenance', 'Guest'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setFormData({...formData, purpose: p})}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${
                    formData.purpose === p ? 'bg-[#001D3D] text-white' : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#00C896] text-white py-5 rounded-[24px] font-black text-lg shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : <ShieldCheck size={24} />}
              {isSubmitting ? 'Registering...' : 'Verify & Check In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}