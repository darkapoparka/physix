# Private care and optional community

## Client home and plans

Retain the original account-home composition while making the next appointment and assigned plan primary. Show actual therapist identity, saved appointments, real assigned exercises and relevant unread/review status. Empty states explain the next real step; no reference coach, invented training streak or generic onboarding blocker may substitute for missing data.

Plan content is authored/approved by an authorized therapist. A draft is editable; publishing creates an immutable version; assignment links that version to the intended clinic/client/therapist and dated schedule. Exercise instructions, set/repetition/time targets, rest, supported equipment and approved media remain structured. Retiring a plan does not change historical session records. Therapists determine appropriate exercises; the app does not invent treatment or automatic progression.

An exercise attempt has its own identity, acknowledgement-based timer/state, actual set logs, feedback and completion record. Resume a paused attempt deliberately; retrying a start must not create another attempt. Preserve unsaved feedback with a clear discard/continue choice and correct relationship context. Staff amendments need a reason and history; do not silently rewrite a client's completed attempt. End of service/therapist reassignment must have explicit access rules for history versus new writes.

## Progress and intake

Progress may include plan adherence, completed sessions, client goals and therapist-selected feedback measures. Measures need units, range, timestamp, context, author and correction history. A difficulty score is not automatically a pain score. Weight, activity rings, streaks or competitive scores are not default rehabilitation outcomes; retain only what D-025 approves. Do not market a chart as recovery effectiveness.

Account fields and clinical intake are separate. Collect only approved fields, with required/optional purpose clear. No preset diagnosis, inferred medical state or automatic imported reference answers. Minors/dependents, document signatures and formal clinical notes remain policy decisions. If formal clinical records are required, expand the scope with retention/amendment/access contracts rather than relabeling the generic member-record table.

## Messages and private media

Only currently authorized participants can see a conversation. An assignment change must update access according to explicit history policy. Preserve message ordering, pagination, stable send/upload retry IDs, unread state and refresh behavior. No synthetic coach replies or client-side delivery claims. Define edits/deletions and audit behavior before exposing them. State actual support response expectations once the clinic supplies them; do not invent monitoring or emergency availability.

Private images/video/documents need bounded MIME/size validation, permission checks on upload/read/delete, private storage, expiring links where appropriate, and deletion/retention processing. Signed URLs, image responses and exports must not leak through public caches or logs. Handle upload success with lost acknowledgement, failed attachment send, canceled upload and orphan cleanup. Device recording stays an optional browser capability with truthful unsupported states.

## Community v1 proposal (D-026 still OPEN)

The smallest useful community is staff-published announcements and events/workshops with optional RSVP. It is distinct from patient care. An event contains reviewed title/body, BG/EN content, schedule/timezone/location, visibility, capacity, eligibility, attendance policy and publication state. Paid events require a separate approved payment rule.

Draft -> published -> archived; cancellation is explicit with notification intent. Staff can edit with revision conflict handling; materially changed schedule/location/cost must be communicated. Clients can join/leave within rules; capacity and retries are transactional. A full event cannot accept extra participants through concurrent requests. Waitlists/comments/member posts are out of initial scope unless D-026 adds them with moderation and lifecycle tasks.

Joining an event is not consent to share medical details, photos or public attendee identity. Public lists expose only approved public fields; attendee lists are private by default. No recovery leaderboard, public patient profile or automatic sharing of completed exercises. Community roles cannot access care notes. Subscription/notification preferences are separately controlled.

## Permissions and staff experience

Therapists see assigned-client plans/feedback; reception sees scheduling/contact operations; clinic administrators manage services/staff; moderators manage permitted content. Small-center staff may hold several roles but each permission remains checked. The existing coach workspace is a reusable starting point, not a reason to grant all staff full private access.

## Acceptance examples

- Therapist A assigns published plan V1 to Client A; edits/publishes V2; A's existing attempt still records V1 and its actual sets.
- Client B cannot fetch A's plan, logs, message attachments or export by copying IDs/URLs.
- A failed save leaves input recoverable and never reports saved; retry after success returns the original result.
- Reassignment/suspension closes access according to policy, including cached/private media and alternate API paths.
- An event-capacity race accepts only available seats. Canceling an event preserves records and sends one appropriate notification per participant/version.
- Public community responses, social previews, exports and notifications contain no private care fields.

Task owners: PX-020 through PX-030; lifecycle PX-032; final cross-surface proof PX-035/PX-036.
