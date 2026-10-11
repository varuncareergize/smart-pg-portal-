import { useTranslation } from 'react-i18next';
import { translate } from '../i18n';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiAxios from '../api';
import { 
  ArrowLeftIcon, 
  UserPlusIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  BriefcaseIcon,
  BanknotesIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function AddStaff() {
  useTranslation();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    role: 'Takecare',
    email: '',
    phone: '',
    salary_amount: '12000.00',
    property: localStorage.getItem('currentPropertyId') || '1',
    status: 'Active'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiAxios.post('/staff/', formData);
      navigate('/staff'); // Redirect back to directory
    } catch (error) {
      console.error("Error adding staff:", error.response?.data || error.message);
      alert(translate("Failed to add staff. Please check if the email is unique."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page dashboard-form-page space-y-6">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sg-text-muted hover:text-sg-navy transition-colors font-black text-[10px] uppercase tracking-widest"
      >
        <ArrowLeftIcon className="w-4 h-4" /> {translate("Back to Team")} </button>

      <div className="bg-white rounded-[40px] border border-sg-border shadow-sm overflow-hidden">
        <div className="bg-sg-navy p-10 text-white relative overflow-hidden">
          <div className="relative z-10">
            <UserPlusIcon className="w-12 h-12 text-sg-green mb-4" />
            <h1 className="text-3xl font-black italic">{translate("Add Team Member")}</h1>
            <p className="text-white/50 text-xs font-bold uppercase tracking-widest mt-1">{translate("Onboarding New Personnel")}</p>
          </div>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-sg-text-muted ml-1">{translate("Full Name")}</label>
            <input 
              required
              type="text"
              placeholder={translate("e.g. Rajesh Nair")}
              className="w-full bg-sg-bg/50 border-none rounded-2xl p-4 font-bold text-sg-navy focus:ring-2 focus:ring-sg-green transition-all"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Role Dropdown */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-sg-text-muted ml-1">
                <BriefcaseIcon className="w-3 h-3" /> {translate("Assigned Role")} </label>
              <select 
                className="w-full bg-sg-bg/50 border-none rounded-2xl p-4 font-bold text-sg-navy focus:ring-2 focus:ring-sg-green appearance-none"
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                value={formData.role}
              >
                <option value="Kitchen">{translate("Kitchen Staff")}</option>
                <option value="Takecare">{translate("Takecare / Caretaker")}</option>
                <option value="Security">{translate("Security")}</option>
                <option value="Manager">{translate("Property Manager")}</option>
                <option value="Cleaning">{translate("Housekeeping")}</option>
              </select>
            </div>

            {/* Salary */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-sg-text-muted ml-1">
                <BanknotesIcon className="w-3 h-3" /> {translate("Monthly Salary")} </label>
              <input 
                required
                type="number"
                placeholder="15000"
                className="w-full bg-sg-bg/50 border-none rounded-2xl p-4 font-bold text-sg-navy focus:ring-2 focus:ring-sg-green"
                onChange={(e) => setFormData({...formData, salary_amount: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-sg-text-muted ml-1">
                <EnvelopeIcon className="w-3 h-3" /> {translate("Email Address")} </label>
              <input 
                required
                type="email"
                placeholder={translate("staff@mullavanam.com")}
                className="w-full bg-sg-bg/50 border-none rounded-2xl p-4 font-bold text-sg-navy focus:ring-2 focus:ring-sg-green"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-sg-text-muted ml-1">
                <PhoneIcon className="w-3 h-3" /> {translate("Phone Number")} </label>
              <input 
                required
                type="tel"
                placeholder="+91 00000 00000"
                className="w-full bg-sg-bg/50 border-none rounded-2xl p-4 font-bold text-sg-navy focus:ring-2 focus:ring-sg-green"
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-sg-green text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-sg-green/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {translate(loading ? "Processing..." : (
              <>
                <CheckCircleIcon className="w-6 h-6" /> {translate("Confirm Onboarding")} </>
            ))}
          </button>
        </form>
      </div>
    </div>
  );
}