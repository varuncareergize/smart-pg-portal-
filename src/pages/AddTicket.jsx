import { useTranslation } from 'react-i18next';
import { translate } from '../i18n';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiAxios from '../api';
import { ArrowLeftIcon, UserIcon, WrenchIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function AddTicket() {
  useTranslation();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [staffList, setStaffList] = useState([]); // To store staff from DB
  
  const [formData, setFormData] = useState({
    issue: '',
    unit_details: '',
    category: 'General',
    priority: 'LOW',
    property: 1,         // Default Property ID
    assigned_staff: '',  // Starts empty until user picks
  });

  // Fetch staff members when page loads
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await apiAxios.get('/staff/'); 
        setStaffList(res.data);
        // Automatically select the first staff member if available
        if (res.data.length > 0) {
          setFormData(prev => ({ ...prev, assigned_staff: res.data[0].id }));
        }
      } catch (err) {
        console.error("Failed to load staff:", err);
      }
    };
    fetchStaff();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiAxios.post('/tickets/', formData);
      navigate('/maintenance'); 
    } catch (err) {
      console.error("DJANGO ERROR:", err.response?.data);
      alert("Error: " + JSON.stringify(err.response?.data));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page dashboard-form-page space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-slate-800 font-black text-xs uppercase tracking-widest transition-colors">
        <ArrowLeftIcon className="w-4 h-4 stroke-[3px]" /> {translate("Back")} </button>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl p-10">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-8">{translate("New Ticket")}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Issue Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">{translate("What is the issue?")}</label>
            <div className="relative">
              <WrenchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input required className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 font-bold outline-none focus:border-emerald-500 transition-all"
                placeholder={translate("Leakage, broken tile, etc.")}
                onChange={(e) => setFormData({...formData, issue: e.target.value})} />
            </div>
          </div>

          {/* Location Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">{translate("Room / Location")}</label>
            <div className="relative">
              <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input required className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 font-bold outline-none focus:border-emerald-500 transition-all"
                placeholder={translate("e.g. Unit 204")}
                onChange={(e) => setFormData({...formData, unit_details: e.target.value})} />
            </div>
          </div>

          {/* Staff Selection Dropdown */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">{translate("Assign Staff")}</label>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <select 
                required
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 font-bold outline-none focus:border-emerald-500 transition-all appearance-none"
                value={formData.assigned_staff}
                onChange={(e) => setFormData({...formData, assigned_staff: e.target.value})}
              >
                <option value="">{translate("Select a staff member")}</option>
                {staffList.map((staff) => (
                  <option key={staff.id} value={staff.id}>
                    {staff.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Priority & Category Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">{translate("Priority")}</label>
              <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-4 font-bold outline-none"
                onChange={(e) => setFormData({...formData, priority: e.target.value})}>
                <option value="LOW">{translate("Low")}</option>
                <option value="MEDIUM">{translate("Medium")}</option>
                <option value="HIGH">{translate("High")}</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-1">{translate("Category")}</label>
              <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-4 font-bold outline-none"
                onChange={(e) => setFormData({...formData, category: e.target.value})}>
                <option value="General">{translate("General")}</option>
                <option value="Plumbing">{translate("Plumbing")}</option>
                <option value="Electrical">{translate("Electrical")}</option>
              </select>
            </div>
          </div>

          <button disabled={loading} type="submit" className="w-full bg-emerald-500 text-white py-5 rounded-[24px] font-black uppercase tracking-widest text-sm hover:bg-slate-900 transition-all shadow-xl shadow-emerald-100">
            {translate(loading ? "Processing..." : "Create Ticket")}
          </button>
        </form>
      </div>
    </div>
  );
}