# Home implementation plan and acceptance

Scope: refine the existing Home and create a maintainable visual foundation. Do not rewrite booking, clinical content, patient storage or the donor project.

## Baseline findings

The initial pass inspected source at 0b673c8df57da341ed397d4019432832c0c3d640, clean main, and a fresh 390px browser capture. The Home module defined a second palette, many unrelated dimensions and 9–12px supporting controls. It duplicated service titles outside catalogue.ts, added marketing filler below every tile, made visit booking a tiny arrow separate from the large information trigger, and used a decorative motto beside the actual care summary. DESIGN, AGENTS and README contained incompatible historical current-state claims.

The saved original Gymaf/Future Home/library comparison was opened, not reconstructed from memory. Keep its clear feature/library/utility hierarchy and shared app shell rather than copying its account data, lavender palette or third-party identity.

## Implementation sequence

1. Establish one CSS token source with semantic aliases; preserve existing care/booking token values. Make the migration scope explicit and add an automated contract check.
2. Derive public service cards from the existing catalogue, centralize booking URL construction, and keep decorative presentation separate from business data.
3. Retain the selected masthead/imagery but improve readable type, spacing and touch targets. Remove filler and expose booking intent directly. Put an assigned programme ahead of discovery in DOM order, not with inaccessible CSS reordering.
4. Replace competing design instructions with DESIGN, TOKENS, HOME and DESIGN_RESEARCH, linked from AGENTS. Archive history rather than pretending each previous redesign was approved.
5. Run source checks and actual browser regressions. Save before/after captures and report anything blocked or not tested.

## Acceptance cases

Guest: one headline, high search, clinic/online actions, service discovery, honest care invitation; no account loading wall or fake progress.

Returning patient: server-owned appointment and programme summary; the programme precedes the service collection. Direct next-session or resume action stays authorized. No private notes, identifiers, check-ins or full account payload on Home. Sign-out in another tab clears the summary.

Discovery: search submits to /book; service links retain service and time step; online mode never resolves to a clinic-only offer. Native browser Back remains meaningful. Candidate service data is still preview-only in production.

Visits: visible booking link and separately labelled details button; keyboard access, sheet focus, Escape and focus return work. No fictional location, map, appointment or video meeting.

Responsive: no document overflow at 320/390/430/768/1440; minimum 44px Home controls, 48px primary actions, 16px inputs; readable 14px supporting labels; growing content at doubled text; local images load; fixed dock does not hide the final actionable content.

## Boundaries

Static interface copy and explicit asset crops are legitimate code. Duplicated business data, fake saved state, arbitrary color variants and screenshot-specific viewport hacks are not. This slice does not claim a complete conversion of the inherited 1,800-line stylesheet, full WCAG certification, physical-device/Safari acceptance, approved clinic photography or production booking.

See SESSION.md and evidence/home-system-20260920 for actual executed status rather than inferring completion from this plan.
