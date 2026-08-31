# LIVZZ Frontend Redesign Audit

Date: 2026-08-31  
Branch: `redesign`

## Architecture

- Framework: React 19 with Vite 8.
- Router: React Router 7 using `BrowserRouter`, lazy page imports, and nested protected routes.
- Styling: Tailwind CSS 4 plus global tokens/utilities in `src/index.css`; no component library.
- API: mixed `fetch` and Axios wrappers in `src/api.js`. `VITE_API_BASE_URL` is the existing environment boundary.
- Authentication: token stored in `localStorage`; the legacy API module also contains a hardcoded fallback token. Public marketplace V2 requests should not depend on authentication.
- Images: repository assets plus remote fallbacks. Legacy public cards can render broken images and use an unrelated Unsplash image as invented listing imagery.

## Routes and page structure

Public routes before redesign:

- `/` -> `Home`
- `/properties` -> `Properties`
- `/property/:id` -> `PropertyDetails`
- `/login`, `/services`, `/about-us`, `/contact`

Protected owner/management routes are nested under `ProtectedRoute` and `Layout`: dashboard, rooms, tenants, visitors, maintenance, payments, staff, grocery, and related create/edit routes. These are outside this redesign and must remain compatible.

## Public marketplace components

- `Home.jsx` fetches `/properties/` directly and reshapes V1 data in-page.
- `Properties.jsx` is a large client-filtered page with V1 fetching and fabricated enrichment.
- `PropertyDetails.jsx` uses `/properties/:id/` and creates fallback room/availability facts.
- There are duplicate card implementations at `components/PropertyCard.jsx` and `components/properties/PropertyCard.jsx`.
- Other marketplace-only components include `SearchBar`, `QuickFilters`, `FilterSidebar`, `ImageCarousel`, `MapView`, `CompareDrawer`, `AIRecommendation`, `TrustSignals`, `SkeletonCard`, and `EmptyState`.
- Saved/favourite and comparison state are client-only. Map coordinates are derived/fabricated rather than supplied by the marketplace API.

## Data-truth findings

The existing production public path contains unsupported marketplace claims:

- fallback ratings and review presentation;
- generated deposits and distance-to-metro/college values;
- generated availability, room counts, beds, and dates;
- AI match percentages and recommendation reasons;
- “verified”, “certified”, “popular”, “prime location”, and similar badges;
- fake map coordinates and `Math.random()` enrichment;
- fixed policies and fallback property facts;
- a hardcoded fallback property photograph unrelated to the listing.

These components must be removed from the active public marketplace path. They may remain temporarily as unimported legacy files where deletion could risk unrelated work.

## API and environment findings

- Public pages use V1 `/properties/` and `/properties/:id/`.
- Private pages use legacy endpoints such as `/rooms/`, `/tenants/`, `/payments/`, etc.; these must not be migrated in this phase.
- `VITE_API_BASE_URL` is the configured base URL and will be retained.
- The new public client will use the canonical `/api/v2/marketplace/...` endpoints and V2 `{ data, meta }` envelope.
- Query values will be forwarded only from an explicit allowlist. Nullable fields will remain nullable.

## Design findings

- Existing public colors are navy/yellow and management colors are “SmartGP” green/navy.
- The requested marketplace palette is not represented as semantic tokens.
- Navbar mixes old product styling and public navigation does not expose all four categories.
- The hero prioritizes decorative imagery/badges over search and contains unsupported trust claims.
- Loading, empty, and error experiences are inconsistent.

## Known issues and conservative boundaries

- `src/api.js` contains a hardcoded auth token. Removing it can break private pages and is therefore documented as security/legacy debt rather than changed as part of the public redesign.
- Dashboard and management endpoint inconsistencies are pre-existing and out of scope.
- The backend repository/schema is not present in this workspace. Category query parameters will be limited to names supplied in the Phase 3 frontend contract; no speculative aliases will be introduced.
- Existing staged user files (`PRODUCT_COMPLETION_AUDIT.md`, two images, property filter utility/tests) are preserved.

## Implementation direction

Create a small public marketplace layer (`api/client.js`, `api/marketplace.js`, adapters), shared marketplace UI, four category routes, URL-synchronized filters, a slug detail route, truthful states, semantic design tokens, and responsive public navigation. Keep `/properties` as a compatibility route and preserve every protected route.
