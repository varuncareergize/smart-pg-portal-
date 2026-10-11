import { useTranslation } from 'react-i18next';
import { translate } from '../i18n';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { apiFetch } from '../api';

export default function AddRoom() {
  useTranslation();

  const navigate = useNavigate();
  const [properties, setProperties] = useState([]); // To store properties from API
  
  const [formData, setFormData] = useState({
    room_number: '',
    property: '',
    sharing_type: 1,
    total_beds: '',
    occupied_beds: 0,
    rent: '',
    is_active: true
  });

  // 1. Fetch properties so the dropdown has real data
  useEffect(() => {
    apiFetch('/properties/')
      .then(res => res.json())
      .then(data => setProperties(data.data || []))
      .catch(err => console.error("Error fetching properties:", err));
  }, []);

  // 2. Handle the Form Submission to your 'rooms/' API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiFetch('/rooms/', {
        method: 'POST',
        body: JSON.stringify({ ...formData, sharing_type: typeof formData.sharing_type === 'number' ? ['Single Sharing', 'Double Sharing', 'Triple Sharing', 'Four Sharing'][formData.sharing_type - 1] : formData.sharing_type }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Room Created:", result);
        navigate('/rooms'); 
      } else {
        const errorData = await response.json();
        console.error("Server Error:", errorData);
        alert(translate("Failed to save room. Check field requirements."));
      }
    } catch (err) {
      console.error("Network Error:", err);
      alert(translate("Could not connect to the server."));
    }
  };

  return (
    <div className="dashboard-page dashboard-form-page">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-sg-text-muted hover:text-sg-navy font-black text-xs uppercase tracking-widest mb-8 transition-colors"
      >
        <ArrowLeftIcon className="w-4 h-4" /> {translate("Back to Inventory")} </button>

      <div className="bg-white rounded-[40px] border border-sg-border p-8 md:p-12 shadow-sm">
        <div className="mb-10">
          <h2 className="text-3xl font-black text-sg-navy italic">{translate("Add New Room")}</h2>
          <p className="text-sg-text-muted font-medium mt-1">{translate("Register a new asset to your property listing.")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Room Number */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sg-navy ml-1">{translate("Room Number")}</label>
              <input 
                type="text"
                required
                className="w-full bg-sg-bg border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-sg-green transition-all"
                placeholder={translate("e.g. 101")}
                onChange={(e) => setFormData({...formData, room_number: e.target.value})}
              />
            </div>

            {/* Property Select - Dynamic */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sg-navy ml-1">{translate("Property")}</label>
              <select 
                required
                className="w-full bg-sg-bg border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-sg-green appearance-none"
                value={formData.property}
                onChange={(e) => setFormData({...formData, property: e.target.value})}
              >
                <option value="">{translate("Select Property")}</option>
                {properties.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sharing Type Buttons */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-sg-navy ml-1">{translate("Sharing Type")}</label>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Single', val: 1 },
                { label: 'Double', val: 2 },
                { label: 'Triple', val: 3 },
                { label: 'Four', val: 4 }
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setFormData({...formData, sharing_type: opt.val})}
                  className={`py-3 rounded-xl text-[10px] font-black uppercase transition-all ${
                    formData.sharing_type === opt.val ? 'bg-sg-navy text-white' : 'bg-sg-bg text-sg-text-muted'
                  }`}
                >
                  {translate(opt.label)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sg-navy ml-1">{translate("Total Beds")}</label>
              <input 
                type="number"
                required
                className="w-full bg-sg-bg border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-sg-green transition-all"
                placeholder={translate("Total capacity")}
                onChange={(e) => setFormData({...formData, total_beds: parseInt(e.target.value)})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sg-navy ml-1">{translate("Already Occupied")}</label>
              <input 
                type="number"
                defaultValue={0}
                className="w-full bg-sg-bg border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-sg-green transition-all"
                onChange={(e) => setFormData({...formData, occupied_beds: parseInt(e.target.value) || 0})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-sg-navy ml-1">{translate("Monthly Rent (₹)")}</label>
            <input 
              type="number"
              step="0.01"
              required
              className="w-full bg-sg-bg border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-sg-green transition-all"
              placeholder={translate("e.g. 12000")}
              onChange={(e) => setFormData({...formData, rent: e.target.value})}
            />
          </div>

          <div className="flex items-center gap-3 p-4 bg-sg-bg rounded-2xl">
            <input 
              type="checkbox" 
              checked={formData.is_active}
              id="is_active"
              className="w-5 h-5 accent-sg-green"
              onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
            />
            <label htmlFor="is_active" className="text-xs font-bold text-sg-navy uppercase">{translate("Is Active / Listed")}</label>
          </div>

          <button 
            type="submit"
            className="w-full bg-sg-green text-white py-5 rounded-[24px] font-black text-lg shadow-lg shadow-sg-green/20 hover:scale-[1.01] active:scale-[0.98] transition-all mt-4"
          > {translate("Save Room Entry")} </button>
        </form>
      </div>
    </div>
  );
}
