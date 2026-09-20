# Design research and implementation decisions

Research date: **20 September 2026**. Implementation scope: the existing Gymaf-derived PhysiX Home, not a new clinic template.

## References inspected

**Saved Gymaf/Future Home and library comparison:** `references/fitness-apps-20260920/gymaf-home.webp` and `comparison.webp` were opened alongside a fresh 390px PhysiX capture. Their useful lessons are distinct feature/library/utility roles and consistent app navigation. They are reference-only, not permission to publish their people, branding, account content or operating-system chrome.

**W3C Target Size, SC 2.5.8:** https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html . The basic AA requirement is 24×24 CSS pixels with specified exceptions. PhysiX deliberately chooses 44–48px for Home controls; do not describe that product target as the AA rule.

**W3C Reflow, SC 1.4.10:** https://www.w3.org/WAI/WCAG22/Understanding/reflow.html . Test at 320px and avoid two-dimensional document scrolling. An intentional service rail still needs keyboard/focus behavior and a visible indication of more content.

**W3C Contrast, SC 1.4.3:** https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html . Normal text uses a 4.5:1 minimum; qualifying large text uses 3:1. Test the actual composite over photographs, not only named color pairs.

**DTCG stable Format Module 2025.10:** https://www.designtokens.org/tr/2025.10/format/ . Aliases represent semantic relationships and avoid repeated values. The existing web application can use CSS variables as its executable source. This is not a claim of JSON interchange compliance, and the September 2026 draft is not the implementation authority.

**Apple HIG Tab Bars:** https://developer.apple.com/design/human-interface-guidelines/tab-bars . The English page required JavaScript; the indexed official Chinese version at https://developer.apple.com/cn/design/human-interface-guidelines/tab-bars supplied the navigation-versus-action and stable-visibility guidance. Treat it as an interaction reference, not a claim that the web dock is a native iOS tab bar.

**Next.js CSS:** https://nextjs.org/docs/app/getting-started/css . Also inspected the installed 16.3.4 documentation at `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md` and `12-images.md`. Keep global tokens in the root import, component rules in CSS Modules, intrinsic image dimensions, and a production-build check for CSS ordering.

## Decisions

Retain the selected brand/artwork, codebase, saved data and shared navigation. Consolidate values instead of adding another palette. Project service cards from the catalogue, rather than maintaining a second set of names in JSX. Distinguish a booking link from an information button. Remove filler captions and the decorative care motto. Put an authorized returning patient's programme before public discovery in actual DOM order.

Use a small type/spacing scale and measurable control targets. Do not flatten every surface into the same card, duplicate menu controls, restore fake phone chrome or change navigation after sign-in. Preserve the separation between online appointments and exercise programmes.

These are implementation decisions, not owner visual approval. The local synthetic-data and provisional-media boundaries remain. Actual completed checks must be recorded separately from the plan; see `SESSION.md` and `evidence/home-system-20260920`.
