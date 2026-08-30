# Research behind Unsent

This project was selected after a deliberate build-or-kill review on August 30, 2026. The full source memo is kept in the working notes; this is the compact public version.

## What the founder community is saying

- [Ryan Staley](https://x.com/Ryan_Staley1/status/2092946759303475466) describes shadow mode as running on realistic inputs while doing nothing external, then requiring repeated clean runs, traceable claims, low rework, and a caught problem before promotion.
- [Myttle](https://x.com/xmyttle/status/2069037261434302953) argues that the first agent should live in drafts, not sent mail. Money, reputation, emotion, refunds, and angry customers stay locked.
- [Corey Ganim](https://x.com/coreyganim/status/2090200888426328490) recommends testing trusted sources, every tool, least privilege, failure cases, repeated inputs, evidence, review time, and undo paths.
- [Mark Ajzenstadt](https://x.com/mardehaym/status/2092516152274554891) frames agent adoption as a progression that needs harness engineering, headless operation, governance, lifecycle management, and human exception handling.
- [Ankit Agarwal](https://x.com/kumarumt/status/2093806775686562136) summarizes the practical boundary: routine work can run, but Pay and Delete should be gated.

These are qualitative discovery signals, not market-size estimates.

## Why not an acquisition agent?

Acquisition screening is a real need. [Marc Lou](https://x.com/marclou/status/2079755760729514383) described an agent that finds thesis-matched SaaS and performs early diligence. But [Acquire.com](https://help.acquire.com/how-to-do-due-diligence), [Dealport](https://www.dealport.com/), and [SearchStreet](https://searchstreet.com/) already cover large parts of sourcing, diligence, underwriting, and approval. That concept was rejected as a clone risk.

## Why a shadow inbox?

[ActionLayer](https://www.actionlayer.dev/), [Leashmail](https://www.leashmail.com/), [ReplyLayer](https://replylayer.ai/), [Nuvrail](https://nuvrail.com/), and [Evoriqa](https://www.evoriqa.com/features/shadow-mode) show that safe drafting and approval are valuable production categories. [Zapier AutomationBench](https://zapier.com/benchmarks) and Salesforce's CRMArena-Pro show that end-to-end evaluation in simulated businesses is also a live need.

Unsent is intentionally narrower: a portable, WebMCP-first rehearsal surface where a founder can bring an agent to a synthetic inbox, inspect the same page, test untrusted content, and measure whether the agent earned more autonomy. It is not trying to replace those production systems.

## Build-or-kill gate

The build was approved only if the demo could show five or more page tools, shared state changes, a grounded private draft, a safe escalation or archive, a visible no-send boundary, and a deterministic graduation decision in under three minutes. The shipped project satisfies that gate.
