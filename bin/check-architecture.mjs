#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BASELINE_PATH = path.join(ROOT, "architecture-baseline.json");
const CRUISE_ARGS = [
  "depcruise",
  "src",
  "--config",
  ".dependency-cruiser.cjs",
  "--output-type",
  "json",
];

function runCruise() {
  const result = spawnSync("npx", CRUISE_ARGS, {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
  });

  if (result.error) {
    console.error(`[arch] failed to spawn depcruise: ${result.error.message}`);
    process.exit(1);
  }

  const stdout = result.stdout ?? "";
  const stderr = result.stderr ?? "";
  if (stderr.trim()) {
    console.error(stderr.trim());
  }

  let report;
  try {
    report = JSON.parse(stdout);
  } catch (err) {
    console.error("[arch] depcruise did not return valid JSON");
    if (stdout.trim()) {
      console.error(stdout.slice(0, 2000));
    }
    process.exit(result.status === 0 ? 1 : result.status ?? 1);
  }

  return { report, status: result.status ?? 0 };
}

function countErrorViolations(report) {
  const summary = report?.summary;
  if (summary?.error !== undefined) {
    return Number(summary.error) || 0;
  }

  const modules = report?.modules ?? [];
  let count = 0;
  for (const mod of modules) {
    for (const dep of mod.dependencies ?? []) {
      for (const rule of dep.rules ?? []) {
        if (rule.severity === "error") {
          count += 1;
        }
      }
    }
    for (const rule of mod.rules ?? []) {
      if (rule.severity === "error") {
        count += 1;
      }
    }
  }
  return count;
}

function listErrorViolations(report) {
  const lines = [];
  for (const mod of report?.modules ?? []) {
    for (const dep of mod.dependencies ?? []) {
      for (const rule of dep.rules ?? []) {
        if (rule.severity === "error") {
          lines.push(`${rule.name}: ${mod.source} -> ${dep.resolved || dep.module}`);
        }
      }
    }
  }
  return lines;
}

function readBaseline() {
  if (!fs.existsSync(BASELINE_PATH)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"));
}

function writeBaseline(violationCount) {
  const payload = {
    metric: "dependency-cruiser-error-violations",
    violationCount,
    updatedAt: new Date().toISOString(),
  };
  fs.writeFileSync(BASELINE_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  return payload;
}

const mode = process.argv[2] === "baseline" ? "baseline" : "check";
const { report } = runCruise();
const current = countErrorViolations(report);
const violations = listErrorViolations(report);

if (mode === "baseline") {
  const payload = writeBaseline(current);
  console.log(
    `[arch] baseline updated: ${payload.violationCount} error violation(s) -> ${path.relative(ROOT, BASELINE_PATH)}`,
  );
  if (violations.length > 0) {
    console.log("[arch] current violations:");
    for (const line of violations.slice(0, 50)) {
      console.log(`  - ${line}`);
    }
    if (violations.length > 50) {
      console.log(`  ... and ${violations.length - 50} more`);
    }
  }
  process.exit(0);
}

const baseline = readBaseline();
if (!baseline || typeof baseline.violationCount !== "number") {
  console.error(
    `[arch] missing or invalid baseline at ${path.relative(ROOT, BASELINE_PATH)}. Run: npm run arch:baseline`,
  );
  process.exit(1);
}

const allowed = baseline.violationCount;
console.log(
  `[arch] dependency-cruiser errors: current=${current} baseline=${allowed}`,
);

if (violations.length > 0) {
  console.log("[arch] violations:");
  for (const line of violations.slice(0, 50)) {
    console.log(`  - ${line}`);
  }
  if (violations.length > 50) {
    console.log(`  ... and ${violations.length - 50} more`);
  }
}

if (current > allowed) {
  console.error(
    `[arch] FAIL: violation count rose (${current} > baseline ${allowed}). Fix new violations or, after intentional cleanup only, lower the baseline with npm run arch:baseline.`,
  );
  process.exit(1);
}

if (current < allowed) {
  console.log(
    `[arch] OK: ratchet improved (${current} < baseline ${allowed}). Consider npm run arch:baseline to lock the lower count.`,
  );
} else {
  console.log("[arch] OK: at baseline");
}

process.exit(0);
