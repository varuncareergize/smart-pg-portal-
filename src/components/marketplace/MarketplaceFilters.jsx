import { SlidersHorizontal, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

const CATEGORY_FIELDS = {
  pg: [
    ['gender_policy', 'Gender policy', [['', 'Any'], ['male', 'Men'], ['female', 'Women'], ['unisex', 'Unisex']]],
    ['capacity', 'Sharing', [['', 'Any'], ['1', 'Single'], ['2', '2 sharing'], ['3', '3 sharing'], ['4', '4 sharing']]],
    ['meals', 'Meals', [['', 'Any'], ['true', 'Available'], ['false', 'Not included']]],
  ],
  apartments: [
    ['bedrooms', 'Bedrooms', [['', 'Any'], ['1', '1 BHK'], ['2', '2 BHK'], ['3', '3 BHK'], ['4', '4+ BHK']]],
    ['furnishing', 'Furnishing', [['', 'Any'], ['furnished', 'Furnished'], ['semi_furnished', 'Semi-furnished'], ['unfurnished', 'Unfurnished']]],
  ],
  villas: [
    ['bedrooms', 'Bedrooms', [['', 'Any'], ['2', '2 BHK'], ['3', '3 BHK'], ['4', '4+ BHK']]],
    ['furnishing', 'Furnishing', [['', 'Any'], ['furnished', 'Furnished'], ['semi_furnished', 'Semi-furnished'], ['unfurnished', 'Unfurnished']]],
  ],
  office: [
    ['office_type', 'Office type', [['', 'Any'], ['managed', 'Managed office'], ['private', 'Private office'], ['commercial', 'Commercial office']]],
    ['capacity', 'Workstations', [['', 'Any'], ['10', 'Up to 10'], ['20', 'Up to 20'], ['50', 'Up to 50'], ['100', '100+']]],
  ],
};

export default function MarketplaceFilters({ category, values, setValue, clear, mobileOpen, setMobileOpen }) {
  const fields = CATEGORY_FIELDS[category] || [];
  const active = Object.values(values).filter(Boolean).length;
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);
  useEffect(() => {
    if (!mobileOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    const close = (event) => { if (event.key === 'Escape') { setMobileOpen(false); triggerRef.current?.focus(); } };
    document.addEventListener('keydown', close);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', close); };
  }, [mobileOpen, setMobileOpen]);
  const content = <>
    <div className="filter-heading"><strong>Filter properties</strong><button ref={closeButtonRef} type="button" className="icon-button mobile-only" onClick={() => { setMobileOpen(false); triggerRef.current?.focus(); }} aria-label="Close filters"><X aria-hidden="true" /></button></div>
    <label>Locality<input value={values.locality || ''} onChange={(e) => setValue('locality', e.target.value)} placeholder="e.g. Indiranagar" /></label>
    <div className="filter-pair"><label>Min price<input type="number" min="0" value={values.min_price || ''} onChange={(e) => setValue('min_price', e.target.value)} placeholder="₹ Min" /></label><label>Max price<input type="number" min="0" value={values.max_price || ''} onChange={(e) => setValue('max_price', e.target.value)} placeholder="₹ Max" /></label></div>
    {fields.map(([name, label, options]) => <label key={name}>{label}<select value={values[name] || ''} onChange={(e) => setValue(name, e.target.value)}>{options.map(([optionValue, text]) => <option value={optionValue} key={optionValue}>{text}</option>)}</select></label>)}
    <label>Sort by<select value={values.sort || ''} onChange={(e) => setValue('sort', e.target.value)}><option value="">Recommended order</option><option value="price">Price: low to high</option><option value="-price">Price: high to low</option><option value="-published_at">Newest</option></select></label>
    {active > 0 && <button type="button" className="clear-button" onClick={clear}>Clear all filters</button>}
    <button type="button" className="button button--primary mobile-only" onClick={() => { setMobileOpen(false); triggerRef.current?.focus(); }}>Show results</button>
  </>;
  return <><button ref={triggerRef} type="button" className="button button--secondary filter-trigger" onClick={() => setMobileOpen(true)} aria-expanded={mobileOpen} aria-controls="mobile-filters"><SlidersHorizontal aria-hidden="true" /> Filters {active > 0 && <span aria-label={`${active} active filters`}>{active}</span>}</button><aside className="filter-sidebar" aria-label="Property filters">{content}</aside>{mobileOpen && <div className="filter-backdrop" onMouseDown={() => setMobileOpen(false)}><aside id="mobile-filters" className="filter-drawer" role="dialog" aria-modal="true" aria-label="Property filters" onMouseDown={(e) => e.stopPropagation()}>{content}</aside></div>}</>;
}
