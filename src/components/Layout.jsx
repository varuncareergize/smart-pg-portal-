import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import NavbarInside from './NavbarInside'; // Import your new navbar

export default function Layout() {
  useTranslation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(open => !open);
  return (
    <div className="flex h-dvh w-full bg-slate-50 overflow-hidden">
      {/* Sidebar - Desktop */}
      <Sidebar isOpen={isMenuOpen} toggleMenu={toggleMenu} />

      <div className="min-w-0 flex-1 flex flex-col overflow-hidden">
        {/* TOP NAVBAR INSIDE DASHBOARD */}
        <NavbarInside onToggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />

        {/* PAGE CONTENT */}
        <main className="dashboard-content min-w-0 flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-4 md:p-6">
          <Outlet /> {/* This is where Dashboard, Tenants, etc. render */}
        </main>
      </div>
    </div>
  );
}
