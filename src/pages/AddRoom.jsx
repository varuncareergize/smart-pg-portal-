import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, HomeIcon } from '@heroicons/react/24/outline';

export default function AddRoom() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    roomNo: '',
    property: '',
    type: 'Single Sharing',
    price: '',
    status: 'Available'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Room Data:", formData);
    // Add logic to save data here
    navigate('/rooms'); // Redirect back after saving
  };

  return (
    <div className="container-custom max-w-2xl py-10">
      {/* Back Button */}
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
                onChange={(e) => setFormData({...formData, roomNo: e.target.value})}
              />
            </div>

            {/* Property */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-sg-navy ml-1">Property</label>
              <select 
                className="w-full bg-sg-bg border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-sg-green appearance-none"
                onChange={(e) => setFormData({...formData, property: e.target.value})}
              >
                <option>Sterling Heights</option>
                <option>Green View</option>
                <option>Emerald Lofts</option>
              </select>
            </div>
          </div>

          {/* Room Type */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-sg-navy ml-1">Room Type</label>
            <div className="grid grid-cols-3 gap-3">
              {['Single', 'Double', 'Triple'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({...formData, type: `${type} Sharing`})}
                  className={`py-3 rounded-xl text-xs font-black uppercase tracking-tighter transition-all ${
                    formData.type.includes(type) ? 'bg-sg-navy text-white' : 'bg-sg-bg text-sg-text-muted'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-sg-navy ml-1">Monthly Rent (₹)</label>
            <input 
              type="number"
              required
              className="w-full bg-sg-bg border-none rounded-2xl p-4 font-bold focus:ring-2 focus:ring-sg-green transition-all"
              placeholder="e.g. 12000"
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
          </div>

          {/* Submit Button */}
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