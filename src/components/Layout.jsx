import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Squares2X2Icon, BuildingOfficeIcon, KeyIcon, UsersIcon, 
  UserGroupIcon, CreditCardIcon, WrenchScrewdriverIcon,
  MagnifyingGlassIcon, BellIcon, Cog6ToothIcon, 
  Bars3Icon, XMarkIcon 
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: Squares2X2Icon },
//   { name: 'Properties', path: '/properties', icon: BuildingOfficeIcon },
  { name: 'Rooms', path: '/rooms', icon: KeyIcon },
  { name: 'Tenants', path: '/tenants', icon: UsersIcon },
  { name: 'Staff', path: '/staff', icon: UserGroupIcon },
  { name: 'Payments', path: '/payments', icon: CreditCardIcon },
  { name: 'Maintenance', path: '/maintenance', icon: WrenchScrewdriverIcon },
];

export default function Layout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Helper to close menu when a link is clicked on mobile
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex h-screen bg-sg-bg overflow-hidden">
      {/* --- MOBILE SIDEBAR OVERLAY --- */}
      <div className={`fixed inset-0 z-50 lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-sg-navy/50 backdrop-blur-sm" onClick={closeMenu} />
        <aside className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300">
          <SidebarContent closeMenu={closeMenu} />
        </aside>
      </div>

      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-sg-border flex-col shrink-0">
        <SidebarContent />
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile-Friendly Header */}
        <header className="h-16 lg:h-20 bg-white border-b border-sg-border flex items-center justify-between px-4 lg:px-10 shrink-0">
          <div className="flex items-center gap-3">
            {/* Hamburger Button for Mobile */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-sg-bg rounded-lg text-sg-navy"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
            
            <div className="relative hidden sm:block w-48 md:w-80">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sg-text-muted" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2 bg-sg-bg border border-sg-border rounded-xl text-sm focus:ring-2 focus:ring-sg-green/20 outline-none" 
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 text-sg-text-muted relative">
              <BellIcon className="w-5 h-5 md:w-6 md:h-6" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-6 w-px bg-sg-border mx-1 hidden md:block" />
            <div className="flex items-center gap-2 cursor-pointer">
              <img src="https://ui-avatars.com/api/?name=Alex&background=1AB076&color=fff" className="w-8 h-8 rounded-full" alt="avatar" />
              <span className="text-xs font-bold text-sg-navy hidden sm:block">Alex Sterling</span>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

// Sub-component for Sidebar logic to avoid repetition
function SidebarContent({ closeMenu }) {
  return (
    <>
      <div className="p-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-sg-navy">Smart<span className="text-sg-green">PG</span></h1>
          <p className="text-[10px] font-bold text-sg-green tracking-widest uppercase">Portal</p>
        </div>
        {closeMenu && (
          <button onClick={closeMenu} className="lg:hidden p-2 text-sg-text-muted">
            <XMarkIcon className="w-6 h-6" />
          </button>
        )}
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={closeMenu}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all
              ${isActive ? 'bg-sg-green/10 text-sg-green' : 'text-sg-text-muted hover:bg-sg-bg'}
            `}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sg-border m-4 bg-sg-bg/50 rounded-2xl">
        <p className="text-[10px] font-bold text-sg-text-muted uppercase mb-2 text-center">Support</p>
        <button className="w-full py-2 text-xs font-bold bg-white border border-sg-border rounded-lg shadow-sm">Help Center</button>
      </div>
    </>
  );
}