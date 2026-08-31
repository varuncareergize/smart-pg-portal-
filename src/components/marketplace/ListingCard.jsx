import { ArrowUpRight, Building2, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mapListing } from '../../utils/marketplaceAdapter';

export default function ListingCard({ listing }) {
  const item = listing.raw ? listing : mapListing(listing);
  return (
    <article className="listing-card">
      <Link className="listing-card__media" to={`/property/${item.slug}`} aria-label={`View ${item.title}`}>
        {item.primaryImage ? <img src={item.primaryImage} alt={item.title} loading="lazy" onError={(event) => { event.currentTarget.hidden = true; event.currentTarget.nextElementSibling.hidden = false; }} /> : null}
        <span className="image-placeholder" hidden={Boolean(item.primaryImage)}><Building2 aria-hidden="true" /><span>Image not available</span></span>
      </Link>
      <div className="listing-card__body">
        {item.categoryLabel && <p className="eyebrow">{item.categoryLabel}</p>}
        <h3><Link to={`/property/${item.slug}`}>{item.title}</Link></h3>
        {item.location && <p className="listing-location"><MapPin aria-hidden="true" />{item.location}</p>}
        {item.facts.length > 0 && <ul className="fact-list">{item.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>}
        <div className="listing-card__footer">
          <div>{item.pricing ? <><strong>{item.pricing.formatted}</strong>{item.pricing.cycle && <span> / {item.pricing.cycle}</span>}</> : <span className="muted">Price on enquiry</span>}</div>
          <Link to={`/property/${item.slug}`} aria-label={`View details for ${item.title}`}><ArrowUpRight aria-hidden="true" /></Link>
        </div>
      </div>
    </article>
  );
}
