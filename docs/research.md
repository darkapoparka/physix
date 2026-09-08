# Official source register

Technical sources rechecked for the Next.js/Gymaf handoff on **2026-09-08**. Package versions are resolved locally in [versions](versions.md). Institutional/legal links from the original handoff are retained as review entry points, not legal certification or a new determination of obligations.

## Current framework and tooling

- [Next create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app): official scaffold/options; inspect installed help for exact flags.
- [Next CLI](https://nextjs.org/docs/app/api-reference/cli/next): dev/build/start/type generation; run lint separately.
- [Next route groups](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups): layout organization without changing URLs.
- [Next internationalization](https://nextjs.org/docs/app/guides/internationalization): locale segment, root layout and validated dictionaries.
- [Next authentication](https://nextjs.org/docs/app/guides/authentication): server authorization/data-access boundaries, Actions and Route Handlers.
- [Next Proxy](https://nextjs.org/docs/app/api-reference/file-conventions/proxy): request routing; not the sole private-data authorization layer.
- [Next Vitest guide](https://nextjs.org/docs/app/guides/testing/vitest): appropriate unit/component setup and async Server Component limits.
- [Next Playwright guide](https://nextjs.org/docs/app/guides/testing/playwright): browser testing against the application.
- [Tailwind with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs): current integration; don't paste obsolete setup.
- [Node release schedule](https://nodejs.org/en/about/previous-releases) and [pnpm installation](https://pnpm.io/installation): recheck supported compatible tooling before local install.
- [Git submodules](https://git-scm.com/docs/git-submodule): recorded gitlink commits, initialization/checkout and the distinction from --remote tracking.
- [Codex AGENTS.md](https://developers.openai.com/codex/guides/agents-md): project instructions/scopes; PhysiX root is the implementation authority, vendor is reference.

## Data, identity and delivery

- [Supabase SSR](https://supabase.com/docs/guides/auth/server-side): supported SSR approach and package API-status caveat.
- [Supabase Next client setup](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs): request-scoped clients/cookies and identity validation.
- [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security): grants, policies and privileged-key boundaries.
- [Supabase local development](https://supabase.com/docs/guides/local-development): CLI and isolated local runtime.
- [PostgreSQL range types](https://www.postgresql.org/docs/current/rangetypes.html): overlap constraints; use syntax supported by the deployed version.
- [Resend Node](https://resend.com/docs/send-with-nodejs): candidate provider adapter, subject to processing approval.
- [Stripe fulfillment](https://docs.stripe.com/checkout/fulfillment) and [webhooks](https://docs.stripe.com/webhooks): verified idempotent access, not browser-return trust.

## Inspected upstream evidence

- [Gymaf astra source pin](https://github.com/darkapoparka/gymaf/tree/88cef03ca0b8c00ec3e3c4a5dba09daeb5023506).
- [Gymaf implementation status at that pin](https://github.com/darkapoparka/gymaf/blob/88cef03ca0b8c00ec3e3c4a5dba09daeb5023506/astra/IMPLEMENTATION_STATUS.md): distinguishes delivered code, historical scoped tests and unfinished launch work.
- [Gymaf package declaration](https://github.com/darkapoparka/gymaf/blob/88cef03ca0b8c00ec3e3c4a5dba09daeb5023506/package.json): observed Next/React stack, not a freshly verified PhysiX installation.

Exact reusable source/blob IDs are in [inventory](reuse/inventory.json). No source presence, copied screenshot or upstream test report substitutes for local PhysiX build/browser/provider/permission tests.

## Accessibility and launch review sources

- [W3C target size minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) and [focus not obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html). The project's larger 44–48px target convention is a design goal, not the wording of the AA minimum.
- [GDPR primary text](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng): actual purposes, lawful basis/special-category condition, rights, security, recipients and retention need appropriate advice.
- [Council euro-introduction decision for Bulgaria](https://www.consilium.europa.eu/en/press/press-releases/2025/07/08/bulgaria-ready-to-use-the-euro-from-1-january-2026-council-takes-final-steps/): context for the retained EUR-first architecture; confirm actual pricing/display/tax obligations at launch.
- [Commission medical-device guidance](https://health.ec.europa.eu/medical-devices-sector/new-regulations/guidance-mdcg-endorsed-documents-and-other-guidance_en): locate current software qualification/classification guidance for actual intended use.
- [Commission AI transparency](https://digital-strategy.ec.europa.eu/en/policies/guidelines-ai-transparency-obligations) and [AI framework](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai): later feature-specific review, not blanket medical/AI approval.

## Design and superseded sources

[Physeo Home-3](https://physeo.wpenginepowered.com/home-3/) and the owner's PhysiX mockup establish inspiration only. No theme code/asset licence is implied. Generated identities/ratings/reviews are not facts; [asset provenance](design/asset-manifest.md) owns replacement requirements. Gymaf reference screenshots/fonts also need separate clearance; they are not deployed by this handoff.

The original SvelteKit/CLI/Bits UI decision is preserved in Git history and D01, superseded by D16 after substantial Gymaf reuse was approved. It is not a second active stack. Recheck official primary sources rather than trusting old copied APIs or a previous conversation's bootstrap prompt.
