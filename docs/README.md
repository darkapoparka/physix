# Documentation map

Baseline: 2026-09-08. This is an executable project plan: each specification owns a subject, tasks refer to those specifications, and implementation evidence is recorded separately.

## Product and experience

| Document | Owns |
| --- | --- |
| [PRD](prd.md) | Purpose, users, outcomes, non-goals and launch definition |
| [Features](features.md) | Release allocation and capability acceptance |
| [Routes](routes.md) | Complete public, patient, booking, staff and system route map |
| [User flows](user-flows.md) | End-to-end interactions and recovery paths |
| [Design system](design-system.md) | Responsive layout, tokens, mobile navigation and accessibility |
| [Components](components.md) | Reusable frontend contracts and state ownership |
| [Content](content.md) | Bulgarian/English copy, SEO, claims and content approval |
| [Design package](design/README.md) | Mockup interpretation, wireframes and image provenance |

## Engineering and operations

| Document | Owns |
| --- | --- |
| [Tech stack](tech-stack.md) | Selected technologies and dependency policy |
| [Architecture](architecture.md) | Application boundaries, structure and environments |
| [Data model](data-model.md) | Tables, invariants, authorization matrix and migrations |
| [Booking](booking.md) | Availability, atomic scheduling and state transitions |
| [Auth and security](auth-security.md) | Authentication, authorization and threat controls |
| [Clinical safety](clinical-safety.md) | Health-data boundaries, human review and AI launch gates |
| [Integrations](integrations.md) | Email, video links, storage, jobs and provider failure behavior |
| [Monetization](monetization.md) | Plans, orders, entitlements and refund behavior |
| [Testing](testing.md) | Quality gates, test scenarios, visual review and CI |
| [Operations](operations.md) | Launch, deployment, backups, incidents and maintenance |

## Working on the project

| Document | Owns |
| --- | --- |
| [Bootstrap](bootstrap.md) | Safe official CLI setup on the local machine |
| [Tasks](tasks.md) | The single ordered implementation backlog |
| [Status](status.md) | Short current handoff and evidence summary |
| [Decisions](decisions.md) | Accepted choices, rationale and change process |
| [Open questions](open-questions.md) | Owner inputs and release blockers |
| [Versions](versions.md) | Actual dependency versions once resolved locally |
| [Handoff prompt](handoff.md) | Copy-paste first-session instructions for Codex |
| [Research](research.md) | Dated official technical and regulatory sources |

## How to avoid drift

Change the owning specification when a requirement changes, then adjust affected tasks. Do not write a second PRD or a parallel `todo.md`. Link the decision record for major changes. Keep old design references clearly labelled historical rather than silently treating every image as equally authoritative.

A design screenshot is not a medical claim, license, price list, content approval, mobile implementation, or completed accessibility audit. Documentation checks do not count as application tests.
