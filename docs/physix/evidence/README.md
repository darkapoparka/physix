# Evidence index and template

The task ledger owns status. This directory holds evidence supporting it; a file's existence is not a passing check. [PX-000](PX-000.md) records the planning deliverable. Add an entry below as each task gains evidence.

| Task | Record | Scope |
|---|---|---|
| PX-000 | [Planning validation](PX-000.md) | Documentation only |

## Per-task template

Copy this structure into `PX-NNN.md` and link it from that task. Keep screenshots/logs in an ignored artifact directory unless a reviewed small sanitized artifact is intentionally committed. Use durable artifact storage for release evidence and record an accessible link/checksum; a missing local artifact must be reported.

```markdown
# PX-NNN — Task title

- Date / executor:
- Code branch and exact tested SHA (or base SHA plus named pending diff):
- Environment / URL / verified listener ownership:
- Synthetic actors / fixture / schema revision:
- Decisions and contracts used:

## Acceptance results
| Criterion | Expected | Observed | Result | Evidence |
|---|---|---|---|---|
| ... | ... | ... | PASS / FAIL / BLOCKED / NOT RUN | command, test, screenshot or record |

## Reproduction
Exact commands and bounded steps, with secrets removed. Include persisted-data
checks for writes and negative direct-access tests for authorization changes.

## Visual evidence
Route, viewport, locale, actor/state, baseline, intentional differences,
artifact location. Use N/A with a reason when no UI changed.

## Limits and follow-ups
Unrun provider/device checks, defects with task IDs, owner decisions pending.
Do not hide a task requirement here and still mark the task DONE.

## Recovery and handoff
Changed files/schema, migration/rollback implications, next safe task.
```

Never include credentials, auth cookies, private patient information, unredacted production exports or payment details. Quote error messages only after checking for sensitive identifiers.
