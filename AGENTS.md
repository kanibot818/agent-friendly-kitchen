# AGENTS

Operating notes for coding agents working in this repository.

**Outer loop:** see `OUTER_LOOP.md` (開工／自審：`docs/start-checklist.md`、`docs/self-review.md`).

**Acceptance:** Head Chef / Keroro accept on green lights + empirical evidence per `ACCEPTANCE_RUBRIC.md` — not line-by-line code reading.

## SOP (required)

1. **Read FEATURE_MAP** — Open `FEATURE_MAP.md` first. Learn navigation paths, public APIs, `data-testid` values, and user flows before changing code.
2. **Run verify** — Execute `./bin/verify` (or `npm run verify`). This runs FEATURE_MAP↔`data-testid` drift check, FEATURE_MAP diff sync (fail if `src/features/**` changes without updating `FEATURE_MAP.md`), typecheck, lint, unit tests, production build, and Playwright e2e. Every testid listed in `FEATURE_MAP.md` must exist in `src/**`.
3. **Read verify.json and self-check** — Inspect `./logs/verify.json`. Confirm `success` is `true`, `exitCode` is `0`, and every step has `"ok": true`. If anything failed, fix before continuing.
4. **Pass CI before PR** — Locally run the CI-equivalent gate: `npm run typecheck && npm run lint && npm run test && npm run build`. All must exit 0. E2E is covered by verify / the workflow `test:e2e` job when browsers are available.

## Feature layout

- Features live under `src/features/<feature-name>/`.
- Colocate Component, Logic, Types, and Tests for that feature.
- Export only through `index.ts` (public barrel).
- App shell stays in `src/app/`. Entry points: `src/main.tsx`, `src/App.tsx`.
- Import other features only via their public barrels — never deep private paths.

## Hard constraints

- **No code comments** in `src/**` (`//` or `/* */`). ESLint `no-comments/disallowComments` fails the lint job. Markdown docs (including this file) may contain explanatory text.
- **No React `useEffect`**. Prefer explicit event handlers and derived state. Importing `useEffect` from `react` is a lint error.
- Keep TypeScript strict; do not weaken `tsconfig` options to hide errors.
- Do not leave TODO stubs that break verify or CI.
- **FEATURE_MAP testids must exist in src** — `./bin/verify` runs `bin/check-feature-map-testids.mjs`; map→src drift fails the gate.
- **FEATURE_MAP must update with feature code** — `./bin/verify` runs `bin/check-feature-map-diff.mjs`; changing `src/features/**` without `FEATURE_MAP.md` in the same diff fails the gate.

## Quick commands

```bash
npm install
npx playwright install --with-deps chromium
npm run dev
./bin/verify
npm run typecheck && npm run lint && npm run test && npm run build
```
