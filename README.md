# Physix

A rehabilitation center website and client/staff web application, starting from the preserved Future Pro interface and inherited Gymaf backend code.

**Current state:** the original template is restored; the Physix implementation is planned, not finished. The public clinic website, complete booking workflows, clinic policies and production backend still need the work tracked below.

## Continue the project

1. Read [AGENTS.md](AGENTS.md).
2. Read the [current handoff](docs/physix/SESSION.md).
3. Select work from [tasks.md](tasks.md).
4. Use the [plan index](docs/physix/README.md) and [decision register](docs/physix/DECISIONS.md).

The plan covers a public website, account app, bookings, staff operations, care plans, private messages, optional community and Bulgarian/English. Stack: Next.js, React, TypeScript and the existing CSS system, with the inherited Supabase/Postgres integration as the backend default. One project initially; native apps are a later scope.

## Local reference

Use `M:/phys1x`, independently of the source projects. Port 3214 belongs to Physix; verify any existing listener first. Until the runtime scripts are adapted, the explicit command is:

```powershell
node ./node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 3214
```

The [runtime guide](docs/physix/OPERATIONS.md) explains environment isolation and safe startup. The visible capture URL in the handoff is synthetic template preview, not a functioning authenticated Physix account. No Physix database credentials were configured at planning.

## History and verification

The preserved application baseline is tag `phys1x-template-baseline` at `60582a5`. The rejected `codex/phys1x-foundation` landing-page detour remains separate; do not restore it wholesale.

The [task evidence](docs/physix/evidence/README.md) and [verification contract](docs/physix/VERIFICATION.md) distinguish current proof from pending work. Inherited [Astra documentation](astra/README.md) describes source implementation and historical tests. It is not the Physix product plan or a release certificate. Earlier root documentation is recoverable from the baseline tag without changing the working tree.
