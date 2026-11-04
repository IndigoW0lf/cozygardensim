# Submission facts and draft description

This is preparation for the owner's review and form entry, not an application submission or approval.

## Repository facts

| Field | Value |
| --- | --- |
| Repository | https://github.com/IndigoW0lf/cozygardensim |
| Owner | Kai Indigo Wolf; personal ownership explicitly confirmed on 2026-11-04 |
| Visibility / root license | Public / MIT |
| History | Original February 2024 ancestry preserved; active November 2026 revival and normal merge of PR #1 |
| Stack | React 18, Redux, Vite, Vitest, Playwright; Node 22.12+ and npm |
| Local setup | `npm ci --ignore-scripts`, then `npm run dev` |
| Checks | `npm run check`; build followed by `npm run test:e2e` for browser checks |
| Current state | Early prototype: independent sunflower specimens, live growth stages, demonstration moon state, names-only catalog |
| Data flow | Browser input to in-memory Redux state and local UI; fictional state; no accounts, database, telemetry, uploads or model integration |
| Evidence | README, AUDIT.md, PROVENANCE.md, DEPENDENCY_LICENSES.json and successful CI run 41926711489 |

## Draft project description

Cozy Garden Simulator is my personally owned browser-game project, begun in February 2024 and revived in November 2026 in the same public repository. It is an early React/Redux prototype for a calm magical gardening simulation. The current implementation supports individual planted sunflowers, timed growth stages, a demonstration moon state and a plant-name catalog. Recent preparation repaired startup and timing defects, migrated the build/test tooling, and added reproducible checks. The original history and MIT license are preserved. The app uses fictional local game state and has no player accounts, database, analytics, uploads or AI/model integration. My next development block is to define deterministic simulation rules, build a complete planting-to-harvest/reward loop, and add validated local saves and recovery.

Review this draft against the actual form and the work you intend to do. It does not assert that every historic resource/agreement has been independently verified.

## Proposed useful work ahead

| Work | Rough hours | Observable result |
| --- | ---: | --- |
| Pure elapsed-time simulation | 2–4 | Reproducible stage/moon rules and boundary tests independent of React effect timing |
| Complete game loop | 12–18 | Choose/buy seeds, plant in slots, grow/harvest once, receive/spend rewards; test invalid IDs, balances and duplicate harvests |
| Local saves/recovery | 6–10 | Versioned saves, validation, migration, import/export and safe recovery from malformed data |
| Total | 20–32 | A small playable, locally persistent first release |

Tests and documentation for each feature are included in these estimates. Completed revival/preparation work is excluded. Hours are estimates, not guaranteed billable time; do not add work solely to meet a threshold.

## Verification scope

At verified code head `d8203b38d8d582025d57b564ed4b49820ae85719`, [CI](https://github.com/IndigoW0lf/cozygardensim/actions/runs/41926711489) passed five unit tests, four desktop/mobile Chromium scenarios, installation, production build, dependency/license checks, and redacted history/current-tree scans. npm reported zero known vulnerabilities; Gitleaks reported no findings across 18 fetched commits and current files. These are scoped checks, not guarantees about unreachable history, all possible secrets or program eligibility.

The original CRA scaffold origin is openly documented alongside custom implementation. Program reviewers determine whether it satisfies their originality requirements. Inspect the latest main checks before submitting; do not claim acceptance, production users, completed gameplay features or a full manual accessibility audit.
