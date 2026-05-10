import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function AddRoom() {
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
    fetch('https://smart-pg-backend.onrender.com/properties/all') // Adjust this to your actual properties endpoint
      .then(res => res.json())
      .then(data => setProperties(data))
      .catch(err => console.error("Error fetching properties:", err));
  }, []);

  // 2. Handle the Form Submission to your 'rooms/' API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://smart-pg-backend.onrender.com/rooms/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include Authorization headers here if you use Token/JWT
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Room Created:", result);
        navigate('/rooms'); 
      } else {
        const errorData = await response.json();
        console.error("Server Error:", errorData);
        alert("Failed to save room. Check field requirements.");
      }
    } catch (err) {
      console.error("Network Error:", err);
      alert("Could not connect to the server.");
    }
  };

  return (
    <div className="container-custom max-w-2xl py-10">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-sg-text-muted hover:text-sg-navy font-black text-xs uppercase tracking-widest mb-8 transition-colors"
      >
        <ArrowLeftIcon className="w-4 h-4" /> Back to Inventory
      </button>

      <div className="bg-white rounded-[40px] border border-sg-border p-8 md:p-12 shadow-sm">
        <div className="mb-10">
          <h2 className="text-3xl font-black text-sg-navy italic">Add New Room</h2>
          <p className="text-sg-text-muted font-medium mt-1">Register a new asset to your property listing.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Room Number */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sg-navy ml-1">Room Number</label>
              <input 
                type="text"
                required
                className="w-full bg-sg-bg border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-sg-green transition-all"
                placeholder="e.g. 101"
                onChange={(e) => setFormData({...formData, room_number: e.target.value})}
              />
            </div>

            {/* Property Select - Dynamic */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sg-navy ml-1">Property</label>
              <select 
                required
                className="w-full bg-sg-bg border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-sg-green appearance-none"
                value={formData.property}
                onChange={(e) => setFormData({...formData, property: e.target.value})}
              >
                <option value="">Select Property</option>
                {properties.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sharing Type Buttons */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-sg-navy ml-1">Sharing Type</label>
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
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sg-navy ml-1">Total Beds</label>
              <input 
                type="number"
                required
                className="w-full bg-sg-bg border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-sg-green transition-all"
                placeholder="Total capacity"
                onChange={(e) => setFormData({...formData, total_beds: parseInt(e.target.value)})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sg-navy ml-1">Already Occupied</label>
              <input 
                type="number"
                defaultValue={0}
                className="w-full bg-sg-bg border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-sg-green transition-all"
                onChange={(e) => setFormData({...formData, occupied_beds: parseInt(e.target.value) || 0})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-sg-navy ml-1">Monthly Rent (₹)</label>
            <input 
              type="number"
              step="0.01"
              required
              className="w-full bg-sg-bg border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-sg-green transition-all"
              placeholder="e.g. 12000"
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
            <label htmlFor="is_active" className="text-xs font-bold text-sg-navy uppercase">Is Active / Listed</label>
          </div>

          <button 
            type="submit"
            className="w-full bg-sg-green text-white py-5 rounded-[24px] font-black text-lg shadow-lg shadow-sg-green/20 hover:scale-[1.01] active:scale-[0.98] transition-all mt-4"
          >
            Save Room Entry
          </button>
        </form>
      </div>
    </div>
  );
}