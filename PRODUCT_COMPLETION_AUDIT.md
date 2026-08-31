# Livzz Product Completion Audit

Audit date: 2026-08-31  
Scope: current repository plus read-only comparison with `https://www.livzz.com/`  
Method: full source inventory, route/data-flow review, production route and responsive checks, production DOM/runtime inspection, `npm run build`, `npm run lint`, and the existing property-filter test suite. No implementation or dependency changes were made.

## Executive summary

**Estimated product completion: 45% overall.** The public browsing shell is roughly 65% complete, but the conversion journey is about 25% complete and the authenticated management portal is about 35% complete. The site can build and public pages render, but important user-visible claims are synthesized, lead/booking actions do not create anything, two core dashboard flows reference undefined API helpers, multi-property scoping is incomplete, and production readiness basics (auth handling, SEO, legal links, error boundaries, CI-clean linting) are missing.

This estimate measures launch-ready behavior, not amount of UI code. The repository contains substantial UI coverage, but a working-looking control is not counted as complete if it has no real action or trustworthy data behind it.

### Validation results

- Production build: **passes** (`vite build`).
- Existing automated tests: **9/9 pass**, covering property filter normalization, filtering, sorting, URL parsing, and API-query construction.
- Lint: **fails with 79 findings** (78 errors, 1 warning), including real undefined-symbol faults as well as unused imports and hook-rule findings.
- Production routes checked: `/`, `/properties`, `/property/1`, `/services`, `/about-us`, `/contact`, `/login`, all protected top-level routes, and an unknown route.
- Production responsive check at 375×812: the six public routes tested did not create document-level horizontal overflow. This is a useful baseline, not a complete device/browser accessibility pass.
- Production and repository differ: production is an older build of the same implementation. Local search/filter code removes several production filters and changes filtering behavior; findings below use the repository as the release candidate and production as the behavioral baseline.

## Product and route inventory

| Route/surface | Current implementation | Completion assessment |
|---|---|---|
| `/` | Live property fetch, hero search, featured cards, property categories | Visually complete; search works as navigation/filter seeding, but several listing facts are mocked and some CTAs are inert |
| `/properties` | API-backed list, client-side search/filter/sort, saved items, compare, map, mobile filter drawer, infinite reveal | Substantial UI; data integrity, URL state, conversion actions, current-location behavior, map security, and empty/error behavior are incomplete |
| `/property/:id` | API-backed detail, room plans, amenities, owner panel | Renders; booking is an alert, displayed plan pricing is inconsistent, policies/trust claims are hard-coded |
| `/services` | Static marketing page | Content only; all primary CTAs are inert |
| `/about-us` | Static marketing page | Content only; both persona CTAs are inert and legacy `UULYV` branding remains |
| `/contact` | Demo-lead form | Fake timed success; no submission, persistence, validation feedback, or retry |
| `/login` | Username/password API login | Basic happy path exists; session validity, redirect-back, recovery, logout completeness, and response hardening are missing |
| `/dashboard` | Tenant/room aggregates and recent activity | Core data fetch is broken by an undefined `apiFetch` reference |
| `/rooms` | List/filter/refresh and edit navigation | Read flow exists; add-room page is broken and response-shape/error handling is fragile |
| `/rooms/add` | Room creation form | Broken at runtime by undefined `apiFetch`; likely wrong properties endpoint/shape |
| `/rooms/edit/:id` | Fetch and PATCH rent/bed counts | Partial; lacks load/save errors, validation, and not-found handling |
| `/tenants` | API list, status presentation, add/edit navigation | Read/add partially implemented; edit links point to a nonexistent route |
| `/tenants/add` | Room selection and tenant POST | Partial; weak server-error handling and no robust property scoping |
| `/visitors` | API list and checkout PATCH | Partial; hard-coded/default property context and limited failure/empty handling |
| `/visitors/add` | Room lookup and visitor POST | Partial; defaults to property `1` and uses alerts for failures |
| `/maintenance` | Ticket list/filter and status PATCH | Partial; status update uses an inconsistent `/api/tickets/...` URL and may fail |
| `/maintenance/new` | Staff lookup and ticket POST | Partial; weak validation/error presentation |
| `/payments` | Aggregated tenant/staff analysis | Read-only analysis; not a real payments collection/reconciliation flow |
| `/staff` and `/staff/add` | Staff list, payment-status PATCH, staff POST | Partial; defaults to property `1`, weak errors, no broader lifecycle |
| `/grocery` | Expense list and multipart POST | Partial; always scoped to property `1`; browser alerts replace usable state |
| `/notifications` | List and mark-all-read request | Partial; endpoint semantics and response shapes are assumed; navbar polling is broken |
| Unknown routes | Redirect to `/` | No 404 page or status-preserving not-found experience |

## Findings

### P0 — broken functionality / release blockers

#### P0-01 — Management dashboard cannot load its data

- **Affected:** `/dashboard`, `Dashboard`.
- **Current problem:** `apiFetch` is called but never imported. The `ReferenceError` is caught, so the page misleadingly settles into zero/empty metrics rather than visibly failing. Lint confirms the undefined symbol.
- **Expected behavior:** authenticated users see real tenant/room metrics or a clear retryable error state.
- **Likely files:** `src/pages/Dashboard.jsx`, `src/api.js`.
- **Recommended fix:** import the shared API client, validate both HTTP responses before parsing, normalize response envelopes, and expose a retryable error state rather than showing zero data.
- **Priority:** P0.

#### P0-02 — Add Room route fails immediately

- **Affected:** `/rooms/add`, `AddRoom`.
- **Current problem:** `apiFetch` is referenced in the effect and submit handler but not imported. Entering the route throws from the effect; submission cannot work. The properties lookup also uses the inconsistent `/properties/all` path and assumes an unwrapped array.
- **Expected behavior:** properties load, the user can select one, validation prevents invalid occupancy, and POST success returns to the room list.
- **Likely files:** `src/pages/AddRoom.jsx`, `src/api.js`.
- **Recommended fix:** use the shared client, align the properties endpoint and response contract with `/properties/`, add loading/error/empty states, validate `0 <= occupied_beds <= total_beds`, and show inline submission errors.
- **Priority:** P0.

#### P0-03 — Production credentials are embedded in the client bundle

- **Affected:** every API integration.
- **Current problem:** `src/api.js` contains a hard-coded token fallback; the map component contains a hard-coded Google Maps API key. Both ship to every visitor. The token also makes unauthenticated public requests appear authenticated and can mask authorization defects.
- **Expected behavior:** public endpoints need no secret; protected requests use only the logged-in user's short-lived credential; browser map keys are environment-configured and domain/API restricted.
- **Likely files:** `src/api.js`, `src/components/properties/MapView.jsx`, deployment environment/backend auth configuration.
- **Recommended fix:** revoke/rotate exposed credentials, remove the API-token fallback, configure a restricted browser map key through environment settings, and make the backend enforce endpoint-specific authorization.
- **Priority:** P0.

#### P0-04 — Core marketplace facts are fabricated and presented as verified data

- **Affected:** home cards, `/properties`, property cards, map, recommendations, `/property/:id`.
- **Current problem:** `enrichProperty` deterministically invents ratings, deposits, metro/college distances, verification/certification, instant booking, no-deposit flags, badges, created dates, map positions, AI-match percentages, and recommendation reasons from an ID hash. The home card also hard-codes 42 reviews, 3 beds, and 2 baths. The detail page labels every listing “UULYV Verified” and shows hard-coded policies/zero-brokerage/instant-move-in claims.
- **Expected behavior:** commercial, safety, location, availability, review, and trust claims come from verified backend fields; absent data is omitted or honestly labelled unavailable.
- **Likely files:** `src/utils/propertyHelpers.js`, `src/components/PropertyCard.jsx`, `src/components/properties/PropertyCard.jsx`, `src/components/properties/MapView.jsx`, `src/pages/PropertyDetails.jsx`, backend property schema.
- **Recommended fix:** define a canonical property DTO, remove synthesized claims, add explicit backend fields and provenance, and conditionally render only real values. Use neutral placeholders only for non-factual imagery/layout.
- **Priority:** P0 because false property and trust claims create release, consumer-trust, and potentially legal risk.

### P1 — incomplete core product functionality

#### P1-01 — No real booking, visit, call, or message conversion flow

- **Affected:** listing cards and `/property/:id`.
- **Current problem:** “Book Visit” only opens details; “Confirm Booking” only triggers `alert`; phone and message icon buttons have no handlers. There is no visit slot, enquiry record, confirmation, contact handoff, or booking state.
- **Expected behavior:** CTAs initiate the intended supported conversion (at minimum a persisted enquiry/visit request with confirmation and failure handling).
- **Likely files:** `src/components/properties/PropertyCard.jsx`, `src/components/PropertyCard.jsx`, `src/pages/PropertyDetails.jsx`, API/backend booking or lead endpoint.
- **Recommended fix:** choose one launch conversion contract, implement it end-to-end, and make every CTA label match its actual action.
- **Priority:** P1.

#### P1-02 — Contact/demo form fakes successful submission

- **Affected:** `/contact`.
- **Current problem:** submit discards all entered values and changes to success after 1.5 seconds. No lead is sent or stored.
- **Expected behavior:** validate fields, submit to a real lead destination, prevent duplicates, show honest success/failure, and preserve inputs on failure.
- **Likely files:** `src/pages/Contact.jsx`, API/backend/CRM integration.
- **Recommended fix:** add controlled form state and a real endpoint; use accessible inline errors and retry.
- **Priority:** P1.

#### P1-03 — Marketing CTAs and newsletter are inert

- **Affected:** `/services`, `/about-us`, footer across public pages, home “Contact us” behavior.
- **Current problem:** “Get Started,” “Talk to Sales,” “I am a Tenant,” “I am a Landlord,” newsletter send, social icons, locations, Terms, and Privacy appear interactive but have no destinations/actions. Several footer items are list text rather than links.
- **Expected behavior:** launch CTAs route to the relevant existing funnel; newsletter either submits or is removed; legal pages/links exist.
- **Likely files:** `src/pages/Services.jsx`, `src/pages/About.jsx`, `src/components/Footer.jsx`, `src/pages/Home.jsx`, `src/App.jsx`.
- **Recommended fix:** wire only supported journeys; add Terms and Privacy routes/content before collecting leads or credentials; remove unsupported controls.
- **Priority:** P1 for primary CTAs/legal links; newsletter/social/location items can be P3 if removed for launch.

#### P1-04 — Authentication is presence-only and not a complete session flow

- **Affected:** `/login`, all protected routes, logout.
- **Current problem:** any non-empty `localStorage.token` unlocks protected UI; expiry/invalid tokens are not checked; 401/403 responses do not clear the session or return to login; login can navigate to dashboard even if a successful response contains no token; there is no redirect back to the requested route, recovery, or session bootstrap.
- **Expected behavior:** server-issued token required, session validity enforced, unauthorized responses handled centrally, logout clears all relevant session/context data, and the user returns to their intended route after login.
- **Likely files:** `src/pages/Login.jsx`, `src/components/ProtectedRoute.jsx`, `src/api.js`, `src/components/NavbarInside.jsx`.
- **Recommended fix:** create a minimal auth/session boundary and response interceptor; do not treat token presence as proof of authentication.
- **Priority:** P1 (P0 if the management portal is included in the immediate public release).

#### P1-05 — Multi-property context is missing/inconsistent

- **Affected:** visitors, staff, grocery expenses, maintenance, add forms, dashboard.
- **Current problem:** several flows default to property ID `1`; grocery always requests `property_id=1`; other pages read `currentPropertyId`, but no audited code sets or manages it. Data can be empty, wrong, or submitted to the wrong property.
- **Expected behavior:** authenticated property context comes from the user/account or an explicit property selector and is applied consistently to reads and writes.
- **Likely files:** `src/pages/AddStaff.jsx`, `AddVisitor.jsx`, `Visitors.jsx`, `Staff.jsx`, `GroceryExpenses.jsx`, `Maintenance.jsx`, `Layout.jsx`, auth/backend account model.
- **Recommended fix:** introduce one property-context source with a required selection for multi-property users; remove ID fallbacks.
- **Priority:** P1.

#### P1-06 — Tenant edit links are broken

- **Affected:** `/tenants`.
- **Current problem:** rows navigate to `/tenants/edit/:id`, but no such route/page exists; the catch-all silently sends the user to the homepage.
- **Expected behavior:** edit opens a working tenant edit flow, or the edit affordance is absent until supported.
- **Likely files:** `src/pages/Tenants.jsx`, `src/App.jsx`, new/existing tenant form code.
- **Recommended fix:** implement the route using a reusable tenant form or remove the edit action for launch.
- **Priority:** P1.

#### P1-07 — Maintenance status update likely calls the wrong endpoint

- **Affected:** `/maintenance`.
- **Current problem:** list/create uses `/tickets/`, while status PATCH uses `/api/tickets/:id/`; because the Axios base URL already points at the API host, this inconsistent extra segment is likely a 404.
- **Expected behavior:** status updates persist and roll back/show an error if the server rejects them.
- **Likely files:** `src/pages/Maintenance.jsx`, backend route contract.
- **Recommended fix:** centralize endpoint definitions, use `/tickets/:id/` if confirmed by backend, and test the mutation.
- **Priority:** P1.

#### P1-08 — Property detail selected-plan price uses inconsistent fields

- **Affected:** `/property/:id` room-plan cards and booking panel.
- **Current problem:** room cards display `config.rent`; the selected panel reads `price_per_bed` and then falls back to the property-level price. Selecting a room can therefore show the wrong price. Fallback plans use yet another field shape.
- **Expected behavior:** selected room name, rent, availability, and image come from one normalized room-plan model.
- **Likely files:** `src/pages/PropertyDetails.jsx`, backend `room_configs` serializer.
- **Recommended fix:** normalize the API response once and use canonical fields throughout.
- **Priority:** P1.

#### P1-09 — Search/filter URL state is incomplete and inconsistent

- **Affected:** home search and `/properties`.
- **Current problem:** initial query parameters seed some filters, but subsequent filter/search changes are not serialized back to the URL. Refresh/back/share loses state. Local property type vocabulary differs across home, search, filter parser, API, and production (`Apartment` vs `apartment`, `PG` vs `townhouse`, `Co-living`/`Coliving`, and the unsupported category query `type=room`). `buildPropertyApiQuery` exists and is tested but is unused by the page.
- **Expected behavior:** canonical filter vocabulary, shareable URLs, back/forward restoration, and backend-supported server queries where appropriate.
- **Likely files:** `src/pages/Home.jsx`, `src/pages/Properties.jsx`, `src/utils/propertyFilters.js`, `src/utils/propertyHelpers.js`, `src/components/ExploreProperties.jsx`, `SearchBar.jsx`, `FilterSidebar.jsx`.
- **Recommended fix:** define one property/filter schema and make URL params the page's durable state; remove unsupported category links.
- **Priority:** P1.

#### P1-10 — “Use current location” is not geolocation search

- **Affected:** `/properties` search dropdown.
- **Current problem:** selecting it sets the literal string `Current Location`, which normally filters every property out. The map separately requests geolocation, but the search control does not use coordinates.
- **Expected behavior:** request permission at interaction time, search/sort using coordinates, or remove/rename the option.
- **Likely files:** `src/components/properties/SearchBar.jsx`, `src/pages/Properties.jsx`, backend geo search.
- **Recommended fix:** implement a supported coordinate contract or remove the control for launch.
- **Priority:** P1.

#### P1-11 — Payment area is analysis, not a payment product

- **Affected:** `/payments` and claims of “Secure Payments.”
- **Current problem:** the page derives totals from tenant/staff records but has no collection, ledger, transaction detail, reconciliation, receipt, retry, or gateway workflow.
- **Expected behavior:** either a clearly labelled read-only rent overview based on authoritative payment records, or an end-to-end supported payment flow.
- **Likely files:** `src/pages/Payments.jsx`, `src/pages/Services.jsx`, backend payments model/integration.
- **Recommended fix:** narrow launch copy to actual capability and defer a real gateway unless it is a committed launch requirement.
- **Priority:** P1 for copy/data truth; full gateway is P4 unless already required.

#### P1-12 — API handling lacks a consistent response/error contract

- **Affected:** nearly every API-backed page/form.
- **Current problem:** pages variously expect raw arrays, `{results}`, or `{data}`; some parse unsuccessful responses; Axios and Fetch are mixed; errors are often only logged or shown with `alert`; no global timeout/401 strategy exists. `Rooms` directly calls `.filter` on whatever JSON is returned.
- **Expected behavior:** one client normalizes envelopes and typed failure states; pages implement loading, error, retry, and empty behavior without crashing or showing false zeros.
- **Likely files:** `src/api.js`, all API-backed pages.
- **Recommended fix:** establish a small API adapter layer and migrate core routes first; do not replace the overall React architecture.
- **Priority:** P1.

#### P1-13 — Notifications navbar polling is broken

- **Affected:** all protected routes, `NavbarInside`.
- **Current problem:** `apiFetch` is undefined. The error is caught every 20 seconds, causing console noise and a permanently incorrect unread badge. It also assumes a raw array response.
- **Expected behavior:** unread count loads reliably or the badge is omitted; polling pauses when not needed and handles auth failures.
- **Likely files:** `src/components/NavbarInside.jsx`, `src/pages/Notifications.jsx`, `src/api.js`.
- **Recommended fix:** use the shared client and a normalized response; consider fetching on navigation plus a conservative interval only after correctness.
- **Priority:** P1.

### P2 — UX/UI issues materially affecting usability or conversion

#### P2-01 — Error states leak developer instructions and lack direct recovery

- **Affected:** `/properties` and several management pages.
- **Current problem:** the public error tells users to inspect the browser console; it has no retry button. Many management pages log only, remain empty/spinning, or use blocking browser alerts.
- **Expected behavior:** plain-language, accessible, retryable errors with preserved form data.
- **Likely files:** `src/pages/Properties.jsx` and API-backed pages/forms.
- **Recommended fix:** shared inline error/empty/loading primitives and route-specific recovery actions.
- **Priority:** P2.

#### P2-02 — Global lazy-loading fallback is a blank page

- **Affected:** every route transition.
- **Current problem:** Suspense renders an empty neutral screen with no brand, progress, or accessible status.
- **Expected behavior:** lightweight branded route loader or stable shell skeleton.
- **Likely files:** `src/App.jsx`.
- **Recommended fix:** use one accessible loading shell; avoid layout shifts.
- **Priority:** P2.

#### P2-03 — Mobile management navigation is inaccessible

- **Affected:** all protected routes below the `lg` breakpoint.
- **Current problem:** `Sidebar` receives neither `isOpen` nor `toggleMenu`; it defaults to translated off-screen on mobile and no hamburger exists in `NavbarInside`. Calling the missing callback would also fail if the close button were reachable.
- **Expected behavior:** authenticated users can open/close and navigate the management menu on phone/tablet.
- **Likely files:** `src/components/Layout.jsx`, `Sidebar.jsx`, `NavbarInside.jsx`.
- **Recommended fix:** own sidebar state in `Layout`, add a labelled navbar trigger, focus management, Escape/overlay close, and current-page title.
- **Priority:** P2.

#### P2-04 — Filters conflict and can silently over-constrain results

- **Affected:** `/properties`.
- **Current problem:** top-bar and sidebar budgets are combined by taking the stricter intersection; reset restores non-empty defaults rather than “any”; top-level type/gender are merged with sidebar values, creating hidden duplicate state. Search appears to require a button even though filtering is already computed live.
- **Expected behavior:** one visible source of truth per criterion, clear active-filter summary/count, consistent reset, and invalid budget-range validation.
- **Likely files:** `src/pages/Properties.jsx`, `SearchBar.jsx`, `FilterSidebar.jsx`.
- **Recommended fix:** consolidate duplicated criteria and make filter application semantics explicit without redesigning the page.
- **Priority:** P2.

#### P2-05 — No-result recommendations are wired incorrectly

- **Affected:** `/properties`, `EmptyState`.
- **Current problem:** the caller passes recommendations/save/compare props, but the current `EmptyState` component accepts only `onClear`; the caller does not pass `onClear`. The user therefore gets no working clear-filters action or intended recommendations.
- **Expected behavior:** explain which filters produced zero results and provide a working reset plus honest alternatives.
- **Likely files:** `src/pages/Properties.jsx`, `src/components/properties/EmptyState.jsx`.
- **Recommended fix:** align the component contract and test the zero-result path.
- **Priority:** P2.

#### P2-06 — Compare and saved-list experiences are incomplete

- **Affected:** marketplace navbar, cards, compare drawer.
- **Current problem:** saved IDs persist locally but there is no saved-properties page/list; the navbar count polls localStorage every two seconds; compare is session-only, silently refuses a fifth item, and offers no clear limit feedback or durable/shareable comparison.
- **Expected behavior:** either complete the minimal local experience with clear feedback and a destination, or hide unsupported affordances at launch.
- **Likely files:** `src/components/Navbar.jsx`, `src/pages/Properties.jsx`, `CompareDrawer.jsx`, `propertyHelpers.js`.
- **Recommended fix:** for launch, add explicit feedback and a usable saved view, or postpone/remove both controls.
- **Priority:** P2 if retained; otherwise P4.

#### P2-07 — Property card address and image behavior is fragile

- **Affected:** home/property cards and detail.
- **Current problem:** marketplace cards render `city, state`, producing awkward blanks when the API provides only `location_name/address`; image arrays repeat the same image three times; external Unsplash fallback adds dependency/privacy/performance variance.
- **Expected behavior:** one normalized location string and real image gallery, with a local neutral fallback and broken-image handling.
- **Likely files:** `src/utils/propertyHelpers.js`, both `PropertyCard` components, `ImageCarousel.jsx`, `PropertyDetails.jsx`.
- **Recommended fix:** normalize display fields and suppress carousel controls when only one unique image exists.
- **Priority:** P2.

#### P2-08 — Property detail error page loses global navigation and retry

- **Affected:** `/property/:id` loading/error/not-found.
- **Current problem:** error state removes navbar/footer and only offers history-back; a direct link has no reliable destination and no retry. HTTP 404 and network failure are presented similarly.
- **Expected behavior:** retain the public shell, distinguish not-found from temporary error, offer retry and back-to-properties.
- **Likely files:** `src/pages/PropertyDetails.jsx`.
- **Recommended fix:** add route-level state variants within the normal layout.
- **Priority:** P2.

#### P2-09 — Forms lack consistent validation, pending state, and accessible errors

- **Affected:** add/edit tenant, room, visitor, staff, ticket, expense; login/contact.
- **Current problem:** validation is mostly HTML `required`; server failures use alerts or console logs; some submit buttons do not disable; date/phone/email/numeric relationships are not consistently validated; duplicate submissions are possible.
- **Expected behavior:** field-level validation, pending/disabled state, server-error mapping, success confirmation, and focus management.
- **Likely files:** all form pages.
- **Recommended fix:** adopt a small shared form-state pattern using existing dependencies/code only; prioritize the launch-critical forms.
- **Priority:** P2.

#### P2-10 — Unknown routes silently redirect home

- **Affected:** invalid URLs and broken internal links.
- **Current problem:** the catch-all hides mistakes (including the broken tenant-edit link) and disorients users.
- **Expected behavior:** a 404 page with useful navigation; protected invalid routes should remain in the management shell when appropriate.
- **Likely files:** `src/App.jsx`, new minimal not-found component.
- **Recommended fix:** add public/protected not-found routes and log broken route discovery in tests.
- **Priority:** P2.

#### P2-11 — Accessibility basics are incomplete

- **Affected:** navigation, icon buttons, card controls, filter drawers, forms, carousel/map/compare overlays.
- **Current problem:** many icon-only buttons rely on title or have no accessible name; menu/dialog/drawer semantics, focus trapping/restoration, keyboard escape, live status announcements, and error associations are absent. Clickable cards use generic containers. Images sometimes have empty alt even when meaningful.
- **Expected behavior:** keyboard-operable, labelled controls and dialogs; visible focus; semantic links/buttons; announced loading/errors.
- **Likely files:** shared navigation, property components, all forms.
- **Recommended fix:** perform a focused keyboard/screen-reader pass during core-flow stabilization.
- **Priority:** P2.

#### P2-12 — Responsive verification is incomplete beyond public smoke checks

- **Affected:** all routes, especially protected tables/forms and the property map/filter overlays.
- **Current problem:** public production routes avoid horizontal document overflow at 375px, but no automated responsive tests exist; management mobile navigation is broken, tables rely on horizontal scrolling, and fixed/sticky overlays have not been tested across viewport heights.
- **Expected behavior:** core flows work at phone, tablet, laptop, and desktop breakpoints with no trapped or covered controls.
- **Likely files:** layout/navigation, properties/map/drawer, management tables/forms, test setup.
- **Recommended fix:** add a small breakpoint matrix to release QA after P0/P1 fixes.
- **Priority:** P2.

### P3 — visual polish / enhancements

#### P3-01 — Branding and copy are inconsistent

- **Affected:** global product copy.
- **Current problem:** `LivZZ`, `LIVZZ`, `livzz.`, SmartPG, and legacy `UULYV` appear across routes; About says UULYV while the detail badge says UULYV Verified; contact copy makes unverified privacy/automation claims.
- **Expected behavior:** one approved name, tone, capitalization, and substantiated claim set.
- **Likely files:** all marketing pages/components, metadata.
- **Recommended fix:** content pass after factual product behavior is settled.
- **Priority:** P3, except unsupported claims which are P0/P1.

#### P3-02 — Visual system is fragmented

- **Affected:** public marketing, marketplace, and management portal.
- **Current problem:** the three areas use substantially different colors, radii, typography, and component patterns. This is not itself a launch blocker, but it reduces product coherence.
- **Expected behavior:** reuse existing tokens and a small set of primitives without a wholesale redesign.
- **Likely files:** `src/index.css`, page/component class names.
- **Recommended fix:** defer broad redesign; during fixes, normalize only shared states/buttons/forms that reduce inconsistency.
- **Priority:** P3.

#### P3-03 — Asset/performance cleanup is needed

- **Affected:** homepage and marketplace initial experience.
- **Current problem:** `hero-residence.png` is about 1.8 MB; Google Fonts are render/network dependent; the properties chunk is about 200 KB minified and the footer chunk about 138 KB; several remote images are loaded from Unsplash. There is no explicit image width/height, responsive source strategy, or preload policy.
- **Expected behavior:** optimized responsive images, stable dimensions, and measured loading performance.
- **Likely files:** `src/assets`, `Home.jsx`, cards, `index.css`, build configuration.
- **Recommended fix:** compress/resize current assets and lazy-load below-the-fold media after functional completion.
- **Priority:** P3.

#### P3-04 — Debug/dead code remains in the release candidate

- **Affected:** build quality and maintainability.
- **Current problem:** `propertyHelpers.js` contains a full commented-out prior implementation; `MapView` and `Properties` contain extensive debug logging; `Travelchatbot` is a large unused travel-specific component; unused default React/icon imports are widespread; `ExploreProperties` is imported but unused in `App.jsx`; starter assets remain.
- **Expected behavior:** release code has no obsolete duplicate implementation or noisy debug output.
- **Likely files:** `src/utils/propertyHelpers.js`, `MapView.jsx`, `Properties.jsx`, `Travelchatbot.jsx`, `App.jsx`, unused assets.
- **Recommended fix:** remove only confirmed dead code after core behavior is covered by tests.
- **Priority:** P3.

#### P3-05 — Lint/quality gate is red

- **Affected:** entire repository/CI readiness.
- **Current problem:** lint reports 79 findings. Some are style/unused-import noise; others identify true runtime failures and effect/purity issues. There is no test script in `package.json` despite an existing test file.
- **Expected behavior:** build, lint, and tests are first-class passing release checks.
- **Likely files:** broad source set, `eslint.config.js`, `package.json`.
- **Recommended fix:** fix functional lint failures with P0/P1 work, then clear remaining findings and add `test`/`check` scripts. Do not weaken rules merely to turn the gate green.
- **Priority:** P3 overall; undefined references are separately P0/P1.

### P4 — future features that should not delay launch

#### P4-01 — “AI Match” and advanced recommendation engine

- **Affected:** property cards/recommendation rail.
- **Current problem:** current scores are hash-generated, not AI or personalized.
- **Expected launch posture:** remove the AI label/scores or use a transparent deterministic sort based on real fields. A real preference model can follow later.
- **Likely files:** `propertyHelpers.js`, `PropertyCard.jsx`, `AIRecommendation.jsx`.
- **Recommended fix:** postpone model-driven recommendations until trustworthy user/preferences data exists.
- **Priority:** P4 feature; deceptive current presentation is P0.

#### P4-02 — Full saved-property account sync and shareable comparison

- **Affected:** marketplace.
- **Current problem:** local-only partial implementations exist.
- **Expected launch posture:** a simple local saved list is sufficient, or hide it; account sync, notifications, and shareable comparisons should not block launch.
- **Likely files:** marketplace components/backend user profile.
- **Recommended fix:** postpone advanced persistence/sharing.
- **Priority:** P4.

#### P4-03 — Advanced interactive map/geospatial search

- **Affected:** `/properties` map.
- **Current problem:** coordinates/markers/distances are not based on canonical listing geography.
- **Expected launch posture:** list-first search can launch without a map if real coordinates are unavailable.
- **Likely files:** `MapView.jsx`, property schema/backend geocoding.
- **Recommended fix:** hide the map until real coordinates exist; postpone radius/polygon/transit features.
- **Priority:** P4.

#### P4-04 — Travel chatbot

- **Affected:** unused `Travelchatbot` component.
- **Current problem:** it is unrelated to the core Livzz property journey and is commented out.
- **Expected launch posture:** do not revive it during completion work.
- **Likely files:** `src/components/Travelchatbot.jsx`.
- **Recommended fix:** postpone or remove after confirming it has no roadmap owner.
- **Priority:** P4.

#### P4-05 — Full payment gateway, automation suite, and owner analytics expansion

- **Affected:** management roadmap and services copy.
- **Current problem:** marketing implies capabilities beyond the audited implementation.
- **Expected launch posture:** ship a truthful management MVP; postpone gateway, WhatsApp automation, yield algorithms, insurance/audits, advanced exports, and predictive analytics unless contractually required.
- **Likely files:** marketing copy and future backend/integrations.
- **Recommended fix:** narrow claims now; sequence integrations after core CRUD/data integrity.
- **Priority:** P4.

## SEO and discoverability assessment

The app currently has only `<title>LIVZZ</title>`, charset, viewport, and favicon in `index.html`. All production routes inspected share the same title. There are no route descriptions, canonical URLs, Open Graph/Twitter metadata, structured data, robots directive/file, sitemap, or route-specific social preview. As a client-rendered SPA, source HTML contains no route content until JavaScript executes; this may limit reliable indexing and link previews.

This is **P1 for a public marketplace launch** (unique title/description/canonical, robots/sitemap, and correct indexability) and **P3/P4** for richer structured data and SSR/prerender architecture. Do not replace the application architecture solely for SEO before measuring indexing needs; first implement route metadata and static crawl assets within the current stack, then evaluate prerender/SSR separately.

Likely files: `index.html`, `src/App.jsx`, public route pages, `public/robots.txt`, `public/sitemap.xml`, deployment configuration.

## Recommended implementation sequence

### Phase 0 — Confirm launch boundary and data truth

1. Decide whether launch includes only the public marketplace or also the management portal.
2. Freeze the canonical property/room/user API contracts and approved product claims.
3. Rotate exposed credentials and remove hard-coded token/key fallbacks.
4. Mark every synthesized trust/commercial field for removal or backend replacement.

**Exit criterion:** the team knows exactly which routes are launch scope and which data fields are authoritative.

### Phase 1 — Remove release blockers

1. Fix undefined API-client references in Dashboard, Add Room, and NavbarInside.
2. Standardize critical API response/error/auth behavior without replacing the existing React architecture.
3. Replace fabricated listing facts with real fields or honest omissions.
4. Make the chosen primary conversion (enquiry or visit request) persist end-to-end.
5. Make the contact form submit for real.

**Exit criterion:** no known P0; public browse → detail → conversion works against production APIs; scoped management dashboard/add-room work if included.

### Phase 2 — Complete core product flows

1. Complete auth/session/401 handling and property context.
2. Repair tenant edit and maintenance mutations.
3. Normalize property detail room-plan pricing/availability.
4. Consolidate search/filter state, canonical vocabulary, URL sync, and valid no-result behavior.
5. Wire/remove all primary marketing and legal actions.

**Exit criterion:** every retained P1 control has a real, testable result and correct data ownership.

### Phase 3 — Usability, responsive, accessibility, and state quality

1. Add reusable loading/error/empty/form states with retry.
2. Fix mobile management navigation and overlay focus behavior.
3. Validate critical flows at phone/tablet/desktop breakpoints and keyboard-only.
4. Add a real 404 and maintain public/protected shells through errors.

**Exit criterion:** core flows are understandable and recoverable under slow, empty, invalid, unauthorized, and mobile conditions.

### Phase 4 — Release quality and SEO

1. Add route-specific metadata, canonical URLs, robots/sitemap, and social preview basics.
2. Make lint/tests/build pass as one release command; expand tests around conversion, auth guards, filter URL state, and core mutations.
3. Remove confirmed debug/dead code and optimize the hero/property images.
4. Run a final broken-link, API contract, console-error, responsive, accessibility, and production smoke pass.

**Exit criterion:** green release checks, no broken links or unexpected console errors, and public pages are indexable with accurate metadata.

### Phase 5 — Explicitly postponed

- Real AI/personalized matching.
- Advanced maps/geospatial/transit search.
- Saved-property account sync and shareable comparisons.
- Travel chatbot.
- Full payment gateway/reconciliation if not contractually required for launch.
- WhatsApp automation, predictive yield optimization, insurance/audit integrations, advanced analytics/exports.
- Broad visual redesign or architecture migration.

## Release recommendation

Do **not** launch the current repository as a completed transactional marketplace or management product. It is suitable as a visual beta/demo only if all fake-success actions and unverified claims are clearly disabled or labelled. A scoped public marketplace launch becomes realistic after P0 removal and completion of one honest browse-to-enquiry path; the management portal should be released separately only after its auth, property scoping, dashboard/add-room faults, and core CRUD mutations are verified.
