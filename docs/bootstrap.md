# First local bootstrap: official CLIs, no lost docs

Run locally through Codex. This repository initially contains documentation/design assets, not a generated application. Read [AGENTS](../AGENTS.md), [status](status.md) and [tasks](tasks.md) first. These commands are a runbook, not evidence they have already run.

## 1. Inspect before changing anything

From the intended checkout, inspect `pwd`/current location, `git status --short`, `git branch --show-current`, `git remote -v`, files, `node --version`, and `pnpm --version`. Do not clone inside an existing checkout. Confirm origin is `darkapoparka/physix`, preserve unrelated edits, and create an implementation branch such as `feat/m0-foundation` from the up-to-date handoff. Never force-reset or silently stash someone else's work.

If not cloned yet:

```sh
git clone https://github.com/darkapoparka/physix.git
cd physix
```

Use a supported Node LTS compatible with generated tooling and hosting; Node 24 is the handoff baseline. Verify the current official Node/pnpm guidance. Reuse the user's working toolchain when compatible. Installing/changing global tools requires approval; a project-scoped package runner is an alternative. Set an exact `packageManager` version and one lockfile once resolved.

## 2. Resolve the current official CLI

Review the official `sv create` / `sv add` sources in [research](research.md), then inspect help:

```sh
npx sv@latest create --help
npx sv@latest add --help
```

Use current stable compatible releases, not preview tags. Record resolved versions after installation; do not pretend today's patches are known from this handoff. If a documented flag has changed, follow official help and record the difference.

## 3. Scaffold away from the documentation

First verify that `../physix-scaffold` does not exist. Choose another unused sibling name if it does. Do not use `--no-dir-check` against the repository, overwrite root `README.md`/`AGENTS.md`, or discard existing docs.

```sh
npx sv@latest create ../physix-scaffold --template minimal --types ts --no-add-ons --no-install
cd ../physix-scaffold
npx sv@latest add prettier eslint tailwindcss vitest playwright --install pnpm
```

Use official add-ons only. Choose unit/component testing appropriate to the generated Svelte version, no demo application, and no unrelated Tailwind plugins. Add-on option prompts may vary; read them rather than guessing flags. Do not add auth, an ORM, a CMS, payments, AI tooling or a monorepo through this step.

## 4. Merge deliberately into the existing checkout

Compare the generated files with the documentation checkout. Copy application/configuration files and merge `.gitignore`/editor settings deliberately. Keep the existing root README, AGENTS and docs/design package. Do not copy `node_modules`, `.git`, build/cache directories, another lockfile or a scaffold README over project documentation. Set package name to `physix` and `private: true`.

An agent can perform this merge with a small cross-platform filesystem script that refuses unexpected collisions; inspect its plan before execution. Do not use a destructive bulk copy. Return to the original checkout, install with pnpm and inspect the diff. Delete the temporary sibling only after verifying that it contains nothing unique and with the user's approval; its removal is not needed for the app to work.

## 5. Normalize a small script contract

Inspect generated `package.json` first. Preserve current Svelte/Vite/Vitest configuration. Normalize these script names to the actual installed tools (the table defines behavior, not blindly pasted flags):

| Script | Behavior |
|---|---|
| `dev` | Vite development server |
| `build` | Production build |
| `preview` | Local build preview |
| `check` | Svelte sync + Svelte/TypeScript checks |
| `lint` | Non-mutating ESLint/format verification |
| `format` | Explicit formatting action |
| `test:unit` | Vitest non-watch run, all selected projects |
| `test:e2e` | Playwright test run |
| `test:db` | R1 only: local Supabase database tests |

Install browser binaries when needed using the installed Playwright runner. Do not assume a CLI success means the browser runtime is present. Keep a verified test script instead of telling later agents to guess it.

```sh
pnpm install
pnpm exec playwright install chromium webkit
pnpm check
pnpm lint
pnpm test:unit
pnpm build
pnpm test:e2e
pnpm dev --host 127.0.0.1
```

Use a separate terminal/process for the development server. On Linux CI, required browser system dependencies may need the official installer and appropriate permissions. Windows PowerShell supports the separate command lines above; do not translate shell-specific environment syntax without checking the shell.

## 6. M0 implementation constraints

Build the public responsive shell, localized content structure, home/services/detail pages, online explanation, focused booking preview and account preview. Local demo mode needs no keys, has synthetic data and cannot send email or persist a real booking. Server provider initialization is lazy and behind capability checks. Deployed demo mode must be explicit and non-indexable; live mode must never silently fall back to fixtures.

Implement only the next M0 tasks and verify them at real phone/desktop widths. Use the design reference for styling and the design-system/wireframe corrections for proportions. Update [versions](versions.md), [tasks](tasks.md) and [status](status.md) with actual commands/results. Stop at the M0 review gate before backend work.

## 7. R1 database setup, later and separately

After M0 approval, install the official Supabase CLI as a project development dependency. With an approved local Docker-compatible runtime:

```sh
pnpm add -D supabase
pnpm exec supabase init
pnpm exec supabase start
```

Do not reinitialize an existing `supabase/` configuration. Keep the local stack bound safely; do not expose it on a public network. Implement migrations/tests and synthetic seed, then use the installed CLI's help for `db reset`, `test db` and type generation. `db reset` is destructive: only an explicitly local disposable database, never a linked remote project. Write generated types with a UTF-8-safe script (PowerShell redirection behavior can differ by version).

No `supabase link`, remote migration push, Vercel deployment or real email/payment action is authorized by the first-session prompt alone.
