# Security notes

Unsent is intentionally a local browser rehearsal. It contains synthetic inbox and customer records only.

## Trust boundaries

- Incoming thread bodies are untrusted content and can include an instruction-injection trap.
- Trusted evidence is returned separately from message text.
- WebMCP tools use narrow JSON schemas with `additionalProperties: false`.
- Read-only tools are annotated with `readOnlyHint`.
- Thread content tools are annotated with `untrustedContentHint`.
- Write tools are limited to private drafts, human escalation, and reversible suspicious archiving.
- There is no send, delete, refund, credential, payment, or external-network tool.
- Human approval is represented by a normal UI control, not by a WebMCP tool.

Do not connect real credentials or customer data to this demo. Graduation is a heuristic for a synthetic run, not a security certification.
