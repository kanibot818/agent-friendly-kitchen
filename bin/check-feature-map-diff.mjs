#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const FEATURE_PREFIX = "src/features/";
const FEATURE_MAP_FILE = "FEATURE_MAP.md";
const DEFAULT_BASE_REF = "origin/main";

export function normalizeRepoPath(filePath) {
  return filePath.replace(/\\/g, "/").replace(/^\.\//, "");
}

export function isFeatureSourcePath(filePath) {
  const normalized = normalizeRepoPath(filePath);
  return (
    normalized === "src/features" ||
    normalized.startsWith(FEATURE_PREFIX)
  );
}

export function isFeatureMapPath(filePath) {
  return normalizeRepoPath(filePath) === FEATURE_MAP_FILE;
}

export function checkFeatureMapDiff(changedFiles) {
  const files = (changedFiles ?? []).map(normalizeRepoPath);
  const featureChanges = files.filter(isFeatureSourcePath);
  const mapChanged = files.some(isFeatureMapPath);

  if (featureChanges.length === 0) {
    return {
      ok: true,
      featureChanges,
      mapChanged,
      reason: "no-feature-changes",
    };
  }

  if (mapChanged) {
    return {
      ok: true,
      featureChanges,
      mapChanged,
      reason: "feature-and-map-changed",
    };
  }

  return {
    ok: false,
    featureChanges,
    mapChanged,
    reason: "feature-without-map",
  };
}

export function formatFeatureMapDiffReport(result) {
  const lines = [
    "FEATURE_MAP diff sync: src/features/** changed without FEATURE_MAP.md",
    ...result.featureChanges.map((file) => `  - changed: ${file}`),
    "  - missing: FEATURE_MAP.md in the same diff (update the map or include it)",
  ];
  return lines.join("\n");
}

export function listChangedFilesAgainstBase({
  baseRef = DEFAULT_BASE_REF,
  execFileSyncFn = execFileSync,
  cwd,
} = {}) {
  let mergeBase;
  try {
    mergeBase = execFileSyncFn("git", ["merge-base", "HEAD", baseRef], {
      cwd,
      encoding: "utf8",
    }).trim();
  } catch (error) {
    const detail =
      error && typeof error === "object" && "stderr" in error
        ? String(error.stderr || error.message || error)
        : String(error);
    throw new Error(
      `Unable to resolve merge-base with ${baseRef}. Fetch full history (CI: checkout fetch-depth: 0) and ensure ${baseRef} exists.\n${detail}`,
    );
  }

  const output = execFileSyncFn(
    "git",
    ["diff", "--name-only", `${mergeBase}...HEAD`],
    {
      cwd,
      encoding: "utf8",
    },
  );

  return output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map(normalizeRepoPath);
}

function isMain() {
  const entry = process.argv[1] ? path.resolve(process.argv[1]) : "";
  const self = fileURLToPath(import.meta.url);
  return entry === self;
}

function main() {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
  const baseRef = process.env.FEATURE_MAP_DIFF_BASE || DEFAULT_BASE_REF;
  const changedFiles = listChangedFilesAgainstBase({ baseRef, cwd: root });
  const result = checkFeatureMapDiff(changedFiles);

  if (!result.ok) {
    console.error(formatFeatureMapDiffReport(result));
    process.exit(1);
  }

  if (result.reason === "no-feature-changes") {
    console.log(
      `FEATURE_MAP diff sync OK (no src/features/** changes vs ${baseRef})`,
    );
    return;
  }

  console.log(
    `FEATURE_MAP diff sync OK (${result.featureChanges.length} feature path(s) + FEATURE_MAP.md vs ${baseRef})`,
  );
}

if (isMain()) {
  main();
}
