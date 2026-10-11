import { useTranslation } from 'react-i18next';
import { translate } from '../i18n';
import { Link } from 'react-router-dom';

export default function Footer() {
  useTranslation();

  return <footer className="public-footer"><div className="market-container footer-grid"><div><Link className="brand brand--light" to="/">{translate("LIVZZ")}<span>.</span></Link><p>{translate("Thoughtful property discovery for Bengaluru.")}</p></div><div><strong>{translate("Explore")}</strong><Link to="/pg">{translate("PG Rooms")}</Link><Link to="/apartments">{translate("Apartments")}</Link><Link to="/villas">{translate("Villas")}</Link><Link to="/offices">{translate("Office Spaces")}</Link></div><div><strong>{translate("Company")}</strong><Link to="/about-us">{translate("About")}</Link><Link to="/contact">{translate("Contact")}</Link><Link to="/contact">{translate("List your property")}</Link></div></div><div className="market-container footer-bottom">© {new Date().getFullYear()} {translate("LIVZZ. All rights reserved.")}</div></footer>;
}
