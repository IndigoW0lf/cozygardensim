# Coding-session handoff

This is Kai's personally owned, early browser-game prototype. Read the current README, CONTRIBUTING.md and docs/ROADMAP.md before choosing work. Historical audit notes are evidence of past checks; verify the current source and CI state rather than assuming they describe a new change.

## Implementation

- React 18 + Redux, Vite 8, Vitest 5, npm/package-lock.json. Node 22.12+.
- JSX lives in .jsx files; pure logic/state helpers live in .js files.
- App state is local, in memory. No accounts, analytics, database, cloud API or AI integration.
- Keep the stable timer bridge from restarting when moon/plant state changes. The pure simulation splits updates at moon boundaries; preserve partition-independent growth.
- Distinguish catalog species from individual plant specimens when extending the model. Planting/harvesting are atomic root transactions; reject occupied beds, invalid IDs, insufficient funds and repeated harvests. Persistence and breeding remain future work.
- Use only fictional/test game data and documented assets. Never introduce employer/client code, credentials or real user records.

## Verification

- Run `npm run check` for a behavior change; add tests for actual invariants/failure cases, not implementation-shaped busywork.
- For UI/timing/build changes, rebuild and run `npm run test:e2e` against the built app.
- For dependencies, review `npm audit`, regenerate `npm run audit:licenses`, and inspect changed licenses/notices.
- Report precisely which checks ran, what failed and what was not tested. Do not call a build a security audit.

## History and scope

Preserve existing Git ancestry and account-linked commit attribution. Do not create a replacement repository, squash existing history, fabricate earlier activity, or count completed preparation as future development. Use focused commits for actual work. Keep README, roadmap and implementation status aligned. Do not claim project/program acceptance or submit an application unless the owner explicitly asks.
