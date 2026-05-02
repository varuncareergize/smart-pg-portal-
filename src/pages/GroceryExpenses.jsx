import React from 'react';
import { 
  Calendar, ShoppingBag, BarChart3, Plus, Search, 
  ArrowUpRight, UploadCloud, FileText, ShieldCheck 
} from 'lucide-react';

export default function GroceryExpenses() {
  const stats = [
    { label: 'Monthly Grocery Spend', value: '₹2,450.80', trend: '+12%', icon: <Calendar size={20} className="text-emerald-500" /> },
    { label: 'Last 7 Days Spend', value: '₹482.15', icon: <BarChart3 size={20} className="text-blue-500" /> },
    { label: 'Most Frequent Vendor', value: 'FreshMart Central', icon: <ShoppingBag size={20} className="text-orange-500" /> },
  ];

  const recentBills = [
    { date: 'Oct 24, 2023', vendor: 'FreshMart Central', category: 'Vegetables', amount: '₹124.50', status: 'Paid' },
    { date: 'Oct 23, 2023', vendor: 'PureDairy Farm', category: 'Dairy', amount: '₹45.00', status: 'Pending' },
    { date: 'Oct 21, 2023', vendor: 'CleanHome Supplies', category: 'Cleaning', amount: '₹89.30', status: 'Paid' },
    { date: 'Oct 19, 2023', vendor: 'BulkGrain Wholesalers', category: 'Staples', amount: '₹512.00', status: 'Paid' },
    { date: 'Oct 18, 2023', vendor: 'Local Market', category: 'Vegetables', amount: '₹32.15', status: 'Paid' },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header Area */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#001D3D]">Grocery Payments</h1>
          <p className="text-slate-400 text-sm font-medium">Manage and track your mess and tiffin expenses.</p>
        </div>
        <button className="bg-[#00C896] text-white px-6 py-3 rounded-xl flex items-center gap-2 font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all">
          <Plus size={18} /> Export Report
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-slate-50 rounded-xl">{stat.icon}</div>
              {stat.trend && (
                <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black mt-1 text-[#001D3D]">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* New Entry Form */}
        <section className="lg:col-span-2 bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-lg text-[#001D3D]">New Expense Entry</h3>
            <FileText size={20} className="text-slate-300" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">Date</label>
              <input type="date" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:border-[#00C896] outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">Amount (₹)</label>
              <input type="number" placeholder="0.00" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:border-[#00C896] outline-none" />
            </div>
          </div>

          <div className="space-y-1.5 mb-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">Vendor/Store Name</label>
            <input type="text" placeholder="e.g. Local Market, Milk Delivery" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:border-[#00C896] outline-none" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">Category</label>
              <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:border-[#00C896] outline-none">
                <option>Vegetables</option>
                <option>Dairy</option>
                <option>Groceries</option>
                <option>Cleaning</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">Payment Mode</label>
              <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-bold focus:border-[#00C896] outline-none">
                <option>UPI</option>
                <option>Cash</option>
                <option>Bank Transfer</option>
              </select>
            </div>
          </div>

          <div className="border-2 border-dashed border-slate-100 rounded-2xl p-8 text-center space-y-3 mb-8 hover:bg-slate-50 transition-colors cursor-pointer group">
            <UploadCloud className="mx-auto text-slate-300 group-hover:text-[#00C896] transition-colors" size={32} />
            <div>
              <p className="text-xs font-bold text-[#001D3D]">Click to upload receipt</p>
              <p className="text-[10px] text-slate-400 mt-1 uppercase">PNG, JPG or PDF</p>
            </div>
          </div>

          <button className="w-full bg-[#001D3D] text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-[#00C896] transition-all shadow-xl shadow-blue-900/10 active:scale-95">
            <ShieldCheck size={20} /> Record Expense
          </button>
        </section>

        {/* Recent Bills Table */}
        <section className="lg:col-span-3 bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-lg text-[#001D3D]">Recent Activity</h3>
            <div className="flex gap-4 text-slate-400">
              <button className="hover:text-[#001D3D]"><Search size={18} /></button>
              <button className="hover:text-[#001D3D]"><ArrowUpRight size={18} /></button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[500px]">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Vendor</th>
                  <th className="pb-4">Category</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentBills.map((bill, i) => (
                  <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-5 text-xs font-bold text-slate-500">{bill.date}</td>
                    <td className="py-5 text-sm font-black text-[#001D3D]">{bill.vendor}</td>
                    <td className="py-5">
                      <span className={`text-[10px] font-black px-3 py-1 rounded-full ${
                        bill.category === 'Vegetables' ? 'bg-emerald-50 text-emerald-600' :
                        bill.category === 'Dairy' ? 'bg-blue-50 text-blue-600' :
                        'bg-purple-50 text-purple-600'
                      }`}>
                        {bill.category}
                      </span>
                    </td>
                    <td className="py-5 text-sm font-black text-[#001D3D]">{bill.amount}</td>
                    <td className="py-5">
                      <div className={`w-2 h-2 rounded-full mx-auto ${bill.status === 'Paid' ? 'bg-emerald-500' : 'bg-orange-400'}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="w-full mt-8 py-3 text-xs font-black text-[#00C896] hover:bg-emerald-50 rounded-xl transition-all tracking-widest uppercase border border-transparent hover:border-emerald-100">
            Download Statement
          </button>
        </section>
      </div>
    </div>
  );
}