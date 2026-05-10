import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Users, Clock, LogIn, ArrowRight, Home, XCircle, 
  Loader2, Search, UserCheck
} from 'lucide-react';

export default function Visitors() {
  const navigate = useNavigate();
  const [visitorLogs, setVisitorLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Fetch Data from Django API
  const fetchVisitors = async () => {
    try {
      setLoading(true);
      // Replace '1' with your dynamic property ID from Context or LocalStorage
      const propertyId = localStorage.getItem('currentPropertyId') || '1';
      const response = await axios.get(`https://smart-pg-backend.onrender.com/visitors/?property_id=${propertyId}`);
      setVisitorLogs(response.data);
    } catch (error) {
      console.error("Error fetching visitor data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  // 2. Handle Check-Out (API Update)
  const handleCheckOut = async (id) => {
    try {
      await axios.patch(`https://smart-pg-backend.onrender.com/visitors/${id}/`, {
        status: 'Checked-Out',
        exit_time: new Date().toISOString()
      });
      setSelectedVisitor(null);
      fetchVisitors(); // Refresh list after update
    } catch (error) {
      console.error("Check-out failed:", error);
    }
  };

  // 3. Stats Calculation
  const stats = useMemo(() => [
    { 
        label: 'Active Now', 
        value: visitorLogs.filter(v => v.status === 'Checked-In').length, 
        type: 'Checked-In', 
        icon: <Users size={18} /> 
    },
    { 
        label: 'Checked Out', 
        value: visitorLogs.filter(v => v.status === 'Checked-Out').length, 
        type: 'Checked-Out', 
        icon: <UserCheck size={18} /> 
    },
    { 
        label: 'Total Today', 
        value: visitorLogs.length, 
        type: 'All', 
        icon: <Clock size={18} /> 
    },
  ], [visitorLogs]);

  // 4. Filtering & Search Logic
  const filteredVisitors = useMemo(() => {
    let data = visitorLogs;
    if (activeFilter !== 'All') {
      data = data.filter(v => v.status === activeFilter);
    }
    if (searchTerm) {
      data = data.filter(v => 
        v.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.room_number.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return data;
  }, [activeFilter, visitorLogs, searchTerm]);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#001D3D] italic">Visitor Logs</h1>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Real-time Security Monitoring</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text"
              placeholder="Search name or room..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-100 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#00C896] outline-none transition-all w-64"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={fetchVisitors}
            className="p-2 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-[#00C896] transition-colors"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Clock size={18} />}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <button 
            key={i} 
            onClick={() => setActiveFilter(stat.type)}
            className={`p-6 rounded-[32px] border text-left transition-all ${
              activeFilter === stat.type 
              ? 'bg-[#001D3D] border-[#001D3D] text-white shadow-xl shadow-blue-900/20' 
              : 'bg-white border-slate-100 hover:border-emerald-200'
            }`}
          >
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-4 ${
              activeFilter === stat.type ? 'bg-white/10 text-[#00C896]' : 'bg-slate-50 text-emerald-500'
            }`}>
              {stat.icon}
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{stat.label}</p>
            <p className="text-3xl font-black mt-1">{stat.value}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Table Section */}
        <div className="lg:col-span-3 bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto p-6">
            <table className="w-full">
              <thead>
                <tr className="text-[10px] font-black text-slate-300 uppercase tracking-widest border-b border-slate-50">
                  <th className="px-4 pb-4 text-left">Visitor Profile</th>
                  <th className="px-4 pb-4 text-left">Location</th>
                  <th className="px-4 pb-4 text-left">Entry Time</th>
                  <th className="px-4 pb-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredVisitors.map((log) => (
                  <tr 
                    key={log.id} 
                    onClick={() => setSelectedVisitor(selectedVisitor === log.id ? null : log.id)}
                    className={`group cursor-pointer transition-all ${
                      selectedVisitor === log.id ? 'bg-emerald-50/50' : 'hover:bg-slate-50/50'
                    }`}
                  >
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg transition-colors ${
                          selectedVisitor === log.id ? 'bg-[#00C896] text-white' : 'bg-slate-100 text-[#001D3D]'
                        }`}>
                          {log.full_name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-black text-[#001D3D]">{log.full_name}</p>
                          <p className="text-[10px] font-bold text-slate-400">{log.phone_number}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <p className="text-sm font-black text-[#001D3D] flex items-center gap-2">
                        <Home size={14} className="text-slate-300" /> {log.room_number}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase italic">To: {log.resident_name}</p>
                    </td>
                    <td className="px-4 py-5 text-xs font-bold text-slate-500">
                        {log.entry_time_formatted}
                    </td>
                    <td className="px-4 py-5 text-right">
                      <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter ${
                        log.status === 'Checked-In' 
                        ? 'bg-emerald-100 text-emerald-600' 
                        : 'bg-slate-100 text-slate-400'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredVisitors.length === 0 && !loading && (
              <div className="py-20 text-center space-y-3">
                <Users className="mx-auto text-slate-200" size={48} />
                <p className="text-slate-400 font-bold text-sm">No visitors found in this category.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <div className="bg-[#001D3D] p-8 rounded-[40px] shadow-xl shadow-blue-900/20 text-white relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <h4 className="text-white/40 font-black text-[10px] uppercase tracking-widest">
                Control Panel
              </h4>
              
              {selectedVisitor ? (
                <div className="space-y-3">
                    <p className="text-xs font-bold text-white/60">Manage entry for <span className="text-[#00C896]">{visitorLogs.find(v => v.id === selectedVisitor)?.full_name}</span></p>
                    <button 
                        onClick={() => handleCheckOut(selectedVisitor)}
                        className="w-full flex items-center justify-between bg-orange-500 p-4 rounded-2xl font-black text-xs hover:bg-orange-600 transition-all group"
                    >
                        <span>Force Check Out</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
              ) : (
                <button 
                  onClick={() => navigate('/visitors/add')} 
                  className="w-full flex items-center justify-between bg-[#00C896] p-4 rounded-2xl font-black text-xs hover:scale-[1.02] transition-all group shadow-lg shadow-emerald-500/20"
                >
                  <span>New Visitor Registration</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
            {/* Decoration */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}