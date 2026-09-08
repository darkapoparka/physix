# Resolved toolchain and dependency baseline

**PhysiX application packages: not yet installed.** Do not replace this with guessed version numbers. The local agent resolves a compatible stable set using the official CLI, records actual versions and commits a root lockfile. The older Svelte toolchain is superseded.

| Item | Selection / evidence policy | Resolved |
|---|---|---|
| Node | Supported LTS, Node 24 baseline, match local/CI/host | Pending M0-01 |
| pnpm | Exact packageManager pin | Pending M0-01 |
| create-next-app | Current stable; record exact CLI version and help used | Pending M0-01 |
| Next / React / React DOM | Compatible stable set, not blindly copied from Gymaf | Pending M0-01 |
| TypeScript / Tailwind / PostCSS / ESLint | Official generated compatible setup | Pending M0-01 |
| Prettier / Vitest / React Testing Library / Playwright / axe | Add through current official setup | Pending M0 |
| Zod / optional React widgets / dates | Install as the relevant task needs | Pending |
| Supabase SDK / SSR / CLI | Current supported official Next SSR pattern; review beta API upgrades | Pending R1 |
| Resend / Stripe | Only with approved integration/release | Pending |

## Source and tooling pins already selected

Gymaf repository: `darkapoparka/gymaf`. Source branch inspected: `astra`. Pinned commit: `88cef03ca0b8c00ec3e3c4a5dba09daeb5023506`. Metadata and inventory: [reuse/inventory.json](reuse/inventory.json). The source package lists Next 16.3.4 and React/React DOM 19.2.8; these are observed upstream declarations, not a tested PhysiX installation or an instruction to bypass a security update.

The handoff-only GitHub workflow pins checkout to `11d5960a326750d5838078e36cf38b85af677262` and setup-node to `49933ea5288caeca8642d1e84afbd3f7d6820020`, resolved from their official v4 refs during this handoff. These are infrastructure pins, not application version claims.

Capture node/pnpm versions, `pnpm list --depth 0`, actual CLI version, lockfile commit and verification commands during bootstrap. Subsequent sessions use frozen install, not unconditional @latest. A dependency upgrade is a separate reviewed change with build/type/test evidence.
