# First local bootstrap — Next.js with pinned Gymaf source

This runbook supersedes the old Svelte scaffold. Run in the owner's local checkout; commands are instructions, not evidence they have already run. Read [AGENTS](../AGENTS.md), [status](status.md), [tasks](tasks.md) and [reuse guide](reuse/gymaf.md).

## 1. Inspect and preserve

Inspect current directory, `git status --short`, branch, origin, recent commits, files, `node --version` and `pnpm --version`. The intended origin is `darkapoparka/physix`. Preserve uncommitted/unrelated work; never reset, clean, force-push or silently stash. If an app already exists, stop scaffolding and reconcile with this handoff.

Fresh clone only when no checkout exists:

```sh
git clone https://github.com/darkapoparka/physix.git
cd physix
```

For an existing clean main checkout use `git pull --ff-only origin main`. For an implementation branch, fetch and deliberately integrate main rather than switching branches over local work. Then initialize the pinned source:

```sh
git submodule update --init --checkout -- vendor/gymaf
node scripts/verify-upstream.mjs --require-checkout
node scripts/check-handoff.mjs
node --test tests/tooling/handoff.test.mjs
```

Inspect submodule status first when it is already populated. No `--remote`, `--force`, or hidden upstream branch change. Detached HEAD is expected. The validator checks its pin/cleanliness and source inventory, not application correctness. Create an implementation branch, e.g. `feat/physix-foundation`, after safely syncing.

## 2. Resolve tooling

Use a supported Node LTS compatible with current Next and hosting (Node 24 baseline). Reuse a compatible local toolchain. Global installs/version changes need owner approval; do not break the user's other projects. Use pnpm for the new root app and commit an exact packageManager pin.

Read current [official sources](research.md) and inspect CLI help/version:

```sh
npx create-next-app@latest --version
npx create-next-app@latest --help
```

Do not copy Gymaf's package.json or lockfile into the root. If the help differs from this runbook, follow current official flags, record the difference and preserve the selected options. No preview/canary packages by default.

## 3. Generate in an unused sibling

Verify `../physix-scaffold` does not exist; otherwise choose another unused sibling. Never run the generator over the documentation or inside vendor.

```sh
npx create-next-app@latest ../physix-scaffold --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm --disable-git --skip-install --no-react-compiler --yes
```

Intent: TypeScript, App Router, src directory, Tailwind, ESLint, pnpm; no nested Git repo, automatic install, optional React Compiler, or imported third-party example. If an option is no longer supported, use the interactive CLI for those choices instead of inventing flags. Inspect generated files before copying.

Merge reviewed app/configuration files into this checkout. Preserve root README/AGENTS, docs/design, scripts, tests/tooling, workflow, .gitmodules and vendor. Merge ignore/editor settings; do not overwrite them. Do not copy node_modules, .git, caches, generated README/AGENTS, package-manager duplicates or starter marketing assets. Set package name `physix`, `private: true` and exact packageManager. Keep the temporary sibling until verified; deleting it is not necessary.

## 4. Enforce the source boundary before first build

TypeScript: explicitly exclude vendor from root include discovery. ESLint/Prettier: ignore vendor, docs reference assets and generated output; preserve our handoff files. Vitest/Playwright: include only PhysiX tests, never upstream tests. Tailwind: limit source discovery to owned src/components instead of scanning vendor. Next: no vendor imports, transpilePackages/workspace links, image paths or output tracing includes. Preserve `.vercelignore` and inspect actual deployment traces later.

Root locale structure is in [architecture](architecture.md). Move generated page/root layout into `[lang]` deliberately, implement `/` redirect via Proxy, validate bg/en and test real document language. No second root shell around public/account/staff. No auth provider is needed to render the M0 public pages.

## 5. Install and establish reproducible checks

Install the root generated dependencies with pnpm, then add only needed packages. Follow official Next Vitest/Playwright setup, not the old Svelte add-ons. The initial test toolchain can use Vitest, React Testing Library, jsdom, Playwright and axe; async server pages use browser/integration tests. Inspect peer requirements and generated configuration.

Normalize these scripts to the installed tools:

| Script | Contract |
|---|---|
| dev | next dev on 127.0.0.1:3000 |
| build | next build |
| start | next start on 127.0.0.1:3000, after a build |
| typecheck | next typegen then tsc --noEmit, if supported by installed Next |
| check | optional alias to typecheck for older generic references, not another pipeline |
| lint | non-mutating ESLint; build is not a lint run |
| format:check / format | explicit Prettier check/write respectively |
| test:unit | Vitest non-watch, excluding tests/tooling and vendor |
| test:e2e | Playwright with explicit app test server and synthetic data |
| test:tooling | node --test tests/tooling/handoff.test.mjs |
| check:handoff | node scripts/check-handoff.mjs |
| test:db | local R1 SQL tests only, when implemented |

```sh
pnpm install
pnpm exec playwright install chromium webkit
pnpm typecheck
pnpm lint
pnpm format:check
pnpm test:unit
pnpm test:tooling
pnpm build
pnpm test:e2e
pnpm dev
```

Run only after implementing the corresponding scripts/configs and meaningful tests. Do not use empty suites as evidence. A separate terminal runs the dev server; don't start production and dev on the same port. On Linux, browser system dependencies may require the official installer and permissions. Keep commands compatible with the actual shell; these separate lines work in PowerShell without Unix environment assignment syntax.

## 6. M0 scope and review gate

Implement M0-00 through M0-06 in [tasks](tasks.md), not the entire release roadmap. Public UI and clearly labelled patient previews run without any .env/cloud credentials. Synthetic player state is not real authentication or persisted care. Capture 390px/1440px screenshots, check 320px and Bulgarian/English, preserve the selected design, and record missing real assets honestly.

Use the Gymaf visual reference and connected behavior as complementary inputs. Do not import the prototype store/capture system or dump its connected catch-all app into a page. See [frontend adaptation](reuse/frontend.md). Update source inventory provenance as components are actually adapted. Stop for the M0 owner review.

## 7. Later backend work, separately authorized

After the review, use the official Supabase CLI as a development dependency and an approved local Docker-compatible runtime:

```sh
pnpm add -D supabase
pnpm exec supabase init
pnpm exec supabase start
```

Do not reinitialize existing configuration. Create PhysiX-owned migrations and a synthetic seed, never run vendor SQL directly. Use isolated local ports/project IDs if Gymaf is also running. Inspect CLI help for reset/tests/type generation. A local reset is destructive and requires a confirmed disposable local database; no remote reset, link or push. Generate types with UTF-8-safe tooling.

The first prompt does not authorize live mail, payments, cloud project creation, Vercel deployment, remote migrations or R2/R3. Once R1 identity is established, the clinician-plan reuse slice has its own explicit scope and does not depend on adding Stripe first.
