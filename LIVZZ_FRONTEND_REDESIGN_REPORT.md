# LIVZZ Frontend Redesign Report

Date: 2026-08-31  
Branch: `redesign`

## 1. Previous frontend architecture

React 19/Vite 8 with React Router 7, Tailwind 4, and a mixed Fetch/Axios legacy API layer. Public pages fetched V1 `/properties/` data and applied large client-side enrichment. Protected management pages use the same repository but separate routes/components.

## 2. Files and components changed

- Routing: `src/App.jsx`
- Global design: `src/index.css`
- Public shell: `src/components/Navbar.jsx`, `Footer.jsx`
- Public pages: `src/pages/Home.jsx`, `Marketplace.jsx`, `PropertyDetails.jsx`
- API: `src/api/client.js`, `marketplace.js`
- Adapter: `src/utils/marketplaceAdapter.js`
- Shared UI: `src/components/marketplace/*`
- Documentation: this report, the audit, and `docs/marketplace-api-integration.md`

## 3. V1 dependencies removed/replaced

The active homepage, category marketplace, and detail route no longer call `/properties/` or `/properties/:id/`. `/properties` redirects to `/pg`; `/properties/:slug` remains a compatibility detail route. Legacy public files remain unimported where conservative isolation is safer than deletion.

## 4. V2 API integration

A centralized unauthenticated public client validates the `{ data, meta }` envelope. `marketplace.js` implements all six Phase 3 endpoints and an explicit query allowlist. Full field mapping is documented separately.

## 5. Routes added

`/pg`, `/apartments`, `/villas`, `/offices`, and slug-based `/property/:slug`. All existing private routes remain.

## 6. Shared marketplace components

One category-aware `ListingCard`, filters/drawer, grid, pagination, skeleton, empty state, and error state are shared across the four experiences.

## 7. Design system changes

Semantic tokens implement the LIVZZ green palette, warm background, surface/border/text states, typography, spacing, radii, shadows, and containers. Existing SmartGP token names remain aliased for private-route compatibility.

## 8. Homepage redesign

Search is visible above the fold, with a prominent four-category selector, locality input, property type, and URL-based navigation. Category discovery and API-powered “Explore places” replace unsupported featured/trust claims. Zero listings has a calm neutral state.

## 9. Category pages

Four shared category pages use tailored headings and supported category filter names while retaining one coherent marketplace system.

## 10. Listing detail

Slug V2 data powers breadcrumbs, title/location, a one-to-three image gallery, pricing, optional deposit, category facts, amenities, description, availability, and a truthful conversion card.

## 11. Filters

Filters synchronize to URL query parameters, survive refresh/back/forward, expose active count, clear state, pagination, desktop sidebar, and mobile drawer. Unknown parameters are not forwarded.

## 12. Responsive changes

Layouts adapt at 1024, 768, and 520px for the requested device range. Mobile has a menu, filter drawer, single-column search/card layouts, horizontally swipeable detail media, and no expected horizontal page overflow.

## 13. Accessibility

Semantic links/buttons/forms, visible focus, field labels, navigation labels, image alternatives/placeholders, status roles, heading hierarchy, and responsive menu state are included.

## 14. Performance

Pages remain route-split. Listing images lazy-load and use stable aspect ratios. The 1.81 MB hero was replaced in the active bundle by an existing 630 KB asset. API requests abort on route/filter changes. No new dependency was added.

## 15. Fabricated data removed

The active V2 path contains no fake ratings/reviews, AI scores/reasons, generated deposits, distance claims, coordinates/maps, availability, badges, booking success, discounts, or duplicated gallery images.

## 16. Remaining legacy frontend debt

Unimported V1 marketplace files still contain enrichment and may be removed after confirming no pending work depends on them. The stabilization pass removed the hardcoded fallback management token without changing private endpoint architecture. Private endpoint inconsistencies remain out of scope.

## 17. Build, lint, and test results

- `npm run build`: passed.
- `npx eslint` on all modified public marketplace source files: passed. Repository-wide `npm run lint` remains blocked by 77 pre-existing errors in legacy public/private files (unused React imports, undefined legacy `apiFetch` references, and effect rules); none are imported by the new public path except protected management pages retained as-is.
- `node --test test/propertyFilters.test.js`: 8 passed, 1 failed. The failing “normalizes property type aliases” test belongs to pre-existing staged user changes in `src/utils/propertyFilters.js`; the redesign does not import that utility.
- No configured `npm test` script exists.

## 18. Backend integration blockers

No backend repository or live schema fixture was available locally. The implementation uses only endpoint/parameter names supplied in the Phase 3 contract. Backend confirmation is still needed for exact enum values (for example furnishing and office type) and the definitive pagination container shape. Phase 4 enquiry/visit APIs do not exist.

## 19. Screens requiring manual review

Review `/`, all four category routes, and a real `/property/{slug}` against a running V2 backend at 375, 430, 768, 1024, 1280, and 1440+ widths. Confirm live enum filters, CORS, image URL forms, pagination metadata, long content, one-image gallery, null availability, and API failure/empty states.

## 20. Recommended next phase

Validate against seeded Phase 3 responses, add contract fixtures/component tests, remove confirmed-dead V1 marketplace files, rotate the formerly exposed credentials, and integrate truthful enquiries/visit scheduling only after Backend Phase 4 ships.

## Stabilization and Visual QA

### Security cleanup

- Removed the hardcoded management authentication fallback from `src/api.js`. Private requests now attach `Authorization` only when a real, non-placeholder `localStorage.token` exists; unauthenticated requests proceed without a fabricated credential and can fail normally with the backend's authorization response.
- Public V2 marketplace calls remain explicitly unauthenticated through `publicApiGet`.
- Removed the hardcoded Google Maps browser key from the unused legacy `MapView`; it now reads the legitimate public browser configuration `VITE_GOOGLE_MAPS_API_KEY` and already has a missing-key state.
- Repository re-scan found no remaining literal token or Google Maps key. The previously exposed management token and Maps key must still be revoked/rotated and their provider usage reviewed; removal from source does not invalidate leaked credentials.

### V2 API contract verification

- Confirmed the frontend route map exactly targets `/api/v2/marketplace/listings/`, `/pg/`, `/apartments/`, `/villas/`, `/office/`, and `/listings/{slug}/`, with encoded slug path segments and no auth header.
- Query values are allowlisted per common/category fields and empty, `null`, and `undefined` values are not sent. Price strings, nullable optional sections, media URLs, category details, and billing cycles are rendered without synthesizing facts.
- URL state, pagination reset, refresh, and back/forward navigation were exercised in the browser. Result totals are now labelled as totals only when pagination metadata supplies `count` or `total`; otherwise the page says “Available places”.
- Live contract verification is blocked: the repository's configured production base URL returned HTTP 404 for the supplied V2 listings endpoint on 31 August 2026. Exact response/pagination shape and enum support therefore still require a reachable Phase 3 backend or fixtures. Existing envelope aliases were not expanded further.

### Fabricated-data recheck

- Active routes `/`, `/pg`, `/apartments`, `/villas`, `/offices`, and `/property/:slug` do not use ratings, reviews, verification, recommendations, AI matching, distances, generated deposits, fake coordinates, random dates, mock listing identities, or unrelated listing photography.
- Unused legacy files remain under `src/pages/Properties.jsx`, `src/components/properties/`, `src/utils/propertyHelpers.js`, and `src/components/ExploreProperties.jsx`. They contain the old fabricated enrichment, debug logging, and Unsplash discovery content, but are not imported by the active route graph (`/properties` redirects to `/pg`). They should be removed in a separately approved legacy cleanup.

### Visual and responsive fixes

- Reduced hero vertical pressure while keeping the full search panel above the fold. At 375, 390, 430, 768, 1024, 1280, 1366, 1440, and 1920px browser checks, search was fully visible and no horizontal overflow was detected.
- Changed the small-screen category selector to a visible 2×2 grid so all four property types are immediately understandable.
- Long listing titles now clamp to two lines while preserving a consistent card body. Card media remains fixed at 4:3 with deterministic neutral fallback and lazy loading.
- Kept the detail pricing panel sticky only on desktop and static on mobile; one-, two-, and three-image layouts remain explicit.

### Accessibility and interaction fixes

- Mobile navigation now exposes `aria-expanded`/`aria-controls`, closes after navigation, closes on Escape, and restores focus to its trigger.
- Mobile filters now use a labelled modal dialog, lock background scrolling, focus the close control, support Escape, restore trigger focus, expose active-filter count, and provide an explicit “Show results” control.
- Added reduced-motion handling and retained visible focus rings, semantic form labels, descriptive image alternatives, landmarks, and heading structure.

### Performance and image findings

- Active public pages remain route-lazy-loaded; listing requests abort when route/filter state changes and listing images lazy-load.
- No new dependency or global state was added. Active targeted lint reports no dead imports, undefined symbols, or console debugging.
- The active hero JPEG is approximately 630 KB and is prioritized as the LCP image. Unused oversized assets remain (`hero-bg.mp4` approximately 13.5 MB and `hero-residence.png` approximately 1.8 MB) but do not enter the active production bundle. Further hero encoding optimization is recommended when an approved visual derivative is available.

### Build, lint, and test result

- `npm run build`: passed. Active output includes the 630 KB hero, approximately 99 KB CSS (17.5 KB gzip), and approximately 252 KB entry JavaScript (80 KB gzip), with marketplace pages split into route chunks.
- Targeted ESLint for all active marketplace/API/navigation files: passed.
- Repository-wide `npm run lint`: failed with 75 pre-existing errors in legacy and private-dashboard files. These include unused React imports, undefined legacy `apiFetch` references, and React hook/purity rules; private dashboards were intentionally not rewritten.
- `node --test test/propertyFilters.test.js`: 8 passed, 1 pre-existing failure in legacy property-type alias normalization. The active V2 marketplace does not import that utility. No `npm test` script is configured.

### Unresolved blockers

- A reachable Phase 3 backend/fixture is required to validate definitive V2 envelopes, pagination metadata, enum values, a true zero-results response, real listing cards, and live detail gallery permutations.
- Backend Phase 4 enquiry/visit APIs remain intentionally unimplemented. The detail CTA routes to the existing contact page and states that no booking or payment occurs online; it never displays fabricated success.
- Previously exposed credentials require external revocation/rotation.

### Pages ready for human visual review

- `/`
- `/pg`
- `/apartments`
- `/villas`
- `/offices`
- `/property/:slug` once a valid published V2 slug is available
