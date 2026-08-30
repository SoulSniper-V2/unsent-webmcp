import { describe, expect, it } from "vitest";
import type { Decision, Draft } from "@/lib/engine";
import { createWebMCPTools, type Activity } from "@/lib/webmcp";

function fakeApi() {
  const decisions: Record<string, Decision> = {};
  const drafts: Record<string, Draft> = {};
  const archived: string[] = [];
  const activities: Activity[] = [];
  return {
    decisions,
    drafts,
    archived,
    activities,
    api: {
      getDecisions: () => decisions,
      getDrafts: () => drafts,
      getArchived: () => archived,
      onDecision: (decision: Decision) => { decisions[decision.threadId] = decision; },
      onDraft: (draft: Draft) => { drafts[draft.threadId] = draft; },
      onArchived: (id: string) => { archived.push(id); },
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
    const { api, archived, decisions } = fakeApi();
    const tool = createWebMCPTools(api).find((item) => item.name === "archive_as_suspicious")!;
    const result = await tool.execute({ threadId: "thr-06", reason: "credential request" });
    expect(archived).toContain("thr-06");
    expect(decisions["thr-06"].route).toBe("archive");
    expect(result).toMatchObject({ status: "archived", replied: false, deleted: false });
  });
});
