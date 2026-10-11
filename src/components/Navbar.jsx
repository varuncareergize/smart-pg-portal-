import { useTranslation } from 'react-i18next';
import { translate } from '../i18n';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';

const links = [['/pg', 'PGs'], ['/apartments', 'Apartments'], ['/villas', 'Villas'], ['/offices', 'Offices']];

export default function Navbar() {
  useTranslation();

  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const close = (event) => { if (event.key === 'Escape') { setOpen(false); buttonRef.current?.focus(); } };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  return <header className="public-nav"><div className="market-container public-nav__inner"><Link to="/" className="brand" aria-label={translate("LIVZZ home")}>{translate("LIVZZ")}<span>.</span></Link><nav className="desktop-nav" aria-label={translate("Main navigation")}>{links.map(([to, label]) => <NavLink to={to} key={to}>{translate(label)}</NavLink>)}</nav><div className="nav-actions"><LanguageSelector /><Link className="list-property" to="/contact">{translate("List your property")}</Link><Link className="account-link" to="/login">{translate("Login")}</Link><button ref={buttonRef} type="button" className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>{translate(open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />)}</button></div></div>{open && <nav id="mobile-menu" className="mobile-nav" aria-label={translate("Mobile navigation")}>{links.map(([to, label]) => <NavLink to={to} key={to} onClick={() => setOpen(false)}>{translate(label)}</NavLink>)}<Link to="/contact" onClick={() => setOpen(false)}>{translate("List your property")}</Link><Link to="/login" onClick={() => setOpen(false)}>{translate("Login")}</Link></nav>}</header>;
}
