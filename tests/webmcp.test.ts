import { describe, expect, it } from "vitest";
import type { Decision, Draft } from "@/lib/engine";
import { createWebMCPTools, type Activity } from "@/lib/webmcp";

function fakeApi() {
  const decisions: Record<string, Decision> = {};
  const drafts: Record<string, Draft> = {};
  const activities: Activity[] = [];
  return {
    decisions,
    drafts,
    activities,
    api: {
      getDecisions: () => decisions,
      getDrafts: () => drafts,
      onDecision: (decision: Decision) => { decisions[decision.threadId] = decision; },
      onDraft: (draft: Draft) => { drafts[draft.threadId] = draft; },
      onFocus: () => undefined,
      onActivity: (item: Activity) => { activities.push(item); },
    },
  };
}

describe("WebMCP contract", () => {
  it("registers a narrow, no-send tool surface", () => {
    const { api } = fakeApi();
    const tools = createWebMCPTools(api);
    expect(tools).toHaveLength(9);
    expect(tools.map((tool) => tool.name)).not.toContain("send_email");
    expect(tools.find((tool) => tool.name === "read_inbox_thread")?.annotations?.untrustedContentHint).toBe(true);
    expect(tools.find((tool) => tool.name === "get_shadow_scorecard")?.annotations?.readOnlyHint).toBe(true);
    for (const tool of tools) {
      expect(tool.inputSchema.additionalProperties).toBe(false);
    }
  });

  it("archives suspicious content without replying or deleting", async () => {
    const { api, decisions } = fakeApi();
    const tool = createWebMCPTools(api).find((item) => item.name === "archive_as_suspicious")!;
    const result = await tool.execute({ threadId: "thr-06", reason: "credential request" });
    expect(decisions["thr-06"].route).toBe("archive");
    expect(result).toMatchObject({ status: "archived", replied: false, deleted: false });
  });

  it("keeps archive filters consistent when a thread is rerouted", async () => {
    const { api } = fakeApi();
    const tools = Object.fromEntries(createWebMCPTools(api).map((tool) => [tool.name, tool]));
    await tools.archive_as_suspicious.execute({ threadId: "thr-01", reason: "Initial suspicion" });
    await tools.save_draft_reply.execute({ threadId: "thr-01", body: "Please re-run the export. Check the status page." });

    expect(await tools.list_inbox_threads.execute({ status: "archived" })).toMatchObject({ count: 0 });
    expect(await tools.list_inbox_threads.execute({ status: "drafted" })).toMatchObject({
      count: 1,
      threads: [{ id: "thr-01", reviewState: "draft" }],
    });
    await tools.escalate_to_human.execute({ threadId: "thr-01", reason: "Needs a human" });
    expect(await tools.get_shadow_inbox_context.execute({})).toMatchObject({ draftsAwaitingReview: 0 });
    expect(await tools.list_inbox_threads.execute({ status: "drafted" })).toMatchObject({ count: 0 });
    expect(await tools.list_inbox_threads.execute({ status: "escalated" })).toMatchObject({
      threads: [{ id: "thr-01", reviewState: "escalate" }],
    });
  });

  it("flags the actual injection trap without accusing the security questionnaire", async () => {
    const { api } = fakeApi();
    const read = createWebMCPTools(api).find((tool) => tool.name === "read_inbox_thread")!;
    expect(await read.execute({ threadId: "thr-04" })).toMatchObject({ untrustedContent: true, warning: undefined });
    expect(await read.execute({ threadId: "thr-06" })).toMatchObject({ warning: expect.stringContaining("override") });
  });
});
