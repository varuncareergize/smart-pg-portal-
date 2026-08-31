import { AlertCircle, Building2, RotateCw } from 'lucide-react';

export function ListingSkeletons({ count = 6 }) {
  return <div className="listing-grid" aria-label="Loading properties">{Array.from({ length: count }, (_, index) => <div className="listing-skeleton" key={index}><span /><div><i /><i /><i /><i /></div></div>)}</div>;
}

export function EmptyState({ categoryLabel = 'properties', onClear }) {
  return <section className="market-state"><Building2 /><h2>No {categoryLabel.toLowerCase()} match these filters</h2><p>Try a different locality or broaden your price range.</p>{onClear && <button className="button button--secondary" onClick={onClear}>Clear filters</button>}</section>;
}

export function ErrorState({ onRetry }) {
  return <section className="market-state" role="alert"><AlertCircle /><h2>We couldn’t load properties right now</h2><p>Check your connection and try again.</p><button className="button button--secondary" onClick={onRetry}><RotateCw /> Retry</button></section>;
}
