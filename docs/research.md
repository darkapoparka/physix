# Official source register

Checked for this handoff on **2026-09-08**. These sources support technical choices and identify areas requiring professional review; they do not establish production readiness. Recheck at bootstrap and before regulated features launch. Exact package patches are resolved locally in [versions](versions.md).

## Framework and local tools

- [Svelte CLI: create](https://svelte.dev/docs/cli/sv-create): official minimal TypeScript scaffold and supported flags.
- [Svelte CLI: add](https://svelte.dev/docs/cli/sv-add): official add-ons, package-manager options and current help.
- [SvelteKit form actions](https://svelte.dev/docs/kit/form-actions): progressive enhancement and established server mutation pattern; the page distinguishes experimental remote-form APIs.
- [Tailwind with SvelteKit](https://tailwindcss.com/docs/installation/framework-guides/sveltekit): current Vite-based integration; avoid obsolete configuration snippets.
- [Bits UI getting started](https://www.bits-ui.com/docs/getting-started): composable interaction primitives; not an automatic accessibility certification for our composition.
- [Node release schedule](https://nodejs.org/en/about/previous-releases): use supported LTS compatible with hosting and tools.
- [pnpm installation](https://pnpm.io/installation): verify current installation/runtime requirements and pin the resolved version.
- [SvelteKit Vercel adapter](https://svelte.dev/docs/kit/adapter-vercel): deployment/runtime configuration.
- [OpenAI Codex AGENTS.md guidance](https://developers.openai.com/codex/guides/agents-md): root agent instructions and scoped overrides. This project uses uppercase `AGENTS.md`, not a duplicate lowercase file.

## Data, auth and delivery

- [Supabase SSR client setup for SvelteKit](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=sveltekit): supported cookie/session integration.
- [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security): grants, policies, views and role tests.
- [Supabase local development](https://supabase.com/docs/guides/local-development): CLI and Docker-compatible local runtime.
- [PostgreSQL range types](https://www.postgresql.org/docs/current/rangetypes.html): ranges and exclusion constraints underpin scheduling overlap protection; use the deployed PostgreSQL version's compatible syntax.
- [Resend Node integration](https://resend.com/docs/send-with-nodejs): implementation adapter reference only; vendor processing approval remains separate.
- [Stripe fulfillment](https://docs.stripe.com/checkout/fulfillment): verified fulfillment rather than trusting the browser return.
- [Stripe webhooks](https://docs.stripe.com/webhooks): signature verification and event delivery handling.

## Accessibility

- [W3C WCAG 2.2 target size minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html): minimum criterion and exceptions. The PhysiX design target of roughly 44–48 CSS-pixel hit areas is deliberately more generous, not a misstatement of the AA minimum.
- [W3C focus not obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html): fixed docks, sticky controls and overlays must not obscure focused elements.

## EU/Bulgarian launch context

- [GDPR primary text](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng): assess lawful processing, special-category conditions where applicable, minimization, security and data-subject rights with appropriate advisers. A generic consent checkbox or EU server region alone is not the compliance design.
- [Council: Bulgaria euro introduction](https://www.consilium.europa.eu/en/press/press-releases/2025/07/08/bulgaria-ready-to-use-the-euro-from-1-january-2026-council-takes-final-steps/): euro introduction on 1 January 2026. Use an EUR-first architecture for this planned launch; confirm actual pricing, any applicable display rules and tax treatment rather than reusing older BGN assumptions.
- [European Commission medical-device guidance index](https://health.ec.europa.eu/medical-devices-sector/new-regulations/guidance-mdcg-endorsed-documents-and-other-guidance_en): locate the current software qualification/classification guidance, including MDCG 2019-11 and revisions, when assessing clinical software intended purpose. This handoff does not classify the future AI feature.
- [Commission AI transparency guidance](https://digital-strategy.ec.europa.eu/en/policies/guidelines-ai-transparency-obligations): current disclosure guidance for interactive/generated-content systems. Patient-facing AI must be clearly distinguished from a real clinician.
- [Commission AI regulatory framework](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai): review current implementation dates and obligations for the actual feature; do not rely on an old blanket deadline for all AI categories.

## Design source and limitations

The user selected [Physeo Home-3](https://physeo.wpenginepowered.com/home-3/) as inspiration and approved the PhysiX image direction in this conversation. No template code or licensed template assets are redistributed by this handoff. Generated clinical/person/testimonial imagery is illustrative, not authentic evidence. See [asset provenance](design/asset-manifest.md).

Research is intentionally limited to primary project documentation, standards and official institutions. Business claims about Charlie and the clinic are not verified by these sources. Version/runtime tests, licence review, clinician approval and local legal review are separate launch work.
