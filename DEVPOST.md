# Unsent: project description

## One-line description

An agent-ready shadow inbox that lets a founder measure judgment before granting an agent the right to send.

## Why WebMCP is the right fit

The hard part of agent email is not rendering a mailbox. It is sharing the same live state while keeping the action boundary legible. WebMCP lets the agent discover narrow operations on the page, while the founder watches thread selection, evidence, drafts, escalations, and the scorecard update in the same session.

Unsent does not make an agent click a pretend Send button. It gives the agent a real task surface with structured inputs and explicit side effects. `read_inbox_thread` returns message text as untrusted content. `save_draft_reply` creates only a private draft. `escalate_to_human` records why the agent stopped. `archive_as_suspicious` is reversible and never replies or deletes. The page has no send, refund, delete, or credential tool by design.

## What people and agents can do together

Before Unsent, a founder had to connect an early agent to a real mailbox or construct a one-off test harness. That makes it hard to observe mistakes safely and hard to tell whether the agent is ready for one narrow category.

With Unsent, the agent can triage realistic support threads, retrieve trusted customer facts, draft grounded replies, flag sensitive decisions, and finish a measurable rehearsal. The founder can inspect the exact same page, edit or approve a private draft, review the evidence trail, and decide whether the agent should remain in shadow mode. The agent earns autonomy through repeated clean behavior, not through a single successful demo.

## How it is implemented

The app is a Next.js client page with deterministic local state and a synthetic six-thread support dataset. The domain logic lives in `src/lib/engine.ts` and `src/lib/deals.ts`. `src/lib/webmcp.ts` defines the tool schemas, side-effect descriptions, annotations, and handlers. `src/components/dashboard.tsx` registers them on the top-level document when `document.modelContext.registerTool` exists, and exposes a guided reference mission for browsers without WebMCP.

The scorecard measures route accuracy, high-risk stops, trusted-evidence coverage, draft quality, unsafe phrases, and clean-run streak. The human review controls never send a message. The app uses no external API keys and stores no server-side customer data.

## Testing instructions

1. Open the live URL in ChatGPT's built-in browser or Chrome 149+ with WebMCP enabled.
2. Ask the agent to follow the mission prompt in the README.
3. Confirm that it reads policy, lists threads, reads multiple threads, drafts the routine questions, escalates pricing/refund/security, archives the suspicious credential request, and finishes with the scorecard.
4. Click a private draft. Approve, edit, or reject it. The activity log should show a founder review and still show zero external messages.

Synthetic data is intentionally used so judges can test the full flow without credentials. Graduation is a heuristic for this rehearsal, not a production safety certification.

## Judging fit

- **WebMCP leverage:** nine structured page tools, narrow schemas, annotations, shared state, and a deliberate no-send boundary.
- **Execution:** a complete inbox, evidence panel, private draft review, human escalation path, activity log, scorecard, and browser fallback.
- **Potential impact:** founders can rehearse a support agent before it touches customer relationships, money, reputation, or secrets.
- **Creativity and ambition:** a page that treats WebMCP as a trust and graduation surface, not as a shortcut for clicking through a form.
