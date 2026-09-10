# Public UI component inventory

Build these as shared visual primitives before route-by-route polish. Names are conceptual and may map onto existing source components after inspection.

| Component | Shared responsibility |
|---|---|
| PublicHeader | Logo, back/menu controls, locale entry and consistent mobile height. |
| PublicDock | Home / Book / Online / Account geometry, active state and safe-area spacing. |
| Finder | Search icon, 16px field text, submit/clear action and no-result recovery. |
| ActionButton | Filled and outlined actions with one icon/label/arrow alignment model. |
| IssueRail / IssueTile | Anatomical art, label, rail scroll hint and expanded state. |
| ServiceCard | Image crop, title, support copy, circular arrow and whole-card target. |
| CharlieCard | Compact practitioner introduction with deep-teal surface. |
| FeatureRow | Small icon + title + supporting text for service/online explanations. |
| InfoCard | Mint/white grouped practical information surface. |
| FaqList | Native accessible disclosure rows with one shared geometry. |
| BookingStepper | Time / Details / Review progress state. |
| BookingActionBar | Focused bottom action without the public dock underneath. |
| StatusPanel | Unavailable/conflict/network/empty states with truthful recovery action. |

## Rule

A new route should compose these primitives first. Add a new component only when the target has a genuinely different semantic or geometric role; do not fork a component to compensate for route-specific CSS drift.