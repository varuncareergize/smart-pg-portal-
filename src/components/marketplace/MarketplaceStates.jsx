import { useTranslation } from 'react-i18next';
import { translate } from '../../i18n';
import { AlertCircle, Building2, RotateCw } from 'lucide-react';

export function ListingSkeletons({ count = 6 }) {
  useTranslation();

  return <div className="listing-grid" aria-label={translate("Loading properties")}>{Array.from({ length: count }, (_, index) => <div className="listing-skeleton" key={index}><span /><div><i /><i /><i /><i /></div></div>)}</div>;
}

export function EmptyState({ categoryLabel = 'properties', onClear }) {
  useTranslation();

  return <section className="market-state"><Building2 /><h2>{translate('No matching {{category}}', { category: translate(categoryLabel) })}</h2><p>{translate("Try a different locality or broaden your price range.")}</p>{onClear && <button className="button button--secondary" onClick={onClear}>{translate("Clear filters")}</button>}</section>;
}

export function ErrorState({ onRetry }) {
  useTranslation();

  return <section className="market-state" role="alert"><AlertCircle /><h2>{translate("We couldn’t load properties right now")}</h2><p>{translate("Check your connection and try again.")}</p><button className="button button--secondary" onClick={onRetry}><RotateCw /> {translate("Retry")}</button></section>;
}
