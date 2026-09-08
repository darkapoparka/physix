# Resolved toolchain and dependency baseline

Status: **not yet installed**. Do not fill this file with guessed patch numbers. The local bootstrap agent records actual installed versions and the date after checking compatibility.

| Item | Selected policy | Resolved version / evidence |
|---|---|---|
| Node | Supported LTS; Node 24 handoff baseline; match hosting/CI | Pending M0-01 |
| pnpm | Current compatible stable, exact `packageManager` pin | Pending M0-01 |
| sv CLI | Current stable at initial scaffold; record version used | Pending M0-01 |
| Svelte / SvelteKit / Vite | Official scaffold's compatible stable set | Pending M0-01 |
| TypeScript / Tailwind | Compatible stable generated setup | Pending M0-01 |
| ESLint / Prettier / Vitest / Playwright | Official add-on setup | Pending M0-01 |
| Bits UI / Zod / date library | Add only as relevant tasks need them | Pending |
| Supabase SDK / SSR / CLI | Current supported integration in R1 | Pending R1 |
| Vercel adapter / Node runtime | Explicit supported deployment target | Pending deployment work |
| Resend / Stripe | Only when corresponding approved integration begins | Pending |

Capture `node --version`, `pnpm --version`, top-level dependency inventory and relevant CLI version/help output. Record any deliberate override and its reason in [decisions](decisions.md). Commit a single `pnpm-lock.yaml`; normal subsequent sessions use frozen install. Do not run `@latest` upgrades merely because a new coding session starts.

A dependency update is a dedicated change with type/build/test evidence. Security updates may justify a prompt upgrade but still require verification. Library APIs in old examples are not authoritative; use official current documentation or Context7 pointing to the primary project documentation.
