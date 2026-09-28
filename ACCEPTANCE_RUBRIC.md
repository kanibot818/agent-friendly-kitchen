# Agent Acceptance Rubric

Head Chef review: **do not rely on line-by-line human code reading**. Accept when the agent provides **empirical evidence** and passes **hard guardrails**. Fail closed on missing evidence.

## 1. Empirical evidence

The agent must not claim “done and tested” in prose alone. The PR must show automated proof:

- [ ] `./bin/verify` succeeded: `logs/verify.json` has `"success": true` and process exit code `0`
- [ ] Coverage for the change: unit tests for logic; Playwright e2e for user-visible behavior when the surface is interactive
- [ ] UI changes only: PR includes Playwright screenshot(s), video, or trace — light (+ dark if theme-affected)

## 2. Hard constraints (CI red = fail)

- [ ] Co-location: changes live under `src/features/<feature-name>/` (UI, logic, types, tests); public export only via `index.ts`
- [ ] No deep imports across features (bypass `index.ts`)
- [ ] Zero comments in application code (clear names and structure instead)
- [ ] Banned patterns enforced by lint/CI (e.g. React `useEffect` where the repo bans it)
- [ ] GitHub Actions `quality` green (typecheck, lint, unit, build, e2e)

## 3. Feature map sync

- [ ] `FEATURE_MAP.md` updated for new or changed navigation, APIs, and user flows
- [ ] Interactive controls have `data-testid` values recorded in `FEATURE_MAP.md`
- [ ] `feature-map-diff` green: any `src/features/**` change includes `FEATURE_MAP.md` in the same diff (enforced by `./bin/verify`)

## 4. Atomic PR and SOP

- [ ] Followed `AGENTS.md`: read map → implement → `./bin/verify` → read `logs/verify.json` → self-fix → PR
- [ ] Atomic scope: one focused change; no unrelated drive-bys

## Head Chef and Gardener

1. **Chef:** Review green lights and evidence, not micro style. If `quality` is green, `logs/verify.json` succeeds, and UI shots (when required) match intent → Approve & merge (or say 合 in Keroro).
2. **Gardener:** If you dislike a pattern or spot a recurring bug class, **do not** stop at a PR comment. Open a follow-up to encode it as ESLint or a CI gate so the failure mode cannot return.
