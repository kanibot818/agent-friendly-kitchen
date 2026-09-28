import { describe, expect, it } from "vitest";
import {
  checkFeatureMapTestids,
  extractTestIdsFromFeatureMap,
  extractTestIdsFromSource,
  formatMissingReport,
} from "../../bin/check-feature-map-testids.mjs";

const SAMPLE_MAP = `# FEATURE_MAP

### demo

#### data-testid list

| testid | Element | Purpose |
| --- | --- | --- |
| \`keep-me\` | Div | Present in src |
| \`gone-me\` | Button | Missing from src |

#### Import rules

- Outside only.
`;

describe("checkFeatureMapTestids", () => {
  it("extracts mapped testids from data-testid tables", () => {
    expect(extractTestIdsFromFeatureMap(SAMPLE_MAP)).toEqual([
      "keep-me",
      "gone-me",
    ]);
  });

  it("extracts data-testid attributes from source", () => {
    const ids = extractTestIdsFromSource(
      `<div data-testid="keep-me" /><button data-testid={'other'} />`,
    );
    expect([...ids].sort()).toEqual(["keep-me", "other"]);
  });

  it("fails and names a map testid removed from src", () => {
    const result = checkFeatureMapTestids({
      featureMapContent: SAMPLE_MAP,
      srcFiles: {
        "Demo.tsx": `<section data-testid="keep-me" />`,
      },
    });

    expect(result.ok).toBe(false);
    expect(result.missing).toEqual(["gone-me"]);
    expect(formatMissingReport(result.missing)).toContain("missing: gone-me");
  });

  it("passes when every mapped testid exists in src", () => {
    const result = checkFeatureMapTestids({
      featureMapContent: SAMPLE_MAP,
      srcFiles: {
        "Demo.tsx": `
          <section data-testid="keep-me" />
          <button data-testid="gone-me" />
        `,
      },
    });

    expect(result.ok).toBe(true);
    expect(result.missing).toEqual([]);
  });
});
