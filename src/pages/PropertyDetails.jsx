import { useTranslation } from 'react-i18next';
import { translate } from '../i18n';
import { lazy, Suspense, useEffect, useState } from 'react';
import { ArrowLeft, Building2, CalendarDays, MapPin } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { ErrorState, ListingSkeletons } from '../components/marketplace/MarketplaceStates';
import { getListingBySlug } from '../api/marketplace';
import { availabilityLabel, mapProperty } from '../utils/marketplaceAdapter';

const MapView = lazy(() => import('../components/properties/MapView'));
const humanize = (value) => String(value).replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

export default function PropertyDetails() {
  useTranslation();

  const { slug } = useParams();
  const [state, setState] = useState({ loading: true, error: false, listing: null });
  const load = () => {
    setState({ loading: true, error: false, listing: null });
    getListingBySlug(slug).then((result) => setState({ loading: false, error: false, listing: mapProperty(result.data) })).catch(() => setState({ loading: false, error: true, listing: null }));
  };
  useEffect(() => {
    const controller = new AbortController();
    getListingBySlug(slug, { signal: controller.signal }).then((result) => {
      const listing = mapProperty(result.data);
      setState({ loading: false, error: false, listing });
      document.title = `${listing.title}${listing.location ? ` in ${listing.location}` : ''} | LIVZZ`;
    }).catch((error) => { if (error.name !== 'AbortError') setState({ loading: false, error: true, listing: null }); });
    return () => controller.abort();
  }, [slug]);

  if (state.loading) return <div className="site-shell"><Navbar /><main className="market-container detail-loading"><ListingSkeletons count={3} /></main><Footer /></div>;
  if (state.error || !state.listing) return <div className="site-shell"><Navbar /><main className="market-container detail-loading"><ErrorState onRetry={load} /></main><Footer /></div>;

  const item = state.listing;
  const detailEntries = Object.entries(item.categoryDetails).filter(([, value]) => value !== null && value !== undefined && value !== '' && typeof value !== 'object');
  const amenities = item.amenities.map((amenity) => typeof amenity === 'string' ? amenity : amenity.name).filter(Boolean);
  const deposit = item.pricing && item.raw.pricing?.deposit;
  return <div className="site-shell"><Navbar /><main className="market-container property-detail">
    <nav className="breadcrumb" aria-label={translate("Breadcrumb")}><Link to="/"><ArrowLeft /> {translate("Home")}</Link><span>/</span><span>{translate(item.categoryLabel || 'Property')}</span></nav>
    <header className="detail-title"><div><p className="eyebrow">{translate(item.categoryLabel)}</p><h1>{item.title}</h1>{item.location && <p><MapPin />{item.location}</p>}</div></header>
    <section className={`media-gallery media-gallery--${Math.min(item.media.length, 3)}`}>{translate(item.media.length ? item.media.slice(0, 3).map((image, index) => <img key={image} src={image} alt={`${item.title}${index ? `, view ${index + 1}` : ''}`} />) : <div className="image-placeholder"><Building2 /><span>{translate("Images not available")}</span></div>)}</section>
    <div className="detail-layout"><div className="detail-content">
      {item.description && <section><p className="eyebrow">{translate("About this place")}</p><h2>{translate("Property overview")}</h2><p className="detail-description">{item.description}</p></section>}
      {detailEntries.length > 0 && <section><p className="eyebrow">{translate("The essentials")}</p><h2>{translate("Property details")}</h2><dl className="detail-facts">{detailEntries.map(([key, value]) => <div key={key}><dt>{translate(humanize(key))}</dt><dd>{translate(typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value))}</dd></div>)}</dl></section>}
      {amenities.length > 0 && <section><p className="eyebrow">{translate("What’s included")}</p><h2>{translate("Amenities")}</h2><ul className="amenity-list">{amenities.map((amenity) => <li key={amenity}>{translate(amenity)}</li>)}</ul></section>}
      {item.location && <section><p className="eyebrow">{translate("Neighbourhood")}</p><h2>{translate("Location")}</h2><p className="detail-description"><MapPin className="inline-icon" /> {item.location}</p>{item.hasCoordinates && <div className="detail-map"><Suspense fallback={<div className="map-state" role="status">{translate("Loading map…")}</div>}><MapView listings={[item]} single /></Suspense></div>}</section>}
    </div><aside className="conversion-card"><p className="eyebrow">{translate("Pricing")}</p>{translate(item.pricing ? <h2>{item.pricing.display}</h2> : <h2>{translate("Price on enquiry")}</h2>)}{deposit !== null && deposit !== undefined && <p>{translate("Deposit")} {new Intl.NumberFormat('en-IN', { style: 'currency', currency: item.pricing.currency, maximumFractionDigits: 0 }).format(Number(deposit))}</p>}<div className="availability"><CalendarDays /> <span>{translate(availabilityLabel(item.availability))}</span></div><Link className="button button--primary" to="/contact">{translate("Contact property")}</Link><small>{translate("Share your interest with LIVZZ. No booking or payment is made online.")}</small></aside></div>
  </main><Footer /></div>;
}
