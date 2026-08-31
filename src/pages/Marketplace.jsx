import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ListingCard from '../components/marketplace/ListingCard';
import MarketplaceFilters from '../components/marketplace/MarketplaceFilters';
import { EmptyState, ErrorState, ListingSkeletons } from '../components/marketplace/MarketplaceStates';
import { categoryConfig, categoryLoaders, sanitizeMarketplaceParams } from '../api/marketplace';
import { listingArray, mapListing } from '../utils/marketplaceAdapter';

const COPY = {
  pg: ['PG rooms in Bengaluru', 'Flexible city living with clear pricing and the details that matter.'],
  apartments: ['Apartments for your next chapter', 'Find a home for longer stays, from compact one-beds to family spaces.'],
  villas: ['Villas with room to live', 'Explore private, spacious homes across Bengaluru neighbourhoods.'],
  office: ['Office spaces that work for you', 'Discover spaces for professionals, teams and growing businesses.'],
};

export default function Marketplace({ category }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState({ loading: true, error: false, items: [], meta: {} });
  const [mobileOpen, setMobileOpen] = useState(false);
  const requestKey = searchParams.toString();
  const values = useMemo(() => Object.fromEntries(new URLSearchParams(requestKey).entries()), [requestKey]);
  const config = categoryConfig[category];
  const [title, subtitle] = COPY[category];

  const load = useCallback((signal) => {
    setState((current) => ({ ...current, loading: true, error: false }));
    return categoryLoaders[category](Object.fromEntries(new URLSearchParams(requestKey).entries()), { signal })
      .then((envelope) => setState({ loading: false, error: false, items: listingArray(envelope).map(mapListing), meta: envelope.meta || envelope.data?.meta || {} }))
      .catch((error) => { if (error.name !== 'AbortError') setState({ loading: false, error: true, items: [], meta: {} }); });
  }, [category, requestKey]);

  useEffect(() => { document.title = `${config.label} in Bengaluru | LIVZZ`; const controller = new AbortController(); const pending = Promise.resolve().then(() => load(controller.signal)); pending.catch(() => {}); return () => controller.abort(); }, [load, config.label]);
  const setValue = (key, nextValue) => { const next = new URLSearchParams(searchParams); nextValue ? next.set(key, nextValue) : next.delete(key); if (key !== 'page') next.delete('page'); setSearchParams(sanitizeMarketplaceParams(Object.fromEntries(next.entries()), category)); };
  const clear = () => setSearchParams({});
  const page = Number(values.page || state.meta.current_page || 1);
  const pages = Number(state.meta.total_pages || state.meta.pages || 1);
  const total = state.meta.count ?? state.meta.total;

  return <div className="site-shell"><Navbar /><main><header className="market-hero"><div className="market-container"><p className="eyebrow">Find your space</p><h1>{title}</h1><p>{subtitle}</p></div></header><section className="market-container marketplace-layout"><MarketplaceFilters category={category} values={values} setValue={setValue} clear={clear} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} /><div className="market-results"><div className="results-heading"><div><p className="eyebrow">{config.label}</p><h2>{total === undefined ? 'Available places' : `${total} ${total === 1 ? 'place' : 'places'}`}</h2></div></div>{state.loading ? <ListingSkeletons /> : state.error ? <ErrorState onRetry={() => load()} /> : state.items.length === 0 ? <EmptyState categoryLabel={config.label} onClear={clear} /> : <div className="listing-grid">{state.items.map((item) => <ListingCard listing={item} key={item.slug || item.id} />)}</div>}{!state.loading && !state.error && pages > 1 && <nav className="pagination" aria-label="Listing pages"><button type="button" disabled={page <= 1} onClick={() => setValue('page', String(page - 1))}>Previous</button><span>Page {page} of {pages}</span><button type="button" disabled={page >= pages} onClick={() => setValue('page', String(page + 1))}>Next</button></nav>}</div></section></main><Footer /></div>;
}
