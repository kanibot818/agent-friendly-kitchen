## What

<!-- 1–3 lines: what changed -->

## Checklist (ACCEPTANCE_RUBRIC)

- [ ] `./bin/verify` green — `logs/verify.json` has `"success": true`, exit `0`
- [ ] GitHub Actions `quality` green (`./bin/verify`); download Actions artifact `verify-logs` → `verify.json` for empirical evidence
- [ ] `FEATURE_MAP.md` updated for new/changed nav, APIs, flows, and `data-testid`s
- [ ] Atomic scope — one focused change; no unrelated drive-bys
- [ ] UI changes only: light (+ dark if theme-affected) screenshots / Playwright shot / video / trace attached

## Green lights

<!-- verify / CI / preview links; CI artifact: Actions → quality → verify-logs → verify.json -->

## Decide

<!-- what the reviewer must decide -->

Closes #
