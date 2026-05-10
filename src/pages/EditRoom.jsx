import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function EditRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetch(`https://smart-pg-backend.onrender.com/rooms/${id}/`)
      .then(res => res.json())
      .then(data => {
        setFormData(data);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://smart-pg-backend.onrender.com/rooms/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) navigate('/rooms');
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  // Quick Action: Mark as Full
  const markAsFull = () => {
    setFormData({ ...formData, occupied_beds: formData.total_beds });
  };

  // Quick Action: Mark as Empty
  const markAsAvailable = () => {
    setFormData({ ...formData, occupied_beds: 0 });
  };

  if (loading) return <div className="p-10 text-center font-black">Loading Room Data...</div>;

  return (
    <div className="container-custom max-w-2xl py-10">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 mb-8 font-black text-xs uppercase">
        <ArrowLeftIcon className="w-4 h-4" /> Cancel Editing
      </button>

      <div className="bg-white rounded-[40px] border border-slate-100 p-8 md:p-12 shadow-sm">
        <h2 className="text-3xl font-black text-[#001D3D] italic mb-10">Edit Room {formData.room_number}</h2>

        {/* Quick Status Toggles */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button 
            type="button"
            onClick={markAsAvailable}
            className="p-4 rounded-2xl border-2 border-dashed border-green-200 text-green-600 font-black text-xs uppercase hover:bg-green-50"
          >
            Quick Set: Available
          </button>
          <button 
            type="button"
            onClick={markAsFull}
            className="p-4 rounded-2xl border-2 border-dashed border-blue-200 text-blue-600 font-black text-xs uppercase hover:bg-blue-50"
          >
            Quick Set: Fully Occupied
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-[#001D3D] ml-1">Monthly Rent (₹)</label>
            <input 
              type="number" 
              value={formData.rent}
              className="w-full bg-slate-50 rounded-2xl p-4 font-bold outline-none focus:ring-2 focus:ring-[#00C896]"
              onChange={(e) => setFormData({...formData, rent: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-[#001D3D] ml-1">Total Beds</label>
              <input 
                type="number" 
                value={formData.total_beds}
                className="w-full bg-slate-50 rounded-2xl p-4 font-bold"
                onChange={(e) => setFormData({...formData, total_beds: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-[#001D3D] ml-1">Occupied Beds</label>
              <input 
                type="number" 
                value={formData.occupied_beds}
                className="w-full bg-slate-50 rounded-2xl p-4 font-bold"
                onChange={(e) => setFormData({...formData, occupied_beds: e.target.value})}
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-[#001D3D] text-white py-5 rounded-[24px] font-black text-lg shadow-xl">
            Update Room Details
          </button>
        </form>
      </div>
    </div>
  );
}