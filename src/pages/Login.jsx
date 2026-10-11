import { useTranslation } from 'react-i18next';
import { translate } from '../i18n';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, EyeOff, Lock, User, ArrowRight, ShieldCheck, ShieldAlert, Loader2 
} from 'lucide-react';
import { BASE_URL } from '../api';
import LanguageSelector from '../components/LanguageSelector';

export default function Login() {
  useTranslation();

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
      const response = await fetch(`${BASE_URL}auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: formData.username.trim(), password: formData.password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        const authToken = data.token || data.access;
        if (authToken) {
          localStorage.setItem('token', authToken);
        }
        localStorage.setItem('user', JSON.stringify(data.user || formData.username));
        
        navigate('/dashboard');
      } else {
        if (response.status === 401) {
          setError({ title: "Authentication Failed", message: "Invalid username or password." });
        } else if (response.status === 403) {
          setError({ title: "Access Restricted", message: "Account not authorized." });
        } else {
          setError({ title: "Server Error", message: "Please try again later." });
        }
      }
    } catch (err) {
      setError({ title: "Connection Error", message: "Unable to connect to the server." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-screen">
      <section className="login-brand-panel">
        <h1>{translate("LivZZ")}</h1>
        <div>
          <p className="eyebrow eyebrow--light">{translate("Property management")}</p>
          <h2>{translate("Your properties.")}<br />{translate("One dashboard.")}</h2>
          <p>{translate("Manage your rooms, tenants, payments, and daily operations in one place.")}</p>
        </div>
        <p className="login-brand-caption">{translate("Welcome to your LIVZZ dashboard.")}</p>
      </section>
      <section className="login-form-panel">
        <div className="login-language"><LanguageSelector /></div>

        <div className="login-form-content">
          <div className="mb-10 text-center">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-500 ${error ? 'bg-red-50 text-red-500' : 'bg-[#00C896]/10 text-[#00C896]'}`}>
              {translate(error ? <ShieldAlert size={32} strokeWidth={2.5} /> : <ShieldCheck size={32} strokeWidth={2.5} />)}
            </div>
            <h2 className="text-2xl font-black text-[#001D3D]">{translate("Dashboard login")}</h2>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl">
               <h4 className="text-[10px] font-black text-red-600 uppercase tracking-widest">{translate(error.title)}</h4>
               <p className="text-xs font-bold text-red-500/80 mt-0.5">{translate(error.message)}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#001D3D] uppercase tracking-widest ml-1">{translate("Phone number")}</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#00C896]">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-[#001D3D] outline-none focus:ring-[#00C896]/10 focus:border-[#00C896]"
                  placeholder={translate("Enter phone number")}
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-[#001D3D] uppercase tracking-widest">{translate("Password")}</label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#00C896]">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-[#001D3D] outline-none focus:ring-[#00C896]/10 focus:border-[#00C896]"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-300"
                >
                  {translate(showPassword ? <EyeOff size={20} /> : <Eye size={20} />)}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#001D3D] text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-[#00C896] transition-all disabled:opacity-50"
            >
              {translate(loading ? <Loader2 className="animate-spin" size={20} /> : <>{translate("Authorize Session")} <ArrowRight size={20} /></>)}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
