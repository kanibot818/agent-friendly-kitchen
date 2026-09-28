#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ATTR_DOUBLE = /data-testid\s*=\s*"([^"]+)"/g;
const ATTR_SINGLE = /data-testid\s*=\s*'([^']+)'/g;
const ATTR_JSX_DOUBLE = /data-testid\s*=\s*\{\s*"([^"]+)"\s*\}/g;
const ATTR_JSX_SINGLE = /data-testid\s*=\s*\{\s*'([^']+)'\s*\}/g;
const ATTR_JSX_BACKTICK = /data-testid\s*=\s*\{\s*`([^`$]+)`\s*\}/g;
const MAP_ROW = /^\|\s*`([^`]+)`\s*\|/;
const SOURCE_EXT = new Set([".ts", ".tsx", ".js", ".jsx"]);

export function extractTestIdsFromFeatureMap(markdown) {
  const ids = [];
  const seen = new Set();
  let inList = false;

  for (const line of markdown.split(/\r?\n/)) {
    if (/^#{2,4}\s+/.test(line)) {
      inList = /data-testid\s+list/i.test(line);
      continue;
    }
    if (!inList) {
      continue;
    }
    const match = line.match(MAP_ROW);
    if (!match) {
      continue;
    }
    const id = match[1].trim();
    if (!id || id === "testid" || id.startsWith("---")) {
      continue;
    }
    if (!seen.has(id)) {
      seen.add(id);
      ids.push(id);
    }
  }

  return ids;
}

export function extractTestIdsFromSource(content) {
  const ids = new Set();
  for (const pattern of [
    ATTR_DOUBLE,
    ATTR_SINGLE,
    ATTR_JSX_DOUBLE,
    ATTR_JSX_SINGLE,
    ATTR_JSX_BACKTICK,
  ]) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(content)) !== null) {
      ids.add(match[1]);
    }
  }
  return ids;
}

function walkSourceFiles(dir, files = []) {
  if (!fs.existsSync(dir)) {
    return files;
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkSourceFiles(full, files);
      continue;
    }
    if (SOURCE_EXT.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

export function collectTestIdsFromSrcDir(srcDir) {
  const ids = new Set();
  for (const file of walkSourceFiles(srcDir)) {
    const content = fs.readFileSync(file, "utf8");
    for (const id of extractTestIdsFromSource(content)) {
      ids.add(id);
    }
  }
  return ids;
}

export function findMissingTestIds(mapIds, srcIds) {
  return mapIds.filter((id) => !srcIds.has(id));
}

export function checkFeatureMapTestids({
  featureMapPath,
  srcDir,
  featureMapContent,
  srcFiles,
} = {}) {
  let mapMarkdown;
  if (typeof featureMapContent === "string") {
    mapMarkdown = featureMapContent;
  } else if (featureMapPath) {
    mapMarkdown = fs.readFileSync(featureMapPath, "utf8");
  } else {
    throw new Error("featureMapPath or featureMapContent is required");
  }

  const mapIds = extractTestIdsFromFeatureMap(mapMarkdown);
  let srcIds;

  if (srcFiles && typeof srcFiles === "object") {
    srcIds = new Set();
    for (const content of Object.values(srcFiles)) {
      for (const id of extractTestIdsFromSource(content)) {
        srcIds.add(id);
      }
    }
  } else if (srcDir) {
    srcIds = collectTestIdsFromSrcDir(srcDir);
  } else {
    throw new Error("srcDir or srcFiles is required");
  }

  const missing = findMissingTestIds(mapIds, srcIds);
  return {
    ok: missing.length === 0,
    mapIds,
    srcIds: [...srcIds].sort(),
    missing,
  };
}

export function formatMissingReport(missing) {
  const lines = [
    "FEATURE_MAP data-testid drift: map lists testids missing from src/",
    ...missing.map((id) => `  - missing: ${id}`),
  ];
  return lines.join("\n");
}

function isMain() {
  const entry = process.argv[1] ? path.resolve(process.argv[1]) : "";
  const self = fileURLToPath(import.meta.url);
  return entry === self;
}

function main() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const featureMapPath = path.join(root, "FEATURE_MAP.md");
  const srcDir = path.join(root, "src");
  const result = checkFeatureMapTestids({ featureMapPath, srcDir });

  if (!result.ok) {
    console.error(formatMissingReport(result.missing));
    process.exit(1);
  }

  console.log(
    `FEATURE_MAP data-testid check OK (${result.mapIds.length} mapped testids present in src/)`,
  );
}

if (isMain()) {
  main();
}
