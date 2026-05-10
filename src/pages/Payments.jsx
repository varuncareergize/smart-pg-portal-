import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  CurrencyRupeeIcon, CheckCircleIcon, ClockIcon, 
  UserGroupIcon, WalletIcon, ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

export default function PaymentAnalysis() {
  const [tenants, setTenants] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tenantRes, staffRes] = await Promise.all([
          axios.get('https://smart-pg-backend.onrender.com/tenants/'),
          axios.get('https://smart-pg-backend.onrender.com/staff/')
        ]);
        setTenants(tenantRes.data);
        setStaff(staffRes.data);
      } catch (err) {
        console.error("Analysis Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- REVENUE CALCULATIONS ---
  const rentCollected = tenants
    .filter(t => t.is_paid === true)
    .reduce((sum, t) => sum + (parseFloat(t.monthly_rent) || 0), 0);

  const advanceCollected = tenants
    // We count security deposit as collected once the tenant is added
    .reduce((sum, t) => sum + (parseFloat(t.security_deposit) || 0), 0);

  const pendingRent = tenants
    .filter(t => t.is_paid === false)
    .reduce((sum, t) => sum + (parseFloat(t.monthly_rent) || 0), 0);

  // --- SPENDING CALCULATIONS ---
  const totalSalaries = staff.reduce((sum, s) => sum + (parseFloat(s.salary_amount) || 0), 0);

  // --- TOTAL CASH POSITION ---
  const totalIn = rentCollected + advanceCollected;
  const netCashFlow = totalIn - totalSalaries;

  if (loading) return <div className="p-20 text-center font-black animate-pulse text-sg-navy">CALCULATING CASH FLOW...</div>;

  return (
    <div className="container-custom space-y-8 p-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-sg-navy italic tracking-tight">Financial Analysis</h2>
          <p className="text-sg-text-muted font-bold text-xs uppercase tracking-widest mt-1">SV Comforts • Cash Flow Management</p>
        </div>
        <div className="bg-sg-green/10 px-4 py-2 rounded-2xl border border-sg-green/20">
            <p className="text-[9px] font-black text-sg-green uppercase text-center">Net Cash Flow</p>
            <p className="text-xl font-black text-sg-green">₹{netCashFlow.toLocaleString()}</p>
        </div>
      </div>

      {/* Advanced Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Rent Card */}
        <div className="bg-white p-6 rounded-[32px] border border-sg-border shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <p className="text-[10px] font-black uppercase text-slate-400">Monthly Rent</p>
            <ArrowTrendingUpIcon className="w-4 h-4 text-sg-green" />
          </div>
          <h3 className="text-2xl font-black text-sg-navy italic">₹{rentCollected.toLocaleString()}</h3>
          <p className="text-[9px] font-bold text-amber-500 mt-1">₹{pendingRent.toLocaleString()} Still Pending</p>
        </div>

        {/* Advance/Security Card */}
        <div className="bg-white p-6 rounded-[32px] border border-sg-border shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <p className="text-[10px] font-black uppercase text-slate-400">Advances (Deposits)</p>
            <WalletIcon className="w-4 h-4 text-sg-navy" />
          </div>
          <h3 className="text-2xl font-black text-sg-navy italic">₹{advanceCollected.toLocaleString()}</h3>
          <p className="text-[9px] font-bold text-slate-400 mt-1 text-uppercase">Total Security Buffer</p>
        </div>

        {/* Salary Card */}
        <div className="bg-white p-6 rounded-[32px] border border-sg-border shadow-sm border-red-100">
          <div className="flex justify-between items-start mb-2">
            <p className="text-[10px] font-black uppercase text-slate-400">Total Spend</p>
            <UserGroupIcon className="w-4 h-4 text-red-400" />
          </div>
          <h3 className="text-2xl font-black text-red-500 italic">₹{totalSalaries.toLocaleString()}</h3>
          <p className="text-[9px] font-bold text-red-400/60 mt-1 uppercase tracking-tighter">Staff Salaries Only</p>
        </div>

        {/* Total In Hand */}
        <div className="bg-sg-navy p-6 rounded-[32px] shadow-xl shadow-sg-navy/20 relative overflow-hidden">
          <p className="text-[10px] font-black uppercase text-white/50 mb-2 relative z-10">Total In-Hand</p>
          <h3 className="text-2xl font-black text-white italic relative z-10">₹{netCashFlow.toLocaleString()}</h3>
          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/5 rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Log */}
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-sg-border overflow-hidden">
            <div className="p-6 border-b border-sg-border flex justify-between items-center bg-slate-50">
                <h4 className="text-[10px] font-black text-sg-navy uppercase tracking-widest">Recent Tenant Activity</h4>
            </div>
            <div className="divide-y divide-sg-border">
                {tenants.map(t => (
                    <div key={t.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-sg-navy text-xs">
                                {t.full_name.charAt(0)}
                            </div>
                            <div>
                                <p className="font-black text-sg-navy text-sm">{t.full_name}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase">Room {t.room_number} • Deposit: ₹{t.security_deposit}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-black text-sg-navy text-sm italic">Rent: ₹{t.monthly_rent}</p>
                            <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md ${t.is_paid ? 'bg-sg-green/10 text-sg-green' : 'bg-red-50 text-red-500'}`}>
                                {t.is_paid ? 'Paid' : 'Unpaid'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Staff Summary Side Panel */}
        <div className="bg-white rounded-[40px] border border-sg-border p-8">
            <h4 className="text-[10px] font-black text-sg-navy uppercase tracking-widest mb-6">Staff Payroll Breakdown</h4>
            <div className="space-y-6">
                {staff.map(s => (
                    <div key={s.id} className="flex justify-between items-center group">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-red-400 group-hover:scale-150 transition-all"></div>
                            <div>
                                <p className="text-xs font-black text-sg-navy uppercase">{s.name || 'Staff Member'}</p>
                                <p className="text-[9px] font-bold text-slate-400">{s.role || 'Personnel'}</p>
                            </div>
                        </div>
                        <p className="text-sm font-black text-red-500 italic">-₹{s.salary_amount}</p>
                    </div>
                ))}
            </div>
            <div className="mt-8 pt-6 border-t border-dashed border-slate-200">
                <div className="flex justify-between items-center text-sg-navy">
                    <p className="text-[10px] font-black uppercase">Total Outflow</p>
                    <p className="text-lg font-black italic">₹{totalSalaries.toLocaleString()}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}