import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  UserGroupIcon, 
  CheckBadgeIcon, 
  ClockIcon, 
  PlusIcon,
  EnvelopeIcon,
  PhoneIcon,
  EllipsisVerticalIcon,
  BanknotesIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

export default function Staff() {
  const navigate = useNavigate();
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All'); // 'All', 'Active', 'On Leave'
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Fetch Staff Data from Django Backend
  const fetchStaff = async () => {
    try {
      setLoading(true);
      const propertyId = localStorage.getItem('currentPropertyId') || '1';
      const response = await axios.get(`http://localhost:8000/staff/?property_id=${propertyId}`);
      setStaffData(response.data);
    } catch (error) {
      console.error("Error fetching team directory:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // 2. Handle Payment Status Toggle (Updates Django Model)
  const handlePayment = async (id, currentPaidStatus) => {
    try {
      await axios.patch(`http://localhost:8000/staff/${id}/`, {
        is_paid: !currentPaidStatus,
        last_paid_date: new Date().toISOString().split('T')[0]
      });
      // Refresh local data
      fetchStaff();
    } catch (error) {
      console.error("Payment update failed:", error);
      alert("Could not update payment status.");
    }
  };

  // 3. Filtering & Search Logic
  const activeCount = staffData.filter(s => s.status === 'Active').length;
  const leaveCount = staffData.filter(s => s.status === 'On Leave').length;

  const displayStaff = staffData.filter(staff => {
    const matchesFilter = filter === 'All' || staff.status === filter;
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         staff.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container-custom space-y-8 animate-in fade-in duration-700">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-sg-navy tracking-tight italic">Team Directory</h2>
          <p className="text-sg-text-muted font-bold text-[10px] uppercase tracking-[0.2em] mt-1">
            Mullavanam Group Personnel Management
          </p>
        </div>
        
        <div className="flex w-full md:w-auto items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search team..."
              className="w-full bg-white border border-sg-border rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-sg-navy focus:ring-2 focus:ring-sg-green transition-all"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => navigate('/staff/add')}
            className="bg-sg-navy text-white px-6 py-4 rounded-2xl font-black shadow-lg shadow-sg-navy/20 flex items-center gap-2 hover:bg-sg-green transition-all active:scale-95"
          >
            <PlusIcon className="w-5 h-5 stroke-[3px]" />
            <span className="hidden sm:inline">Add Member</span>
          </button>
        </div>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <button 
          onClick={() => setFilter(filter === 'Active' ? 'All' : 'Active')}
          className={`relative overflow-hidden p-8 rounded-[40px] border transition-all text-left ${
            filter === 'Active' ? 'bg-sg-green border-sg-green text-white shadow-xl' : 'bg-white border-sg-border'
          }`}
        >
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80">On-Duty Staff</p>
              <h3 className="text-5xl font-black mt-2">{activeCount}</h3>
            </div>
            <CheckBadgeIcon className={`w-12 h-12 ${filter === 'Active' ? 'text-white/30' : 'text-sg-green/20'}`} />
          </div>
          {filter === 'Active' && <div className="absolute bottom-4 right-8 text-[8px] font-black uppercase opacity-60">Filtered View</div>}
        </button>

        <button 
          onClick={() => setFilter(filter === 'On Leave' ? 'All' : 'On Leave')}
          className={`relative overflow-hidden p-8 rounded-[40px] border transition-all text-left ${
            filter === 'On Leave' ? 'bg-orange-500 border-orange-500 text-white shadow-xl' : 'bg-white border-sg-border'
          }`}
        >
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80">On Leave / Off</p>
              <h3 className="text-5xl font-black mt-2">{leaveCount}</h3>
            </div>
            <ClockIcon className={`w-12 h-12 ${filter === 'On Leave' ? 'text-white/30' : 'text-orange-500/20'}`} />
          </div>
          {filter === 'On Leave' && <div className="absolute bottom-4 right-8 text-[8px] font-black uppercase opacity-60">Filtered View</div>}
        </button>
      </div>

      {/* Staff Directory Table */}
      <div className="bg-white rounded-[40px] border border-sg-border shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center gap-4">
            <ArrowPathIcon className="w-10 h-10 animate-spin text-sg-green" />
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Loading Directory...</p>
          </div>
        ) : (
          <div className="divide-y divide-sg-border">
            {displayStaff.map((staff) => (
              <div key={staff.id} className="group p-6 hover:bg-slate-50 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Profile Section */}
                <div className="flex items-center gap-5 min-w-[280px]">
                  <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center font-black text-2xl transition-transform group-hover:scale-105 ${
                    staff.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {staff.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xl font-black text-sg-navy leading-tight">{staff.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[9px] font-black uppercase tracking-tighter">
                        {staff.role}
                      </span>
                      <span className={`w-1.5 h-1.5 rounded-full ${staff.status === 'Active' ? 'bg-sg-green' : 'bg-orange-500'}`}></span>
                    </div>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="flex flex-wrap items-center gap-8 text-sg-navy">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-sg-bg rounded-lg">
                      <EnvelopeIcon className="w-4 h-4 text-sg-green" />
                    </div>
                    <span className="text-sm font-bold">{staff.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-sg-bg rounded-lg">
                      <PhoneIcon className="w-4 h-4 text-sg-green" />
                    </div>
                    <span className="text-sm font-bold">{staff.phone}</span>
                  </div>
                </div>

                {/* Payroll & Actions Section */}
                <div className="flex items-center justify-between lg:justify-end gap-6 border-t lg:border-none pt-4 lg:pt-0">
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Salary</p>
                    <p className="text-lg font-black text-sg-navy italic">
                      ₹{parseFloat(staff.salary_amount).toLocaleString('en-IN')}
                    </p>
                  </div>

                  <button 
                    onClick={() => handlePayment(staff.id, staff.is_paid)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      staff.is_paid 
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' 
                      : 'bg-slate-100 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600'
                    }`}
                  >
                    <BanknotesIcon className="w-4 h-4" />
                    {staff.is_paid ? 'Paid' : 'Pay Now'}
                  </button>

                  <button className="p-4 bg-slate-50 text-slate-400 hover:bg-sg-navy hover:text-white rounded-2xl transition-all">
                    <EllipsisVerticalIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}

            {displayStaff.length === 0 && (
              <div className="py-24 text-center">
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserGroupIcon className="w-10 h-10 text-slate-300" />
                </div>
                <h4 className="text-lg font-black text-sg-navy">No team members found</h4>
                <p className="text-slate-400 text-sm font-medium">Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="flex justify-between items-center px-4">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Showing {displayStaff.length} of {staffData.length} Total Members
        </p>
        <button className="text-[10px] font-black text-sg-green uppercase tracking-widest hover:underline">
          Export Payroll Report (CSV)
        </button>
      </div>
    </div>
  );
}