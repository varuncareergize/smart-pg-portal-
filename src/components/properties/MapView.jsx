import { useCallback, useEffect, useMemo, useState } from 'react';
import { AlertCircle, Building2, MapPin, X } from 'lucide-react';
import { GoogleMap, OverlayView, useJsApiLoader } from '@react-google-maps/api';
import { Link } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
const containerStyle = { width: '100%', height: '100%' };
const options = { streetViewControl: false, mapTypeControl: false, fullscreenControl: true, clickableIcons: false, gestureHandling: 'cooperative' };

function compactPrice(pricing) {
  const amount = Number(pricing?.amount);
  if (!Number.isFinite(amount)) return null;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(amount % 100000 ? 1 : 0)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(amount % 1000 ? 1 : 0)}k`;
  return `₹${amount.toLocaleString('en-IN')}`;
}

function MapState({ title, children }) {
  return <div className="map-state" role="status"><AlertCircle aria-hidden="true" /><h3>{title}</h3>{children && <p>{children}</p>}</div>;
}

export default function MapView({ listings = [], highlightedId, onHighlight, single = false }) {
  const plotted = useMemo(() => listings.filter((item) => item.hasCoordinates), [listings]);
  const [map, setMap] = useState(null);
  const [selected, setSelected] = useState(null);
  const { isLoaded, loadError } = useJsApiLoader({ id: 'livzz-google-maps', googleMapsApiKey: API_KEY });
  const fit = useCallback((instance) => {
    if (!window.google || plotted.length === 0) return;
    if (plotted.length === 1) { instance.setCenter(plotted[0].coordinates); instance.setZoom(single ? 15 : 14); return; }
    const bounds = new window.google.maps.LatLngBounds();
    plotted.forEach((item) => bounds.extend(item.coordinates));
    instance.fitBounds(bounds, 56);
  }, [plotted, single]);

  useEffect(() => { if (map) fit(map); }, [map, fit]);
  const visibleSelection = selected && plotted.some((item) => item.id === selected.id) ? selected : null;

  if (!API_KEY) return <MapState title="Map unavailable">Google Maps is not configured. You can still browse every listing in List view.</MapState>;
  if (loadError) return <MapState title="Map could not load">Please use List view while the map service is unavailable.</MapState>;
  if (plotted.length === 0) return <MapState title="No mapped listings on this page">These results do not include valid coordinates. All listings remain available in List view.</MapState>;
  if (!isLoaded) return <div className="map-state map-state--loading" role="status">Loading map…</div>;

  return <div className="google-map-shell">
    <GoogleMap mapContainerStyle={containerStyle} center={plotted[0].coordinates} zoom={13} onLoad={(instance) => { setMap(instance); fit(instance); }} onUnmount={() => setMap(null)} options={options}>
      {plotted.map((item) => {
        const active = highlightedId === item.id || visibleSelection?.id === item.id;
        const price = compactPrice(item.pricing);
        return <OverlayView key={item.id} position={item.coordinates} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          <button type="button" className={`map-marker${active ? ' map-marker--active' : ''}${price ? '' : ' map-marker--pin'}`} aria-label={`${item.title}${price ? `, ${price}` : ''}`} onFocus={() => onHighlight?.(item.id)} onBlur={() => onHighlight?.(null)} onMouseEnter={() => onHighlight?.(item.id)} onMouseLeave={() => onHighlight?.(null)} onClick={() => { setSelected(item); onHighlight?.(item.id); }}>
            {price || <MapPin aria-hidden="true" />}
          </button>
        </OverlayView>;
      })}
    </GoogleMap>
    {!single && <p className="map-page-note">Showing mapped listings from this results page ({plotted.length} of {listings.length}).</p>}
    {visibleSelection && <article className="map-preview">
      <button type="button" className="map-preview__close" onClick={() => setSelected(null)} aria-label="Close property preview"><X aria-hidden="true" /></button>
      <Link to={`/property/${visibleSelection.slug}`} className="map-preview__link">
        {visibleSelection.primaryImage ? <img src={visibleSelection.primaryImage} alt="" /> : <span className="map-preview__placeholder"><Building2 aria-hidden="true" /></span>}
        <span><small>{visibleSelection.categoryLabel}</small><strong>{visibleSelection.title}</strong>{visibleSelection.location && <span><MapPin aria-hidden="true" />{visibleSelection.location}</span>}<b>{visibleSelection.pricing?.display || 'Price on enquiry'}</b></span>
      </Link>
    </article>}
  </div>;
}
