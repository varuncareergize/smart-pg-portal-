import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const links = [['/pg', 'PGs'], ['/apartments', 'Apartments'], ['/villas', 'Villas'], ['/offices', 'Offices']];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const close = (event) => { if (event.key === 'Escape') { setOpen(false); buttonRef.current?.focus(); } };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  return <header className="public-nav"><div className="market-container public-nav__inner"><Link to="/" className="brand" aria-label="LIVZZ home">LIVZZ<span>.</span></Link><nav className="desktop-nav" aria-label="Main navigation">{links.map(([to, label]) => <NavLink to={to} key={to}>{label}</NavLink>)}</nav><div className="nav-actions"><Link className="list-property" to="/contact">List your property</Link><Link className="account-link" to="/login">Login</Link><button ref={buttonRef} type="button" className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button></div></div>{open && <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">{links.map(([to, label]) => <NavLink to={to} key={to} onClick={() => setOpen(false)}>{label}</NavLink>)}<Link to="/contact" onClick={() => setOpen(false)}>List your property</Link><Link to="/login" onClick={() => setOpen(false)}>Login</Link></nav>}</header>;
}
