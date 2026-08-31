# Marketplace V2 frontend integration

The public marketplace uses `VITE_API_BASE_URL` through `src/api/client.js`. Public requests do not send the legacy management authentication token.

## Endpoints

| Frontend experience | Endpoint |
|---|---|
| Home discovery | `GET /api/v2/marketplace/listings/` |
| PG results | `GET /api/v2/marketplace/pg/` |
| Apartment results | `GET /api/v2/marketplace/apartments/` |
| Villa results | `GET /api/v2/marketplace/villas/` |
| Office results | `GET /api/v2/marketplace/office/` |
| Listing detail | `GET /api/v2/marketplace/listings/{slug}/` |

All endpoints must return `{ "data": ..., "meta": ... }`. List payloads may expose the array directly or under `data.results`, `data.items`, or `data.listings`; pagination metadata is read from top-level `meta` or `data.meta`.

## Field mapping

| UI | V2 field | Null handling |
|---|---|---|
| Link/detail identity | `slug` | A card should not be published without a slug |
| Heading | `title`, then `property.name` | Displays “Untitled property” only as a neutral label |
| Category eyebrow | `category` | Omitted when absent |
| Description | `description` | Section omitted |
| Location | `property.location` (string or `locality` + `city`), with `property.locality/city` compatibility | Omitted |
| Price | `pricing.amount`, `pricing.currency`, `pricing.billing_cycle` | “Price on enquiry” |
| Deposit | `pricing.deposit` | Omitted; never calculated |
| Listing images | primary item in `media`, remaining `media` | Falls through to property media, legitimate legacy image, then neutral placeholder |
| Property media fallback | `property.media` | Neutral placeholder |
| Availability | `availability` (boolean, number, or structured status/quantity) | “Contact for availability” |
| Amenities | `amenities[]` string or `.name` | Section omitted |
| Detail facts | non-null primitive values in `category_details` | Individual entries omitted |
| PG card facts | `offer.capacity`, `category_details.sharing/capacity`, `gender_policy`, `meals` | Individual facts omitted |
| Residential card facts | `category_details.bedrooms/bhk`, `furnishing`, `parking` | Individual facts omitted |
| Office card facts | `offer.capacity`, `category_details.workstations/capacity`, `office_type`, `furnishing/fit_out` | Individual facts omitted |
| Publish date | `published_at` | Currently not rendered |

The adapter formats labels, absolute media URLs, currency, billing cycles, and locations. It does not create ratings, reviews, deposits, distances, coordinates, capacity, availability, badges, or recommendation scores.

## Query parameters

Shared allowlist: `city`, `locality`, `min_price`, `max_price`, `amenities`, `availability`, `sort`, `page`, `page_size`.

Category allowlists:

- PG: `gender_policy`, `capacity`, `meals`, `minimum_stay`
- Apartments: `bedrooms`, `furnishing`, `preferred_tenant`, `parking`
- Villas: `bedrooms`, `furnishing`, `parking`
- Office: `office_type`, `min_area`, `max_area`, `capacity`, `furnishing`, `parking`, `lease_type`

URL parameters are the source of truth. Unknown parameters are removed before requests, and changing a filter resets `page`.

## Phase 4 boundary

There is no enquiry, visit, or booking API in this phase. The detail CTA links to the existing contact page and explicitly states that no booking or payment occurs. Replace this boundary with the Phase 4 integration when its canonical contract is available.
