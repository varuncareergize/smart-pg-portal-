import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  PlusIcon, 
  WrenchScrewdriverIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckBadgeIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

export default function Maintenance() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  
  const activePropertyId = 1; 

  const fetchTickets = async () => {
    try {
      // Standardized to your /api/ path
      const res = await axios.get(`http://127.0.0.1:8000/tickets/?property_id=${activePropertyId}`);
      setTickets(res.data);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [activePropertyId]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.patch(`http://127.0.0.1:8000/api/tickets/${id}/`, { status: newStatus });
      fetchTickets(); 
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const stats = {
    open: tickets.filter(t => t.status !== 'Resolved').length,
    inProgress: tickets.filter(t => t.status === 'In Progress').length,
    high: tickets.filter(t => t.priority === 'HIGH').length,
    resolved: tickets.filter(t => t.status === 'Resolved').length,
  };

  const displayTickets = tickets.filter(t => {
    if (filter === 'All') return true;
    if (filter === 'HIGH') return t.priority === 'HIGH';
    return t.status === filter;
  });

  if (loading) return <div className="p-20 text-center font-black text-sg-navy animate-pulse uppercase tracking-widest">Loading Dashboard...</div>;

  return (
    <div className="container-custom space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-sg-navy tracking-tight">Maintenance</h2>
          <p className="text-sg-text-muted font-medium mt-1">Real-time issue tracking for Mullavanam Group.</p>
        </div>
        <button 
          onClick={() => navigate('/maintenance/new')}
          className="bg-sg-green text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-sg-green/20 flex items-center gap-2 hover:scale-105 transition-all active:scale-95"
        >
          <PlusIcon className="w-5 h-5 stroke-[3px]" /> Add New Ticket
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Open" val={stats.open} icon={<WrenchScrewdriverIcon/>} active={filter === 'All'} onClick={() => setFilter('All')} color="green" />
        <StatCard label="In Progress" val={stats.inProgress} icon={<ClockIcon/>} active={filter === 'In Progress'} onClick={() => setFilter('In Progress')} color="blue" />
        <StatCard label="High Priority" val={stats.high} icon={<ExclamationTriangleIcon/>} active={filter === 'HIGH'} onClick={() => setFilter('HIGH')} color="red" />
        <StatCard label="Resolved" val={stats.resolved} icon={<CheckBadgeIcon/>} active={filter === 'Resolved'} onClick={() => setFilter('Resolved')} color="navy" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Table Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[32px] border border-sg-border overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-sg-bg/30 border-b border-sg-border">
                <tr className="text-[9px] font-black text-sg-text-muted uppercase tracking-widest">
                  <th className="px-6 py-4">Ticket</th>
                  <th className="px-6 py-4">Details</th>
                  <th className="px-6 py-4 text-center">Priority</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sg-border">
                {displayTickets.map((ticket) => (
                  <tr key={ticket.id} className="group hover:bg-sg-bg/20 transition-colors">
                    <td className="px-6 py-6 text-xs font-black text-sg-text-muted">{ticket.ticket_id}</td>
                    <td className="px-6 py-6">
                      <p className="text-sm font-black text-sg-navy group-hover:text-sg-green transition-colors">{ticket.issue}</p>
                      <p className="text-[10px] font-bold text-sg-text-muted">{ticket.unit_details}</p>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black ${ticket.priority === 'HIGH' ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500'}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-right">
                      {ticket.status !== 'Resolved' ? (
                        <button onClick={() => handleStatusUpdate(ticket.id, 'Resolved')} className="text-[10px] font-black text-sg-green border border-sg-green/30 px-3 py-1 rounded-lg hover:bg-sg-green hover:text-white transition-all">
                          Resolve
                        </button>
                      ) : (
                        <span className="text-[10px] font-black text-sg-text-muted uppercase">Closed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- THE SIDEBAR ACTIVITY LOG --- */}
        <div className="bg-white p-6 rounded-[32px] border border-sg-border shadow-sm h-fit">
          <h4 className="text-lg font-black text-sg-navy mb-6 flex items-center gap-2">
            Recent Activity
            <span className="w-2 h-2 rounded-full bg-sg-green animate-pulse" />
          </h4>
          
          <div className="space-y-8 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[1.5px] before:bg-sg-bg">
            {tickets.slice(0, 4).map((t, i) => (
              <div key={i} className="relative pl-10">
                {/* Timeline Dot */}
                <div className={`absolute left-0 top-1 w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center z-10 ${t.status === 'Resolved' ? 'border-sg-green' : 'border-sg-border'}`}>
                  {t.status === 'Resolved' ? (
                    <CheckBadgeIcon className="w-4 h-4 text-sg-green" />
                  ) : (
                    <UserCircleIcon className="w-4 h-4 text-sg-text-muted" />
                  )}
                </div>
                
                {/* Log Content */}
                <div>
                  <p className="text-[9px] font-black text-sg-text-muted uppercase tracking-tighter">
                    {t.status === 'Resolved' ? 'Completed' : 'Active Ticket'}
                  </p>
                  <p className="text-xs font-black text-sg-navy mt-0.5">{t.issue}</p>
                  <p className="text-[10px] font-medium text-sg-text-muted mt-1">
                    Assigned to <span className="font-black text-sg-navy">{t.assigned_name || 'Technical Team'}</span>
                  </p>
                  <div className="mt-2 inline-block px-2 py-0.5 bg-sg-bg rounded text-[8px] font-black text-sg-navy uppercase">
                    {t.unit_details}
                  </div>
                </div>
              </div>
            ))}
            
            {tickets.length === 0 && (
              <p className="text-xs font-bold text-sg-text-muted text-center py-4">No recent logs available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, val, icon, active, onClick, color }) {
  const colorMap = {
    green: active ? 'bg-white border-sg-green ring-2 ring-sg-green/20' : 'bg-white border-sg-border',
    blue: active ? 'bg-blue-500 text-white' : 'bg-white border-sg-border',
    red: active ? 'bg-red-500 text-white' : 'bg-white border-red-100',
    navy: active ? 'bg-sg-navy text-white' : 'bg-white border-sg-border'
  };
  return (
    <button onClick={onClick} className={`p-6 rounded-[28px] border transition-all text-left shadow-sm ${colorMap[color]}`}>
      <div className={`p-2 rounded-xl w-fit ${active ? 'bg-white/20' : 'bg-slate-50'}`}>{icon}</div>
      <h3 className="text-3xl font-black mt-4">{val}</h3>
      <p className="text-[10px] font-black uppercase tracking-widest opacity-70">{label}</p>
    </button>
  );
}