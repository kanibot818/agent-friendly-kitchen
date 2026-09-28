#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const MAP_ROW_TESTID = /^\|\s*`([^`]+)`\s*\|/;
const MAP_ROW_FIELD = /^\|\s*([^|]+?)\s*\|\s*(.+?)\s*\|$/;

export const DEFAULT_OUTPUT_REL = "src/features/feature-map/feature-map.generated.json";

export function parseFeatureMapMarkdown(markdown) {
  const features = [];
  let current = null;
  let inTestIdList = false;

  for (const line of markdown.split(/\r?\n/)) {
    const featureHeading = line.match(/^###\s+([a-z0-9][a-z0-9-]*)\s*$/i);
    if (featureHeading) {
      if (current) {
        features.push(current);
      }
      current = {
        id: featureHeading[1],
        path: "",
        publicApi: "",
        testids: [],
      };
      inTestIdList = false;
      continue;
    }

    if (/^##\s+/.test(line)) {
      if (current) {
        features.push(current);
        current = null;
      }
      inTestIdList = false;
      continue;
    }

    if (!current) {
      continue;
    }

    if (/^#{2,4}\s+/.test(line)) {
      inTestIdList = /data-testid\s+list/i.test(line);
      continue;
    }

    if (inTestIdList) {
      const match = line.match(MAP_ROW_TESTID);
      if (!match) {
        continue;
      }
      const id = match[1].trim();
      if (!id || id === "testid" || id.startsWith("---")) {
        continue;
      }
      if (!current.testids.includes(id)) {
        current.testids.push(id);
      }
      continue;
    }

    const fieldMatch = line.match(MAP_ROW_FIELD);
    if (!fieldMatch) {
      continue;
    }
    const field = fieldMatch[1].trim().toLowerCase();
    const rawValue = fieldMatch[2].trim();
    if (field === "field" || field.startsWith("---")) {
      continue;
    }
    const tick = rawValue.match(/`([^`]+)`/);
    const value = tick ? tick[1].trim() : rawValue.trim();
    if (field === "path") {
      current.path = value;
    } else if (field === "public api") {
      current.publicApi = value;
    }
  }

  if (current) {
    features.push(current);
  }

  return features;
}

export function buildFeatureMapPayload(features) {
  return {
    source: "FEATURE_MAP.md",
    features: features.map((feature) => ({
      id: feature.id,
      path: feature.path,
      publicApi: feature.publicApi,
      testids: [...feature.testids],
    })),
  };
}

export function serializeFeatureMap(payload) {
  return `${JSON.stringify(payload, null, 2)}\n`;
}

export function exportFeatureMapFromMarkdown(markdown) {
  const features = parseFeatureMapMarkdown(markdown);
  const payload = buildFeatureMapPayload(features);
  return {
    payload,
    text: serializeFeatureMap(payload),
  };
}

export function resolveDefaultPaths(root) {
  return {
    featureMapPath: path.join(root, "FEATURE_MAP.md"),
    outputPath: path.join(root, DEFAULT_OUTPUT_REL),
  };
}

export function writeFeatureMapJson({
  featureMapPath,
  outputPath,
  encoding = "utf8",
} = {}) {
  const markdown = fs.readFileSync(featureMapPath, encoding);
  const { payload, text } = exportFeatureMapFromMarkdown(markdown);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, text, encoding);
  return { payload, text, outputPath };
}

function isMain() {
  const entry = process.argv[1] ? path.resolve(process.argv[1]) : "";
  const self = fileURLToPath(import.meta.url);
  return entry === self;
}

function main() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const { featureMapPath, outputPath } = resolveDefaultPaths(root);
  const result = writeFeatureMapJson({ featureMapPath, outputPath });
  const count = result.payload.features.length;
  const testidCount = result.payload.features.reduce(
    (sum, feature) => sum + feature.testids.length,
    0,
  );
  console.log(
    `Wrote ${path.relative(root, outputPath)} (${count} features, ${testidCount} testids)`,
  );
}

if (isMain()) {
  main();
}
