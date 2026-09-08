# Runtime, environments and release operations

Use [SESSION.md](SESSION.md) for the last known state and [tasks.md](../../tasks.md) for actual status. All commands below are guidance for future execution, not evidence they were run for this documentation task.

## Prove the checkout and listener

Physix lives at `M:/physix-pro`, independently of `M:/gym` and `M:/gym-fidelity`. Start each session with read-only checks:

```powershell
Set-Location -LiteralPath M:/physix-pro
Get-Location
git status --short --branch
git rev-parse HEAD
git remote -v
git log -1 --oneline phys1x-template-baseline
Get-NetTCPConnection -LocalPort 3214 -State Listen -ErrorAction SilentlyContinue
```

Inspect any returned listener's owning process and parent command lines before stopping, replacing or claiming it. Check that its Next executable and working directory belong to Physix. HTTP 200 and a server “ready” line are insufficient: verify the rendered route, app identity and errors. Current process IDs are ephemeral and must not be copied as permanent instructions.

The restored `package.json` defaults to port 3210. Until PX-004 changes that, use this explicit command from the correct checkout if no owned server is already running:

```powershell
node ./node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 3214
```

For a persistent Windows helper use `Start-Process` with `-WindowStyle Hidden`, an explicit working directory and ignored log paths. Keep a server only when it belongs to the requested task. Avoid concurrent dev/build writers to the same `.next`; use a separate checkout/output or stop the verified owned process before a required build.

## Environment separation

| Environment | Data and providers | Gate |
|---|---|---|
| Reference preview | Explicit synthetic template capture; no authenticated-record claim | Development-only flag and route boundary |
| Isolated local/dev | Synthetic Physix accounts and separate DB/storage/auth namespace | PX-004, PX-006 |
| Dedicated staging | Synthetic scenarios, test provider credentials, production-like configuration | PX-038 |
| Production | Approved clinic configuration and actual permitted client data | PX-039, PX-040 |

No source-project credentials, database records, payment products or user cookies may be silently reused. Port differences do not isolate browser cookies; Physix needs its own namespace and verified session handling. Reference preview must not be a production bypass or silently seed real users.

PX-006 creates a sanitized environment-variable inventory from actual code: purpose, required environments, public/server-only classification, owner and safe example. Never put secret values, real patient records or raw provider payloads in docs, artifacts, prompts or Git. The current local file has flags/origin only; no working Physix database is implied.

Select providers through D-027 using existing integration fit, needed regions/features, cost, ownership and recovery needs. Supabase/Postgres is the migration default because backend code exists; paid provisioning and provider-account actions depend on the user's actual authorization. Provider defaults are not clinic business rules.

## Database and job operations

- Inventory all 18 inherited migrations and their assumptions before adapting. Apply additive, reviewed changes; maintain migration order and test both fresh installation and upgrade from the accepted baseline.
- Seed only named disposable environments with synthetic actors. Inherited `astra:seed`, `supabase/seed.sql` and local MFA shortcuts require explicit target/guard inspection; they are not production bootstrap instructions.
- Database resets delete data. Verify the resolved target and existing authorization before any reset; use a disposable test environment when possible.
- Booking, billing and notification writes need transaction/idempotency handling. The durable outbox/jobs need bounded retries, dead-letter visibility and safe operator replay; process memory alone is insufficient.
- Rehearse backup restoration into an isolated destination, verify record relationships and media access, then document measured recovery time and data-loss window for owner acceptance. Provider backup availability is not restore proof.
- Code rollback and data rollback differ. Prefer backward-compatible rollout and a reviewed forward fix where reverting a destructive migration would lose data. Record exact rollback thresholds and commands in the candidate runbook.

## Release procedure

1. Finish dependency gates through PX-037. Resolve owner decisions and required assets; record any explicitly narrowed scope.
2. PX-038 establishes the selected remote/CI/hosting ownership, isolated staging deployment, secret configuration, exact candidate SHA and migration rehearsal. Inspect target identity before writing to external systems. Do not invent a remote or deployment account.
3. Run staging journeys, role-denial tests, sandbox provider flows, BG/EN review, private-cache checks and recovery rehearsal. Remove synthetic shortcuts from production configuration and verify the production build does not expose them.
4. PX-039 obtains clinic acceptance of the concrete staged candidate, content, policies and staff workflow. Document approved budget, support owner and launch observation window through D-029.
5. PX-040 executes publication only when that action/destination is authorized. User authorization already given in the session remains valid; do not ask again unless the candidate, destination or scope materially changes. If authorization is missing, finish the reviewable candidate and ask for that final action.
6. Deploy with the migration plan, smoke-test public booking and private access using approved test identities, verify email/payment mode if selected, and observe errors/queues. Do not make a real charge or contact a real client just to test without authorization.
7. PX-041 completes the agreed observation window, restore/support handoff, incident procedures and final task audit. A product with unresolved launch gates remains pre-release.

## Incident and maintenance record

Document how staff report a problem; who can disable new bookings or a broken payment path; how existing appointments remain visible; who receives operational alerts; and how failed notifications are recovered. Keep sensitive clinical content out of logs and alert payloads. Record dependency update ownership, backup checks, provider renewals and support response expectations using clinic-approved values.

No recurring automation, live provider setup, publication or real notifications are created by this plan. Implement those only in their authorized task scope.
