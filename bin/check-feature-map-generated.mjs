#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  exportFeatureMapFromMarkdown,
  resolveDefaultPaths,
} from "./export-feature-map.mjs";

export function checkFeatureMapGenerated({
  featureMapPath,
  generatedPath,
  featureMapContent,
  generatedContent,
} = {}) {
  let markdown;
  if (typeof featureMapContent === "string") {
    markdown = featureMapContent;
  } else if (featureMapPath) {
    markdown = fs.readFileSync(featureMapPath, "utf8");
  } else {
    throw new Error("featureMapPath or featureMapContent is required");
  }

  const expected = exportFeatureMapFromMarkdown(markdown).text;

  let actual;
  if (typeof generatedContent === "string") {
    actual = generatedContent;
  } else if (generatedPath) {
    if (!fs.existsSync(generatedPath)) {
      return {
        ok: false,
        expected,
        actual: null,
        reason: "missing-generated",
      };
    }
    actual = fs.readFileSync(generatedPath, "utf8");
  } else {
    throw new Error("generatedPath or generatedContent is required");
  }

  if (actual === expected) {
    return {
      ok: true,
      expected,
      actual,
      reason: "fresh",
    };
  }

  return {
    ok: false,
    expected,
    actual,
    reason: "stale",
  };
}

export function formatFeatureMapGeneratedReport(result, generatedRel) {
  if (result.reason === "missing-generated") {
    return [
      "FEATURE_MAP generated JSON missing:",
      `  - expected file: ${generatedRel}`,
      "  - fix: node ./bin/export-feature-map.mjs",
    ].join("\n");
  }

  return [
    "FEATURE_MAP generated JSON is stale vs FEATURE_MAP.md:",
    `  - file: ${generatedRel}`,
    "  - fix: node ./bin/export-feature-map.mjs",
  ].join("\n");
}

function isMain() {
  const entry = process.argv[1] ? path.resolve(process.argv[1]) : "";
  const self = fileURLToPath(import.meta.url);
  return entry === self;
}

function main() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const { featureMapPath, outputPath } = resolveDefaultPaths(root);
  const result = checkFeatureMapGenerated({
    featureMapPath,
    generatedPath: outputPath,
  });
  const rel = path.relative(root, outputPath);

  if (!result.ok) {
    console.error(formatFeatureMapGeneratedReport(result, rel));
    process.exit(1);
  }

  const payload = JSON.parse(result.actual);
  console.log(
    `FEATURE_MAP generated JSON OK (${payload.features.length} features, fresh vs FEATURE_MAP.md)`,
  );
}

if (isMain()) {
  main();
}
