import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  KeyIcon, 
  PlusIcon,
  BuildingOfficeIcon,
  ArrowPathIcon,
  PencilSquareIcon,
  UserIcon
} from '@heroicons/react/24/outline';

export default function Rooms() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Available', 'Occupied', 'Maintenance'];

  // 1. Fetch Rooms from Django
  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/rooms/');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // 2. Helper: Map numerical sharing type to String
  const getSharingTypeLabel = (type) => {
    const labels = { 1: 'Single', 2: 'Double', 3: 'Triple', 4: 'Four Sharing' };
    return labels[type] || 'Standard';
  };

  // 3. Helper: Calculate Status based on Model Logic
  const getRoomStatus = (room) => {
    if (!room.is_active) return 'Maintenance';
    return room.occupied_beds >= room.total_beds ? 'Occupied' : 'Available';
  };

  // 4. Filter Logic
  const filteredRooms = rooms.filter(room => {
    const status = getRoomStatus(room);
    if (activeTab === 'All') return true;
    return status === activeTab;
  });

  return (
    <div className="container-custom space-y-8 py-10">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-[#001D3D] tracking-tight italic">Room Inventory</h2>
          <p className="text-slate-500 font-medium mt-1">Manage availability, rent, and property assets.</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={fetchRooms}
            className="p-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors shadow-sm"
            title="Refresh Data"
          >
            <ArrowPathIcon className={`w-5 h-5 text-slate-500 ${loading ? 'animate-spin' : ''}`} />
          </button>
          
          <button 
            onClick={() => navigate('/rooms/add')}
            className="flex-1 md:flex-none bg-[#00C896] text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-[#00C896]/20 hover:scale-[1.02] transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <PlusIcon className="w-5 h-5 stroke-[3px]" /> Add New Room
          </button>
        </div>
      </div>

      {/* --- STATUS TABS --- */}
      <div className="bg-white p-2 rounded-[24px] border border-slate-100 shadow-sm flex overflow-x-auto no-scrollbar gap-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              flex-1 min-w-[120px] py-3 px-4 rounded-[18px] text-xs font-black uppercase tracking-widest transition-all duration-300
              ${activeTab === tab 
                ? 'bg-[#001D3D] text-white shadow-lg shadow-[#001D3D]/20' 
                : 'text-slate-400 hover:bg-slate-50 hover:text-[#001D3D]'}
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* --- ROOM GRID --- */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-80 bg-slate-100 rounded-[32px]"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRooms.map((room) => {
            const status = getRoomStatus(room);
            const occupancyColor = status === 'Occupied' ? 'text-blue-600 bg-blue-50' : 
                                  status === 'Available' ? 'text-[#00C896] bg-green-50' : 
                                  'text-orange-600 bg-orange-50';

            return (
              <div 
                key={room.id} 
                className="bg-white rounded-[32px] border border-slate-100 p-6 hover:shadow-xl transition-all group relative overflow-hidden"
              >
                {/* Card Top: Icon & Status */}
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-[#001D3D] group-hover:text-white transition-all duration-300">
                    <KeyIcon className="w-6 h-6" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${occupancyColor}`}>
                    {status}
                  </span>
                </div>

                {/* Room Identity */}
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-[#001D3D]">Room {room.room_number}</h3>
                  <div className="flex items-center gap-1 text-slate-400">
                    <BuildingOfficeIcon className="w-3 h-3" />
                    <span className="text-[10px] font-bold uppercase tracking-widest truncate max-w-[150px]">
                      {room.property_name || 'Generic Property'}
                    </span>
                  </div>
                </div>

                {/* Quick Info Table */}
                <div className="mt-6 py-4 border-y border-slate-50 space-y-3">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-slate-400 font-medium">Sharing</span>
                    <span className="text-[#001D3D]">{getSharingTypeLabel(room.sharing_type)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-slate-400 font-medium">Beds</span>
                    <span className="text-[#001D3D]">{room.occupied_beds} / {room.total_beds}</span>
                  </div>
                </div>

                {/* Footer: Price and Edit Action */}
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Monthly Rent</p>
                    <p className="text-xl font-black text-[#00C896]">₹{parseFloat(room.rent).toLocaleString()}</p>
                  </div>
                  
                  <button 
                    onClick={() => navigate(`/rooms/edit/${room.id}`)}
                    className="flex items-center justify-center w-12 h-12 bg-slate-50 text-[#001D3D] rounded-2xl hover:bg-[#001D3D] hover:text-white transition-all shadow-sm"
                    title="Edit Room"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )
          })}

          {/* --- EMPTY STATE --- */}
          {filteredRooms.length === 0 && (
            <div className="col-span-full py-24 text-center bg-white rounded-[40px] border-2 border-dashed border-slate-100">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserIcon className="w-10 h-10 text-slate-200" />
              </div>
              <h4 className="text-xl font-black text-[#001D3D]">No Rooms Found</h4>
              <p className="text-slate-400 font-medium">There are no rooms listed under "{activeTab}".</p>
              <button 
                onClick={() => setActiveTab('All')}
                className="mt-6 text-[#00C896] font-black text-xs uppercase tracking-widest hover:underline"
              >
                Show All Inventory
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}