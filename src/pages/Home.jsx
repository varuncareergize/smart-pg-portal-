import { useTranslation } from 'react-i18next';
import { translate } from '../i18n';
import { useEffect, useState } from 'react';
import { ArrowRight, Building2, Home as HomeIcon, MapPin, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ListingCard from '../components/marketplace/ListingCard';
import { ErrorState, ListingSkeletons } from '../components/marketplace/MarketplaceStates';
import { categoryConfig, getProperties } from '../api/marketplace';
import { listingArray, mapProperty } from '../utils/marketplaceAdapter';
import heroResidence from '../assets/image1.jpeg';

const categories = [
  ['pg', 'PG Rooms', 'Flexible, convenient city living.'],
  ['apartments', 'Apartments', 'Your own space for longer stays.'],
  ['villas', 'Villas', 'More space, privacy and premium living.'],
  ['office', 'Office Spaces', 'For professionals and growing teams.'],
];

export default function Home() {
  useTranslation();

  const navigate = useNavigate();
  const [category, setCategory] = useState('pg');
  const [locality, setLocality] = useState('');
  const [state, setState] = useState({ loading: true, error: false, items: [] });

  const load = () => {
    setState((s) => ({ ...s, loading: true, error: false }));
    getProperties({ page_size: 6 })
      .then((result) =>
        setState({ loading: false, error: false, items: listingArray(result).map(mapProperty) })
      )
      .catch(() => setState({ loading: false, error: true, items: [] }));
  };

  useEffect(() => {
    document.title = 'LIVZZ | Find a place that fits your life';
    getProperties({ page_size: 6 })
      .then((result) =>
        setState({ loading: false, error: false, items: listingArray(result).map(mapProperty) })
      )
      .catch(() => setState({ loading: false, error: true, items: [] }));
  }, []);

  const search = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (locality.trim()) params.set('locality', locality.trim());
    navigate(`${categoryConfig[category].route}${params.size ? `?${params}` : ''}`);
  };

  return (
    <div className="site-shell">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="home-hero">
          <img src={heroResidence} alt={translate("Contemporary Bengaluru residence")} fetchPriority="high" />
          <div className="home-hero__overlay" />

          <div className="market-container home-hero__content">
            <p className="eyebrow eyebrow--light">{translate("Property discovery, made considered")}</p>
            <h1 style={{ marginTop: '1rem' }}>{translate("Find a place that fits your life.")}</h1>
            <p style={{ marginTop: '1rem' }}> {translate("PG rooms, apartments, villas and offices across Bengaluru—one clear place to explore them.")} </p>

            <form className="hero-search" onSubmit={search} style={{ marginTop: '2rem' }}>
              <fieldset>
                <legend>{translate("What are you looking for?")}</legend>
                <div className="category-tabs">
                  {categories.map(([key, label]) => (
                    <button
                      type="button"
                      aria-pressed={category === key}
                      onClick={() => setCategory(key)}
                      key={key}
                    >
                      {translate(label)}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="search-row">
                <label>
                  <MapPin />
                  <span>{translate("Location or locality")}</span>
                  <input
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    placeholder={translate("Try Indiranagar")}
                  />
                </label>

                <label>
                  <HomeIcon />
                  <span>{translate("Property type")}</span>
                  <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {categories.map(([key, label]) => (
                      <option value={key} key={key}>
                        {translate(label)}
                      </option>
                    ))}
                  </select>
                </label>

                <button className="button button--primary" type="submit">
                  <Search /> {translate("Search")} </button>
              </div>
            </form>
          </div>
        </section>

        {/* Category grid */}
        <section className="market-container home-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">{translate("Browse your way")}</p>
              <h2>{translate("Spaces for every kind of city life")}</h2>
            </div>
          </div>

          <div className="category-grid">
            {categories.map(([key, label, copy]) => (
              <Link to={categoryConfig[key].route} key={key}>
                <span>{translate(key === 'office' ? <Building2 /> : <HomeIcon />)}</span>
                <h3>{translate(label)}</h3>
                <p>{translate(copy)}</p>
                <ArrowRight />
              </Link>
            ))}
          </div>
        </section>

        {/* Discovery / listings */}
        <section className="discovery-section">
          <div className="market-container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{translate("On LIVZZ now")}</p>
                <h2>{translate("Explore places")}</h2>
              </div>
              <Link to="/pg"> {translate("Browse all")} <ArrowRight />
              </Link>
            </div>

            {translate(state.loading ? (
              <ListingSkeletons count={3} />
            ) : state.error ? (
              <ErrorState onRetry={load} />
            ) : state.items.length ? (
              <div className="listing-grid">
                {state.items.slice(0, 6).map((item) => (
                  <ListingCard listing={item} key={item.slug || item.id} />
                ))}
              </div>
            ) : (
              <div className="quiet-empty">
                <Building2 />
                <h3>{translate("New places are on the way")}</h3>
                <p>{translate("There are no published listings to show just yet. Check back soon.")}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}