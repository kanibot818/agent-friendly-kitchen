import type { FeatureMapDocument, FeatureMapEntry } from "./featureMapTypes";

export function listFeatureMapEntries(
  document: FeatureMapDocument,
): FeatureMapEntry[] {
  return document.features;
}

export function countMappedTestids(document: FeatureMapDocument): number {
  return document.features.reduce(
    (sum, feature) => sum + feature.testids.length,
    0,
  );
}

export function featureMapSummaryLabel(document: FeatureMapDocument): string {
  const featureCount = document.features.length;
  const testidCount = countMappedTestids(document);
  return `${featureCount} features · ${testidCount} testids`;
}
