import { describe, expect, it } from "vitest";
import {
  exportFeatureMapFromMarkdown,
  parseFeatureMapMarkdown,
  serializeFeatureMap,
} from "../../bin/export-feature-map.mjs";
import {
  checkFeatureMapGenerated,
  formatFeatureMapGeneratedReport,
} from "../../bin/check-feature-map-generated.mjs";

const SAMPLE = `# FEATURE_MAP

## Features

### hello

| Field | Value |
| --- | --- |
| Path | \`/\` (default route; single-page app) |
| Public API | \`src/features/hello/index.ts\` |

#### data-testid list

| testid | Element | Purpose |
| --- | --- | --- |
| \`hello-root\` | Section | Feature root |
| \`hello-title\` | Heading | Title |

### feature-map

| Field | Value |
| --- | --- |
| Path | \`/\` (same page below theme-toggle) |
| Public API | \`src/features/feature-map/index.ts\` |

#### data-testid list

| testid | Element | Purpose |
| --- | --- | --- |
| \`feature-map-root\` | Section | Feature root |
`;

describe("exportFeatureMap", () => {
  it("parses features, paths, public APIs, and testids", () => {
    const features = parseFeatureMapMarkdown(SAMPLE);
    expect(features).toEqual([
      {
        id: "hello",
        path: "/",
        publicApi: "src/features/hello/index.ts",
        testids: ["hello-root", "hello-title"],
      },
      {
        id: "feature-map",
        path: "/",
        publicApi: "src/features/feature-map/index.ts",
        testids: ["feature-map-root"],
      },
    ]);
  });

  it("serializes a stable JSON payload", () => {
    const { text, payload } = exportFeatureMapFromMarkdown(SAMPLE);
    expect(payload.source).toBe("FEATURE_MAP.md");
    expect(text).toBe(serializeFeatureMap(payload));
    expect(text.endsWith("\n")).toBe(true);
  });
});

describe("checkFeatureMapGenerated", () => {
  it("passes when generated JSON matches FEATURE_MAP.md", () => {
    const expected = exportFeatureMapFromMarkdown(SAMPLE).text;
    const result = checkFeatureMapGenerated({
      featureMapContent: SAMPLE,
      generatedContent: expected,
    });
    expect(result.ok).toBe(true);
    expect(result.reason).toBe("fresh");
  });

  it("fails when generated JSON is missing or stale", () => {
    const missing = checkFeatureMapGenerated({
      featureMapContent: SAMPLE,
      generatedPath: "/tmp/does-not-exist-feature-map.json",
    });
    expect(missing.ok).toBe(false);
    expect(missing.reason).toBe("missing-generated");
    expect(formatFeatureMapGeneratedReport(missing, "out.json")).toContain(
      "missing",
    );

    const stale = checkFeatureMapGenerated({
      featureMapContent: SAMPLE,
      generatedContent: "{}\n",
    });
    expect(stale.ok).toBe(false);
    expect(stale.reason).toBe("stale");
    expect(formatFeatureMapGeneratedReport(stale, "out.json")).toContain(
      "stale",
    );
  });
});
