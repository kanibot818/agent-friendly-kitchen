import { describe, expect, it } from "vitest";
import {
  checkFeatureMapDiff,
  formatFeatureMapDiffReport,
  isFeatureMapPath,
  isFeatureSourcePath,
  listChangedFilesAgainstBase,
  normalizeRepoPath,
} from "../../bin/check-feature-map-diff.mjs";

describe("checkFeatureMapDiff", () => {
  it("normalizes and detects feature / map paths", () => {
    expect(normalizeRepoPath("./src/features/hello/HelloView.tsx")).toBe(
      "src/features/hello/HelloView.tsx",
    );
    expect(isFeatureSourcePath("src/features/hello/index.ts")).toBe(true);
    expect(isFeatureSourcePath("src/app/AppShell.tsx")).toBe(false);
    expect(isFeatureMapPath("FEATURE_MAP.md")).toBe(true);
    expect(isFeatureMapPath("docs/FEATURE_MAP.md")).toBe(false);
  });

  it("passes when the diff has no src/features changes", () => {
    const result = checkFeatureMapDiff([
      "bin/verify",
      "AGENTS.md",
      "src/app/AppShell.tsx",
    ]);
    expect(result.ok).toBe(true);
    expect(result.reason).toBe("no-feature-changes");
    expect(result.featureChanges).toEqual([]);
  });

  it("passes on an empty diff (main / no commits ahead)", () => {
    const result = checkFeatureMapDiff([]);
    expect(result.ok).toBe(true);
    expect(result.reason).toBe("no-feature-changes");
  });

  it("passes when feature paths and FEATURE_MAP.md both change", () => {
    const result = checkFeatureMapDiff([
      "src/features/hello/HelloView.tsx",
      "FEATURE_MAP.md",
      "e2e/hello.spec.ts",
    ]);
    expect(result.ok).toBe(true);
    expect(result.reason).toBe("feature-and-map-changed");
    expect(result.featureChanges).toEqual([
      "src/features/hello/HelloView.tsx",
    ]);
  });

  it("fails when src/features changes without FEATURE_MAP.md", () => {
    const result = checkFeatureMapDiff([
      "src/features/hello/helloLogic.ts",
      "src/features/hello/helloLogic.test.ts",
    ]);
    expect(result.ok).toBe(false);
    expect(result.reason).toBe("feature-without-map");
    expect(result.mapChanged).toBe(false);
    expect(formatFeatureMapDiffReport(result)).toContain(
      "src/features/hello/helloLogic.ts",
    );
    expect(formatFeatureMapDiffReport(result)).toContain("FEATURE_MAP.md");
  });

  it("lists changed files via merge-base...HEAD", () => {
    const calls = [];
    const execFileSyncFn = (cmd, args) => {
      calls.push([cmd, ...args]);
      if (args[0] === "merge-base") {
        return "abc123\n";
      }
      return "src/features/hello/index.ts\nFEATURE_MAP.md\n";
    };

    const files = listChangedFilesAgainstBase({
      baseRef: "origin/main",
      execFileSyncFn,
      cwd: "/repo",
    });

    expect(calls[0]).toEqual(["git", "merge-base", "HEAD", "origin/main"]);
    expect(calls[1]).toEqual(["git", "diff", "--name-only", "abc123...HEAD"]);
    expect(files).toEqual([
      "src/features/hello/index.ts",
      "FEATURE_MAP.md",
    ]);
  });
});
