# Resolved toolchain and dependency baseline

**PhysiX application packages: not yet installed.** Do not replace this with guessed version numbers. The local agent resolves a compatible stable set using the official CLI, records actual versions and commits a root lockfile. The older Svelte toolchain is superseded.

| Item | Selection / evidence policy | Resolved |
|---|---|---|
| Node | Supported LTS, Node 24 baseline, match local/CI/host | App pin pending M0-01; handoff CI used 24.20.0 |
| pnpm | Exact packageManager pin | Pending M0-01 |
| create-next-app | Current stable; record exact CLI version and help used | Pending M0-01 |
| Next / React / React DOM | Compatible stable set, not blindly copied from Gymaf | Pending M0-01 |
| TypeScript / Tailwind / PostCSS / ESLint | Official generated compatible setup | Pending M0-01 |
| Prettier / Vitest / React Testing Library / Playwright / axe | Add through current official setup | Pending M0 |
| Zod / optional React widgets / dates | Install as the relevant task needs | Pending |
| Supabase SDK / SSR / CLI | Current supported official Next SSR pattern; review beta API upgrades | Pending R1 |
| Resend / Stripe | Only with approved integration/release | Pending |

## Source and tooling pins

Gymaf repository: `darkapoparka/gymaf`. Source branch inspected: `astra`. Pinned commit: `88cef03ca0b8c00ec3e3c4a5dba09daeb5023506`. Metadata and inventory: [reuse/inventory.json](reuse/inventory.json). The source package lists Next 16.3.4 and React/React DOM 19.2.8; these are observed upstream declarations, not a tested PhysiX installation or a reason to bypass security updates.

The handoff-only workflow pins [actions/checkout v7.0.1](https://github.com/actions/checkout/releases/tag/v7.0.1) to `3d3c42e5aac5ba805825da76410c181273ba90b1` and [actions/setup-node v7.0.0](https://github.com/actions/setup-node/releases/tag/v7.0.0) to `820762786026740c76f36085b0efc47a31fe5020`. Official latest stable releases, tag commit IDs and node24 action runtimes were checked on 2026-09-08. Package-manager caching is off because this job installs no application dependencies.

The first handoff check passed with older v4 action pins but reported their deprecated action-runtime targets; those pins were replaced with the verified releases above. [Status](status.md) records the scoped evidence. This does not upgrade or test a PhysiX application that has not yet been scaffolded.

Capture node/pnpm versions, `pnpm list --depth 0`, actual CLI version, lockfile commit and verification commands during bootstrap. Subsequent sessions use frozen install, not unconditional @latest. A dependency upgrade is a separate reviewed change with build/type/test evidence.
