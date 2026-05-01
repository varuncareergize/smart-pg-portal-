import React, { useState } from 'react';
import { 
  KeyIcon, 
  CheckCircleIcon, 
  PlusIcon,
  FunnelIcon,
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
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Available', 'Occupied', 'Maintenance'];

  const filteredRooms = activeTab === 'All' 
    ? roomsData 
    : roomsData.filter(room => room.status === activeTab);

  return (
    <div className="container-custom space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-sg-navy tracking-tight">Room Inventory</h2>
          <p className="text-sg-text-muted font-medium mt-1">Real-time status of your property assets.</p>
        </div>
        <button className="w-full md:w-auto bg-sg-green text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-sg-green/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
          <PlusIcon className="w-5 h-5 stroke-[3px]" /> Add New Room
        </button>
      </div>

      {/* --- PROFESSIONAL STATUS TABS --- */}
      <div className="bg-white p-2 rounded-[24px] border border-sg-border shadow-sm flex overflow-x-auto no-scrollbar gap-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              flex-1 min-w-[100px] py-3 px-4 rounded-[18px] text-xs font-black uppercase tracking-widest transition-all duration-300
              ${activeTab === tab 
                ? 'bg-sg-navy text-white shadow-lg shadow-sg-navy/20' 
                : 'text-sg-text-muted hover:bg-sg-bg hover:text-sg-navy'}
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
            className="bg-white rounded-[32px] border border-sg-border p-6 hover:shadow-xl transition-all group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-sg-bg rounded-2xl group-hover:bg-sg-green/10 transition-colors">
                <KeyIcon className="w-6 h-6 text-sg-navy group-hover:text-sg-green" />
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                room.status === 'Occupied' ? 'bg-blue-100 text-blue-600' : 
                room.status === 'Available' ? 'bg-green-100 text-green-600' : 
                'bg-orange-100 text-orange-600'
              }`}>
                {room.status}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-sg-navy">Room {room.id}</h3>
              <div className="flex items-center gap-1 text-sg-text-muted">
                <BuildingOfficeIcon className="w-3 h-3" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{room.property}</span>
              </div>
            </div>

            <div className="mt-6 py-4 border-y border-sg-border space-y-3">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-sg-text-muted">Type</span>
                <span className="text-sg-navy">{room.type}</span>
              </div>
              <div className="flex justify-between text-sm font-bold">
                <span className="text-sg-text-muted">Tenant</span>
                <span className="text-sg-navy">{room.tenant}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-sg-text-muted uppercase">Monthly Rent</p>
                <p className="text-xl font-black text-sg-green">₹{room.price}</p>
              </div>
              <button className="p-3 bg-sg-bg hover:bg-sg-navy hover:text-white rounded-xl transition-all">
                <CheckCircleIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {filteredRooms.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-[40px] border border-dashed border-sg-border">
            <p className="text-sg-text-muted font-bold">No rooms found in "{activeTab}" status.</p>
          </div>
        )}
      </div>
    </div>
  );
}