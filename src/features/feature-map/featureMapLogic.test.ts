import { describe, expect, it } from "vitest";
import {
  countMappedTestids,
  featureMapSummaryLabel,
  listFeatureMapEntries,
} from "./featureMapLogic";
import type { FeatureMapDocument } from "./featureMapTypes";

const SAMPLE: FeatureMapDocument = {
  source: "FEATURE_MAP.md",
  features: [
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
  ],
};

describe("featureMapLogic", () => {
  it("lists entries from the document", () => {
    expect(listFeatureMapEntries(SAMPLE).map((entry) => entry.id)).toEqual([
      "hello",
      "feature-map",
    ]);
  });

  it("counts mapped testids and builds a summary label", () => {
    expect(countMappedTestids(SAMPLE)).toBe(3);
    expect(featureMapSummaryLabel(SAMPLE)).toBe("2 features · 3 testids");
  });
});
