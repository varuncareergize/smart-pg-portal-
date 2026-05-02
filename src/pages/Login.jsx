import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Lock, 
  User, 
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Loader2
} from 'lucide-react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/accounts/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Success Logic
        console.log("Authenticated successfully");
        navigate('/dashboard');
      } else {
        // Professional Error Mapping
        if (response.status === 401) {
          setError({
            title: "Authentication Failed",
            message: "The username or password you entered is incorrect."
          });
        } else if (response.status === 403) {
          setError({
            title: "Access Restricted",
            message: "Your account is not authorized to access this portal."
          });
        } else {
          setError({
            title: "Server Error",
            message: "Something went wrong on our end. Please try again later."
          });
        }
      }
    } catch (err) {
      setError({
        title: "Connection Error",
        message: "Unable to connect to the SmartPG server. Verify your internet."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 relative overflow-hidden">
      
      {/* Brand Background Wall */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#001D3D] z-0" />
      
      <div className="relative z-10 w-full max-w-md">
        
        {/* Portal Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white tracking-tighter mb-2">SmartPG</h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Mullavanam Group Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[40px] shadow-2xl shadow-blue-900/20 p-10 border border-slate-100">
          
          <div className="mb-10 text-center">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-500 ${error ? 'bg-red-50 text-red-500' : 'bg-[#00C896]/10 text-[#00C896]'}`}>
              {error ? <ShieldAlert size={32} strokeWidth={2.5} /> : <ShieldCheck size={32} strokeWidth={2.5} />}
            </div>
            <h2 className="text-2xl font-black text-[#001D3D]">Secure Access</h2>
            <p className="text-slate-400 text-sm font-bold mt-1">Provide your administrative credentials</p>
          </div>

          {/* Error Alert UI */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl animate-bounce-short">
               <h4 className="text-[10px] font-black text-red-600 uppercase tracking-widest">{error.title}</h4>
               <p className="text-xs font-bold text-red-500/80 mt-0.5">{error.message}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#001D3D] uppercase tracking-widest ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#00C896] transition-colors">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  required
                  className={`block w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-2xl text-sm font-bold text-[#001D3D] outline-none transition-all ${error ? 'border-red-200 focus:ring-red-500/10' : 'border-slate-100 focus:ring-[#00C896]/10 focus:border-[#00C896]'}`}
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-[#001D3D] uppercase tracking-widest">Password</label>
                <button type="button" className="text-[10px] font-black text-[#00C896] uppercase tracking-widest hover:underline">Reset</button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#00C896] transition-colors">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className={`block w-full pl-12 pr-12 py-4 bg-slate-50 border rounded-2xl text-sm font-bold text-[#001D3D] outline-none transition-all ${error ? 'border-red-200 focus:ring-red-500/10' : 'border-slate-100 focus:ring-[#00C896]/10 focus:border-[#00C896]'}`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-300 hover:text-[#001D3D]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#001D3D] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-[#00C896] shadow-xl shadow-[#001D3D]/20 transition-all active:scale-[0.98] mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>Authorize Session <ArrowRight size={20} strokeWidth={3} /></>
              )}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
              Authorized Personnel Only
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}