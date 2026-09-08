# Patient frontend adaptation from Gymaf

This supplements [components](../components.md) and [design system](../design-system.md); it does not replace their visual/navigation decisions. Source candidates are pinned in [inventory](inventory.json). No listed screen is already implemented in PhysiX.

## Public versus personal experience

Keep PhysiX's selected public homepage, service imagery, short hero, visible finder and four equal dock items. The signed-in area is a task-focused personal care app, not another landing page and not a settings-only profile. Use the same brand tokens while adapting Gymaf's compact cards, exercise detail patterns, session controls and history layouts.

R1 appointment-only dashboard: welcome, next appointment, preparation details, reschedule/cancel and support. No coach invitation or paid subscription required. Empty state offers Book a visit; it does not imply Charlie has prescribed a plan.

R2 active-care dashboard: today's assigned session first, next appointment nearby, plan summary and genuine activity. Purchased educational programmes occupy their own library section. Show only enabled/owned capabilities; don't fill the screen with unavailable feature tiles.

Internal Account sections can expose My plan, Appointments and History while preserving the approved global dock. Active exercise sessions hide that dock and use clear session/back/finish controls. Any future patient-specific dock is a separate design decision, not an accidental inheritance from Gymaf.

## Component extraction

`src/components/home.tsx`: retain useful today-card/week-summary hierarchy, not hardcoded names, dates, workouts, coach calls, challenges or health-integration prompts. Render explicit props from a small dashboard DTO.

`src/components/workouts.tsx` and `workout-session.tsx`: retain layout and approachable controls. Replace fixed exercise lists, elapsed-percentage assumptions and replacement-exercise branches with clinician-approved session data. The original player is not a reviewed exercise prescription or a complete production video player.

`src/components/primitives.tsx`: reuse useful button/row/sheet ideas after accessibility review. Replace capture-link with Next Link, reference-cropped Photo with approved assets and any needed sheet behavior with a tested semantic dialog. No cropped screenshot is treated as live UI.

`src/features/gymaf/session.tsx`: adapt persisted-attempt and acknowledgement patterns, but don't render every gym metric for every exercise. Show only prescribed relevant fields (repetitions, duration, optional load etc.). Pause, skipped/unrecorded/zero distinctions and visible network status remain important. Do not force a user through pain to maintain a streak.

`program-builder.tsx`: separate drafting, publication and assignment. Require appropriate clinician-authored target/instructions; do not copy its default 10 repetitions/60-second rest as a clinical recommendation. Builder validation and empty-state hints are UI, not medical guidance.

## Styling implementation

Map canvas/surface/ink/accent/radius/navigation values to PhysiX semantic CSS variables. Extract only needed selectors into CSS Modules around owned components. Do not copy all global CSS, serif/font declarations, reset rules or upstream navigation dimensions. Tailwind can own common spacing/layout; don't apply conflicting utility and module declarations to the same property without intention.

Use our 320–430px mobile rules, 44–48px comfortable hit areas, readable 16px body copy and real dock clearance. Public service cards are image-forward; patient session cards are concise and practical. Two-line English hero is a preferred composition, not a reason to reduce font size or break Bulgarian. Avoid needless separator columns, pill clouds and decorative badges.

Use actual approved media, captions and text alternatives. Until available use clearly labelled neutral previews, not another person's identity or unlicensed source screenshots. Sample lesson/exercise imagery is not patient-specific instruction.

## Data and interaction boundaries

Server pages load authorized minimal DTOs; client components receive those and own transient edits. A visual demo can use the same view components with explicit synthetic DTOs at gated preview routes. Never implement a fake login or 'saved to server' notification for demo state.

Network states: pending, acknowledged save, retryable failure, conflict, access changed, expired identity, offline/unsaved. Preserve edits when a background reload happens. Recompute elapsed display from timestamps/state rather than assuming every timer tick runs while the browser is backgrounded. Avoid emitting live-region announcements each second.

Don't silently replace exercises. Expose pause/stop and the approved contact/escalation path; actual clinical instructions are reviewed content. Keep commercial upsells out of an active recovery session.

## Visual proof

M0 screenshots: public Home first viewport and scroll; Services; booking selection; synthetic appointment-only Account; synthetic active-plan Account; session controls; desktop layout. Review 390x844, 320px reflow and 1440px, both language lengths, text enlargement, keyboard, bottom toolbar/keyboard and focused controls. No 'pixel perfect' or mobile-ready claim based solely on the old generated poster.

One adaptation should be implemented and reviewed before copying a page family. Update the source inventory and existing task evidence so another agent does not repeat the port.
