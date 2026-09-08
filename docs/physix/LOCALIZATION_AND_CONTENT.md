# Bulgarian/English and clinic content

## Locale contract

Both languages are release requirements across the website, booking, account and staff workflows. Use explicit dictionaries/typed keys and locale-aware formatting, never runtime DOM replacement or a blanket translation of stored user text. Proposed route locale is authoritative, with a preference cookie used for the initial redirect only. Reject unsupported locales gracefully. Language switching preserves the equivalent route, selected service/date and unsaved form state where safe; it must not reset a booking or leak private information into the URL.

Store stable IDs and raw values. Format dates/times/numbers/currency/units with the active UI locale and explicit domain timezone. Appointment time is the clinic's declared timezone, even when a visitor's device differs; label any alternate display clearly. Week/day labels are translated, not database IDs. Test Bulgarian plural forms and long labels rather than concatenating English fragments.

## Translation coverage checklist

- Navigation, metadata, headings, descriptions, buttons, labels, helper text and empty states.
- Validation/API error presentation, conflicts, loading/submitting/success, retry and unavailable states.
- Booking date/time, policy summary, eligibility, payment/refund state, staff statuses and notifications.
- Plans, session controls, feedback labels and progress explanations. Therapist-authored instructions are not automatically translated; support separate approved authored language variants or label the original language.
- Account invitation, sign-in/code/link/MFA/recovery and safe session expiry.
- Email/SMS templates when selected, calendar export labels, downloadable/export headings and privacy notices.
- Screen-reader names, alt text, focus announcements and dialog content.
- Public search metadata/canonical/hreflang for approved locale routes; public publishing requires verified domain/content. Private pages remain non-indexable.

No source English fallback is acceptable in a finished BG primary journey. Missing translations fail a key-parity check or are visible as an implementation defect; do not hide them with an untranslated fallback and mark PX-031 DONE. User names/messages and proper nouns are exempt from forced translation.

## Content inventory to obtain

| Content | Owner needed | Publication condition |
|---|---|---|
| Display/legal business name, address, directions, contacts, opening hours/date | Clinic owner | Confirmed facts; no invented location or availability |
| Service list, eligibility, durations, preparation, pricing and cancellation policy | Clinic owner / clinical lead | Approved policy and BG/EN copy |
| Therapist names, biographies, credentials, photos and service eligibility | Clinic owner / named therapist | Approval and permission to publish |
| Logo, colors, photos, illustration, instructional video, fonts | Brand/content owner | Rights, source and approved usage recorded |
| Intake/questions, progress measures and instructions | Clinical lead | Clinically reviewed scope; no generated treatment claims |
| Community guidelines, events, moderation and image permissions | Community owner | Visibility/consent policy resolved |
| Privacy/terms/cancellation/refund/accessibility/contact notices | Responsible clinic reviewer | Applicable to actual configured workflows and both languages |

Track missing content outside shipped UI. While building locally, synthetic content must be visibly identified as a development fixture and excluded from public production output. Do not invent testimonials, reviews, outcome statistics, credentials or staff. Do not publish stock/reference photos as images of the actual clinic.

## Visual consistency

The original fonts/imagery remain reference assets, not approved Physix assets. Preserve typography roles and measured geometry when selecting licensed fonts with Bulgarian Cyrillic support. Record intentional visual changes and compare the same account states at equal widths. Do not change the whole visual direction to avoid translating longer text.

Owner decisions: D-021, D-022, D-025, D-028. Implementation: PX-005, PX-009, PX-010/PX-011, PX-031; final content approval PX-039.
