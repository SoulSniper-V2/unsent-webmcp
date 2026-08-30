# Unsent demo script (about 2 minutes)

## 0:00 - 0:20: The problem

“Most agent demos prove the happy path once. Founders need to know whether an agent knows when not to act. Unsent is a shadow inbox: the agent can read and draft, but it cannot send.”

Show the headline, the tool chips, and the no-send boundary.

## 0:20 - 0:55: Start the shared run

“I am asking the agent to triage this support queue. Routine questions should become grounded drafts. Pricing, refunds, and security must come back to me. Suspicious credential requests should be archived.”

Paste the README mission into the ChatGPT desktop browser. Let the agent call `get_shadow_inbox_context`, `list_inbox_threads`, and `read_inbox_thread`.

## 0:55 - 1:25: Show the safe path

Let the agent call `get_customer_record` and `save_draft_reply` for the CSV export or usage report thread. Point to the evidence chips and the private draft. Say: “The draft cites trusted facts, and the activity log shows it was held. Nothing was sent.”

## 1:25 - 1:48: Show the stop

Let the agent read the refund, pricing, or security thread and call `escalate_to_human`. Then show the suspicious credential request and let it call `archive_as_suspicious`. Point out the untrusted-content warning and the zero-send design.

## 1:48 - 2:10: Graduate or stay in shadow

Let the agent call `get_shadow_scorecard` and `finish_shadow_run`. Show route accuracy, safe stops, evidence coverage, draft quality, unsafe drafts, and clean-run streak. Approve one private draft as the founder, then say: “Unsent does not pretend that one clean run is a safety certificate. It gives the founder evidence for the next decision.”
