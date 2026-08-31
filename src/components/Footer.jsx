import { Link } from 'react-router-dom';

export default function Footer() {
  return <footer className="public-footer"><div className="market-container footer-grid"><div><Link className="brand brand--light" to="/">LIVZZ<span>.</span></Link><p>Thoughtful property discovery for Bengaluru.</p></div><div><strong>Explore</strong><Link to="/pg">PG Rooms</Link><Link to="/apartments">Apartments</Link><Link to="/villas">Villas</Link><Link to="/offices">Office Spaces</Link></div><div><strong>Company</strong><Link to="/about-us">About</Link><Link to="/contact">Contact</Link><Link to="/contact">List your property</Link></div></div><div className="market-container footer-bottom">© {new Date().getFullYear()} LIVZZ. All rights reserved.</div></footer>;
}
