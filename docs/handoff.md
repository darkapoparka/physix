# Current local-agent handoff — public website only

Open the PhysiX root. The owner wants the public site, not Gymaf or logged-in screens. Keep the existing Next.js stack; do not re-litigate the framework or initiate private-app work.

## Local build prompt

```text
Work in darkapoparka/physix and implement ONLY the public PhysiX website.

Inspect origin, branch, Git status and existing code. Safely fetch/pull the current
handoff without resetting, force-pushing or overwriting unrelated changes.
Read AGENTS.md, docs/status.md, docs/tasks.md, docs/architecture.md,
docs/bootstrap.md, docs/design/public-v2/README.md, SCREEN-SPEC.md,
INTERACTIONS.md, ASSETS.md and the committed screen gallery.

Use docs/design/public-v2/index.html as a clickable visual reference, not as
production architecture. The source, assets and PNG screens are in GitHub;
there is no ZIP import step. Inspect both mobile viewport and full-page exports.
The full-page files hide fixed bars for readability; viewport files show them.

Keep Next.js App Router + React + TypeScript, the existing dependency discipline
and official safe bootstrap instructions. If no app exists, scaffold in a temporary
sibling and merge deliberately without overwriting docs, tools or existing work.
Do not initialize or adapt Gymaf merely to build the public website.

Build the shared header, compact Home/Book/Online/Account dock, focused booking
shell, image-led service cards, service finder, forms, disclosures and footer.
Then implement public home, service list/detail, Charlie, clinic, online, FAQ,
contact, legal/preferences, search and public booking states. Account ends at
public sign-in/verification. Programme/checkout layouts are release-gated future
previews, not permission to build payments now.

Preserve the corrected visual rhythm: editorial mint Charlie section followed
by a full-width deep-teal patient-story area, NOT another white testimonial card.
No vertical separator columns, fake stars, invented credentials or patient claims.
Do not substitute generic icons for the final service artwork. Reference crops
are not production-resolution assets or Charlie's real identity.

Keep all demo flows explicitly synthetic and disabled in live mode. No real
emails, authentication, bookings, payment, medical advice or remote writes.
Do not copy the prototype hash router, HTML-string renderer or six-digit-code
simulation into the real app. Use actual components and the existing server/
security architecture for future integrations.

Test 390px and 1440px visuals, 320px reflow, keyboard/focus/error behavior and
real approved Bulgarian strings. Keep text readable. Use relevant lint/type/build/
unit/browser checks and record actual results; prototype checks do not prove the
Next.js implementation. Preserve unknown business facts as content gaps rather
than inventing them.

Update the existing tasks/status, report implemented public screens and evidence,
and stop at the public UI review gate. No logged-in dashboard, player, staff UI,
backend provisioning, payment setup or deployment.
```

## Later work

Patient, staff and backend specifications remain in the repository for a future explicitly authorized phase. Do not execute the earlier Gymaf-first or patient-preview prompt from conversation history for this public task.

## Continuing a session

Read current status and actual code first. Reuse existing public components before creating new ones. Work on the next uncompleted public task; do not create another competing PRD or checklist. Finish with files changed, evidence, unresolved content/assets and the exact next task.
