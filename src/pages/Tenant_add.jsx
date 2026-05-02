import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserPlus, 
  ArrowLeft, 
  Save, 
  User, 
  Phone, 
  Mail, 
  Home, 
  Calendar,
  CreditCard,
  ShieldCheck
} from 'lucide-react';

export default function TenantsAdd() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    room_number: '',
    join_date: new Date().toISOString().split('T')[0],
    security_deposit: '',
    monthly_rent: '',
    id_proof_type: 'Aadhar',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // API call to your Django backend
      const response = await fetch('http://127.0.0.1:8000/api/tenants/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Critical for Django session auth
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/tenants');
      }
    } catch (error) {
      console.error("Failed to add tenant:", error);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-[#001D3D] outline-none focus:ring-2 focus:ring-[#00C896]/10 focus:border-[#00C896] transition-all";
  const labelClass = "text-[10px] font-black text-[#001D3D] uppercase tracking-widest ml-1 mb-2 block";

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between pt-4">
        <button 
          onClick={() => navigate('/tenants')}
          className="flex items-center gap-2 text-slate-400 hover:text-[#001D3D] font-bold text-sm transition-colors"
        >
          <ArrowLeft size={18} /> Back to List
        </button>
        <div className="text-right">
          <h2 className="text-2xl font-black text-[#001D3D]">Onboard Tenant</h2>
          <p className="text-slate-400 text-xs font-bold">Add a new resident to SmartPG</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information Section */}
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#00C896]/10 text-[#00C896] rounded-xl flex items-center justify-center">
              <User size={20} strokeWidth={2.5} />
            </div>
            <h3 className="font-black text-[#001D3D]">Personal Details</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className={labelClass}>Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-slate-300" size={18} />
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Varun Nair"
                  className={inputClass}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className={labelClass}>Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 text-slate-300" size={18} />
                <input 
                  type="tel" 
                  required
                  placeholder="+91 00000 00000"
                  className={inputClass}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className={labelClass}>Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-slate-300" size={18} />
                <input 
                  type="email" 
                  placeholder="tenant@example.com"
                  className={inputClass}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Lease & Room Information Section */}
        <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
              <Home size={20} strokeWidth={2.5} />
            </div>
            <h3 className="font-black text-[#001D3D]">Room & Billing</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className={labelClass}>Assigned Room</label>
              <div className="relative">
                <Home className="absolute left-4 top-3.5 text-slate-300" size={18} />
                <input 
                  type="text" 
                  required
                  placeholder="e.g. 204"
                  className={inputClass}
                  onChange={(e) => setFormData({...formData, room_number: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className={labelClass}>Join Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-3.5 text-slate-300" size={18} />
                <input 
                  type="date" 
                  required
                  className={inputClass}
                  value={formData.join_date}
                  onChange={(e) => setFormData({...formData, join_date: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className={labelClass}>Monthly Rent (₹)</label>
              <div className="relative">
                <CreditCard className="absolute left-4 top-3.5 text-slate-300" size={18} />
                <input 
                  type="number" 
                  required
                  placeholder="12000"
                  className={inputClass}
                  onChange={(e) => setFormData({...formData, monthly_rent: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className={labelClass}>Security Deposit (₹)</label>
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-3.5 text-slate-300" size={18} />
                <input 
                  type="number" 
                  required
                  placeholder="24000"
                  className={inputClass}
                  onChange={(e) => setFormData({...formData, security_deposit: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate('/tenants')}
            className="flex-1 py-4 rounded-2xl font-black text-slate-400 hover:bg-slate-100 transition-all uppercase tracking-widest text-[10px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-[2] bg-[#001D3D] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-[#00C896] shadow-xl shadow-[#001D3D]/10 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Processing..." : <><Save size={20} /> Register Tenant</>}
          </button>
        </div>
      </form>
    </div>
  );
}