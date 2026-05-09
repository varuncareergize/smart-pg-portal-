import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon, 
  PlusIcon,
  PhoneIcon,
  ArrowPathIcon,
  UserIcon,
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';

export default function Tenants() {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All'); 
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTenants = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/tenants/');
      if (!response.ok) throw new Error('Failed to fetch tenants');
      const data = await response.json();
      
      // Handle Django Rest Framework pagination if applicable
      const tenantList = Array.isArray(data) ? data : data.results || [];
      setTenants(tenantList);
    } catch (error) {
      console.error("Error fetching tenants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  // ✅ UPDATED: Now uses the is_paid boolean from your Django Model
  const getRentStatus = (tenant) => {
    return tenant.is_paid ? 'Paid' : 'Unpaid';
  };

  const paidCount = tenants.filter(t => t.is_paid === true).length;
  const unpaidCount = tenants.filter(t => t.is_paid === false).length;

  const displayTenants = tenants.filter(t => {
    const statusMatch = filter === 'All' || getRentStatus(t) === filter;
    const nameMatch = t.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && nameMatch;
  });

  return (
    <div className="container-custom space-y-8 py-10">
      
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center px-2">
        <div>
          <h2 className="text-3xl font-black text-[#001D3D] italic tracking-tight uppercase leading-none">Residents</h2>
          <p className="text-slate-500 font-medium mt-2">Database of all PG tenants and their status.</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={fetchTenants}
            className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-[#001D3D] transition-colors shadow-sm"
          >
            <ArrowPathIcon className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} />
          </button>
          
          <button 
            onClick={() => navigate('/tenants/add')} 
            className="bg-[#00C896] text-white p-3 rounded-2xl shadow-lg shadow-[#00C896]/20 hover:scale-105 active:scale-95 transition-transform"
          >
            <PlusIcon className="w-6 h-6 stroke-[3px]" />
          </button>
        </div>
      </div>

      {/* --- SUMMARY CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button 
          onClick={() => setFilter(filter === 'Paid' ? 'All' : 'Paid')}
          className={`relative overflow-hidden p-6 rounded-[32px] border transition-all text-left group ${
            filter === 'Paid' ? 'bg-[#00C896] border-[#00C896] shadow-xl' : 'bg-white border-slate-100'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-[10px] font-black uppercase tracking-widest ${filter === 'Paid' ? 'text-white/80' : 'text-slate-400'}`}>Paid Residents</p>
              <h3 className={`text-4xl font-black mt-1 ${filter === 'Paid' ? 'text-white' : 'text-[#001D3D]'}`}>{paidCount}</h3>
            </div>
            <div className={`p-4 rounded-2xl ${filter === 'Paid' ? 'bg-white/20 text-white' : 'bg-green-50 text-[#00C896]'}`}>
              <CheckCircleIcon className="w-8 h-8" />
            </div>
          </div>
        </button>

        <button 
          onClick={() => setFilter(filter === 'Unpaid' ? 'All' : 'Unpaid')}
          className={`relative overflow-hidden p-6 rounded-[32px] border transition-all text-left group ${
            filter === 'Unpaid' ? 'bg-red-500 border-red-500 shadow-xl' : 'bg-white border-slate-100'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-[10px] font-black uppercase tracking-widest ${filter === 'Unpaid' ? 'text-white/80' : 'text-slate-400'}`}>Pending Dues</p>
              <h3 className={`text-4xl font-black mt-1 ${filter === 'Unpaid' ? 'text-white' : 'text-[#001D3D]'}`}>{unpaidCount}</h3>
            </div>
            <div className={`p-4 rounded-2xl ${filter === 'Unpaid' ? 'bg-white/20 text-white' : 'bg-red-50 text-red-500'}`}>
              <ExclamationCircleIcon className="w-8 h-8" />
            </div>
          </div>
        </button>
      </div>

      {/* --- SEARCH BAR --- */}
      <div className="relative group px-2">
        <MagnifyingGlassIcon className="absolute left-7 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-[#00C896] transition-colors" />
        <input 
          type="text"
          placeholder="Search by resident name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-slate-100 rounded-[24px] py-4 pl-14 pr-6 text-sm font-bold text-[#001D3D] focus:outline-none focus:ring-2 focus:ring-[#00C896]/20 transition-all shadow-sm placeholder:text-slate-300"
        />
      </div>

      {/* --- LIST SECTION --- */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-4">
          <h4 className="text-[10px] font-black text-[#001D3D] uppercase tracking-widest">
            {searchTerm ? `Results for "${searchTerm}"` : `Current View: ${filter}`}
          </h4>
          {(filter !== 'All' || searchTerm) && (
            <button 
              onClick={() => { setFilter('All'); setSearchTerm(''); }} 
              className="text-[10px] font-black text-red-500 hover:underline uppercase tracking-widest"
            >
              Clear Filters
            </button>
          )}
        </div>

        {loading ? (
          [1,2,3].map(i => <div key={i} className="h-24 bg-slate-50 animate-pulse rounded-[32px]"></div>)
        ) : (
          displayTenants.map((tenant) => {
            const status = getRentStatus(tenant);
            return (
              <div 
                key={tenant.id} 
                onClick={() => navigate(`/tenants/edit/${tenant.id}`)}
                className="bg-white p-5 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:translate-y-[-2px] cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-50 text-slate-400 group-hover:bg-[#001D3D] group-hover:text-white transition-all duration-300">
                    <UserIcon className="w-7 h-7 stroke-[2]" />
                  </div>
                  
                  <div>
                    <p className="font-black text-lg text-[#001D3D] group-hover:text-[#00C896] transition-colors leading-tight">
                      {tenant.full_name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-[#001D3D] text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                        Room {tenant.room_number || 'NA'}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        Joined {new Date(tenant.join_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="hidden md:flex flex-col items-end">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      tenant.is_paid ? 'bg-green-50 text-[#00C896]' : 'bg-red-50 text-red-500'
                    }`}>
                      {status}
                    </span>
                    <p className="text-[10px] font-bold text-slate-400 mt-1">{tenant.phone}</p>
                  </div>

                  <a 
                    href={`tel:${tenant.phone}`} 
                    onClick={(e) => e.stopPropagation()} 
                    className="p-3 bg-slate-50 rounded-2xl text-[#001D3D] hover:bg-[#00C896] hover:text-white transition-all"
                  >
                    <PhoneIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
            );
          })
        )}

        {!loading && displayTenants.length === 0 && (
          <div className="py-20 text-center bg-slate-50/50 rounded-[40px] border-2 border-dashed border-slate-100">
              <p className="text-slate-400 font-black uppercase text-xs tracking-widest">No matching residents found</p>
          </div>
        )}
      </div>
    </div>
  );
}