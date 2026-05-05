import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  KeyIcon, 
  CheckCircleIcon, 
  PlusIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const roomsData = [
  { id: '101', type: 'Single Sharing', price: '12,000', status: 'Occupied', tenant: 'Arjun Reddy', property: 'Sterling Heights' },
  { id: '102', type: 'Double Sharing', price: '8,500', status: 'Available', tenant: '-', property: 'Sterling Heights' },
  { id: '201', type: 'Triple Sharing', price: '6,500', status: 'Maintenance', tenant: '-', property: 'Green View' },
  { id: '202', type: 'Single Sharing', price: '14,000', status: 'Occupied', tenant: 'Sarah Khan', property: 'Green View' },
  { id: '301', type: 'Double Sharing', price: '9,000', status: 'Available', tenant: '-', property: 'Sterling Heights' },
];

export default function Rooms() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Available', 'Occupied', 'Maintenance'];

  const filteredRooms = activeTab === 'All' 
    ? roomsData 
    : roomsData.filter(room => room.status === activeTab);

  return (
    <div className="container-custom space-y-8 py-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-[#001D3D] tracking-tight">Room Inventory</h2>
          <p className="text-slate-500 font-medium mt-1">Real-time status of your property assets.</p>
        </div>
        
        {/* Navigation to Add Room Page */}
        <button 
          onClick={() => navigate('/rooms/add')}
          className="w-full md:w-auto bg-[#00C896] text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-[#00C896]/20 hover:scale-[1.02] transition-transform active:scale-95 flex items-center justify-center gap-2"
        >
          <PlusIcon className="w-5 h-5 stroke-[3px]" /> Add New Room
        </button>
      </div>

      {/* --- STATUS TABS --- */}
      <div className="bg-white p-2 rounded-[24px] border border-slate-100 shadow-sm flex overflow-x-auto no-scrollbar gap-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              flex-1 min-w-[100px] py-3 px-4 rounded-[18px] text-xs font-black uppercase tracking-widest transition-all duration-300
              ${activeTab === tab 
                ? 'bg-[#001D3D] text-white shadow-lg shadow-[#001D3D]/20' 
                : 'text-slate-400 hover:bg-slate-50 hover:text-[#001D3D]'}
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRooms.map((room) => (
          <div 
            key={room.id} 
            className="bg-white rounded-[32px] border border-slate-100 p-6 hover:shadow-xl transition-all group relative overflow-hidden"
          >
            {/* Status Badge */}
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-[#00C896]/10 transition-colors">
                <KeyIcon className="w-6 h-6 text-[#001D3D] group-hover:text-[#00C896]" />
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                room.status === 'Occupied' ? 'bg-blue-50 text-blue-600' : 
                room.status === 'Available' ? 'bg-green-50 text-[#00C896]' : 
                'bg-orange-50 text-orange-600'
              }`}>
                {room.status}
              </span>
            </div>

            {/* Room Info */}
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-[#001D3D]">Room {room.id}</h3>
              <div className="flex items-center gap-1 text-slate-400">
                <BuildingOfficeIcon className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{room.property}</span>
              </div>
            </div>

            {/* Details Table-style */}
            <div className="mt-6 py-4 border-y border-slate-50 space-y-3">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-400">Type</span>
                <span className="text-[#001D3D]">{room.type}</span>
              </div>
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-400">Tenant</span>
                <span className="text-[#001D3D]">{room.tenant}</span>
              </div>
            </div>

            {/* Footer / Pricing */}
            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase">Monthly Rent</p>
                <p className="text-xl font-black text-[#00C896]">₹{room.price}</p>
              </div>
              <button className="p-3 bg-slate-50 hover:bg-[#001D3D] hover:text-white rounded-xl transition-all">
                <CheckCircleIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {filteredRooms.length === 0 && (
          <div className="col-span-full py-24 text-center bg-white rounded-[40px] border border-dashed border-slate-200">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
               <KeyIcon className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-500 font-bold">No rooms found with status "{activeTab}".</p>
            <button 
              onClick={() => setActiveTab('All')}
              className="mt-4 text-[#00C896] font-black text-xs uppercase tracking-widest underline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}