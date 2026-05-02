import { NavLink } from 'react-router-dom';
import { 
  Squares2X2Icon, BuildingOfficeIcon, KeyIcon, UsersIcon, 
  UserGroupIcon, CreditCardIcon, WrenchScrewdriverIcon, 
  XMarkIcon, ShoppingCartIcon, UserPlusIcon
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: Squares2X2Icon },
  // { name: 'Properties', path: '/properties', icon: BuildingOfficeIcon },
  { name: 'Rooms', path: '/rooms', icon: KeyIcon },
  { name: 'Tenants', path: '/tenants', icon: UsersIcon },
  { name: 'Visitors', path: '/visitors', icon: UserPlusIcon }, // Added Visitors
  { name: 'Staff', path: '/staff', icon: UserGroupIcon },
  { name: 'Payments', path: '/payments', icon: CreditCardIcon },
  { name: 'Grocery', path: '/grocery', icon: ShoppingCartIcon }, // Added Grocery
  { name: 'Maintenance', path: '/maintenance', icon: WrenchScrewdriverIcon },
];

export default function Sidebar({ isOpen, toggleMenu }) {
  const sidebarClasses = `
    fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-sg-border transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
  `;

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-sg-navy/40 backdrop-blur-sm lg:hidden" 
          onClick={toggleMenu}
        />
      )}

      <aside className={sidebarClasses}>
        <div className="h-full flex flex-col">
          <div className="p-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-sg-navy tracking-tighter">
                Smart<span className="text-sg-green">PG</span>
              </h1>
              <p className="text-[10px] font-bold text-sg-green uppercase tracking-widest mt-0.5">Management Portal</p>
            </div>
            <button onClick={toggleMenu} className="lg:hidden p-2 text-sg-text-muted">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => window.innerWidth < 1024 && toggleMenu()}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3.5 rounded-2xl font-semibold transition-all duration-200
                  ${isActive ? 'bg-sg-green/10 text-sg-green' : 'text-sg-text-muted hover:bg-sg-bg hover:text-sg-navy'}
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[15px]">{item.name}</span>
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-sg-border bg-sg-bg/30">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-sg-border">
              <img src="https://ui-avatars.com/api/?name=Varun&background=1AB076&color=fff" className="w-10 h-10 rounded-xl" alt="user" />
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-sg-navy truncate">Varun</p>
                <p className="text-[10px] font-bold text-sg-green uppercase">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}