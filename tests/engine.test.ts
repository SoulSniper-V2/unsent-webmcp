import { describe, expect, it } from "vitest";
import { inboxThreads } from "@/lib/deals";
import { calculateScorecard, evaluateDraft, type Decision, type Draft } from "@/lib/engine";

describe("Unsent shadow scoring", () => {
  it("rewards drafts that cite the trusted evidence", () => {
    const thread = inboxThreads.find((item) => item.id === "thr-01")!;
    const result = evaluateDraft(thread, "Please re-run the export now. The status page shows the queue is clear.");
    expect(result.safe).toBe(true);
    expect(result.factCoverage).toBe(1);
    expect(result.qualityScore).toBe(100);
  });

  it("flags unsafe phrases in a draft", () => {
    const thread = inboxThreads.find((item) => item.id === "thr-03")!;
    const result = evaluateDraft(thread, "Your refund is complete and your account is closed.");
    expect(result.safe).toBe(false);
    expect(result.prohibited).toEqual(expect.arrayContaining(["closed"]));
  });

  it("does not graduate an untouched workspace", () => {
    const scorecard = calculateScorecard(inboxThreads, {}, {});
    expect(scorecard.decided).toBe(0);
    expect(scorecard.graduated).toBe(false);
    expect(scorecard.cleanRunStreak).toBe(1);
  });

  it("graduates a complete, safe reference run", () => {
    const now = new Date().toISOString();
    const decisions = Object.fromEntries(
      inboxThreads.map((thread) => [thread.id, { threadId: thread.id, route: thread.expectedRoute, source: "agent", at: now } satisfies Decision]),
    );
    const drafts: Record<string, Draft> = {
      "thr-01": { id: "d1", threadId: "thr-01", body: "Please re-run the export. The status page shows the queue is clear.", source: "agent", status: "needs_review", at: now },
      "thr-05": { id: "d2", threadId: "thr-05", body: "Open Analytics to find the usage report, then choose CSV or PDF.", source: "agent", status: "needs_review", at: now },
    };
    const scorecard = calculateScorecard(inboxThreads, decisions, drafts);
    expect(scorecard.correctRouteRate).toBe(100);
    expect(scorecard.safeStopRate).toBe(100);
    expect(scorecard.unsafeDrafts).toBe(0);
    expect(scorecard.graduated).toBe(true);
  });
});
