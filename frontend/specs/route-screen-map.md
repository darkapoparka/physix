# Public route -> screen target map

Locale prefix is `/:lang` for BG/EN. This map follows the corrected IA: service selection lives inside Book and `/services` is not a primary destination.

| Route/state | Screen folder | Notes |
|---|---|---|
| `/:lang` | `01-home` | Public landing and discovery. |
| `/:lang/book` service step | `02-book-service` | Select service inside Book. |
| `/:lang/services/[slug]` or current detail route | `03-service-detail` | Detail may preselect service when entering Book. |
| `/:lang/online` | `04-online` | Human video-care information + Book entry. |
| `/:lang/about` / Charlie route | `05-about-charlie` | Practitioner/about family. |
| `/:lang/first-visit` / FAQ route | `06-first-visit-faq` | Practical first-visit information. |
| Book time step | `07-booking-time` | Focused booking shell; no public dock. |
| Book details step | `08-booking-details` | Contact details + verification substate. |
| Book review step | `09-booking-review` | Authoritative summary before confirmation. |
| Booking success | `10-booking-confirmation` | Only real after persisted appointment. |
| Finder/menu overlays | `11-menu-search` | Hide dock while full-height overlay is active. |
| Loading/empty/error/conflict | `12-system-states` | Reusable truthful status patterns. |
| Public Account action | `13-account-entry` | Handoff to retained `/account`; no Gymaf visual rewrite. |
| `/:lang/services` | `02-book-service` | Redirect/bridge into Book, not a Services dock destination. |

When source routes differ from the visual plan, preserve the product IA and record the exact implementation route in the screen `spec.md`; do not create a second route family just to match a mockup filename.