# Architecture fitness

Quantified, ratchet-only gate for feature boundary health. Complements (does not replace) `eslint-plugin-boundaries` and `no-restricted-imports` in `eslint.config.js`.

## Metric

- Tool: **dependency-cruiser** (config: `.dependency-cruiser.cjs`)
- Scope: `src/**/*.{ts,tsx}` (excludes `node_modules` / `dist` / `coverage` noise)
- Count: number of **error** rule violations
- Baseline file: `architecture-baseline.json` → `violationCount`
- Gate: current count **must be ≤ baseline** (ratchet: only decrease allowed)

Rules (high level):

1. Feature → other feature: only via that feature’s public barrel (`index.ts` / `index.tsx`)
2. `src/app` and entry (`src/main.tsx`, `src/App.tsx`): no deep imports into feature private paths
3. Other `src/` modules: same barrel-only rule for features

ESLint still blocks deep imports at edit time; cruiser is the measurable CI/verify ruler.

## How to run

```bash
npm run arch:check
# or
node ./bin/check-architecture.mjs

./bin/verify   # includes step "arch"
```

## How to update the baseline

After you **fix** violations and `arch:check` reports a lower count:

```bash
npm run arch:baseline
# writes architecture-baseline.json with the new (lower) violationCount
```

Commit the updated baseline in the same PR as the fixes. Do **not** raise the baseline to hide new violations.

## Verify wiring

`./bin/verify` runs `node ./bin/check-architecture.mjs` as step **`arch`**. Inspect `logs/verify.json` for `"name": "arch", "ok": true`.
