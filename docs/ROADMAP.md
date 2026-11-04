# Development roadmap

This roadmap describes useful future work for an early prototype. It is not a record of completed work, booked hours, paid-program approval, or a commitment to every idea. Kai should select the milestones she actually wants to build.

## First playable direction

A player can choose a seed, plant it in a small garden, understand what it needs, harvest it, and use the reward for the next choice. The experience should feel calm and forgiving. Start with a few well-defined fictional species rather than a large, unbalanced catalog.

Keep the first release browser-only: no login, cloud database, analytics, monetization, user uploads or generative AI.

## Completed preparation — excluded from future hours

- Restore the React root/provider and remove invalid startup mounts.
- Initialize seed timers and make the incomplete catalog honest.
- Migrate CRA/Jest to Vite/Vitest with one npm lockfile.
- Remove unused dependencies, scaffold branding and unverified catalog claims.
- Add built-app browser checks, dependency/license inventory and secret-scan CI.
- Document owner-confirmed personal ownership and preserve the original ancestry.

See AUDIT.md and the PR checks for verification results and limits. These changes are preparation already done, not future tasks.

## Milestone 1 — Make simulation rules explicit: 2–4 hours

- Inject elapsed time into a pure simulation function instead of tying growth to React effects.
- Define a minute, stage duration and moon phase consistently.
- Replace demonstration changes with a reproducible small rule set.

**Acceptance:** deterministic fake-clock tests cover elapsed boundaries and multiple plants; visible growth agrees with the chosen rules. No UI effect timing should silently change game state semantics.

## Milestone 2 — Complete the planting-to-harvest loop: 12–18 hours

- Define typed or runtime-validated species and specimen records, distinguishing a catalog species from an individual plant.
- Start with 3–5 game species with explicit seed costs, stage durations and harvest yields.
- Add seed selection and a small bed/slot model.
- Make purchase and harvest atomic state transitions; reject insufficient funds, invalid selections and repeated harvesting.
- Connect earnings and XP to visible progress. Keep the first balancing pass small.
- Add tending feedback only where it changes a clear rule.

**Acceptance:** a player can buy, plant, grow and harvest a plant, then afford a meaningful next choice. Tests cover duplicate harvesting, invalid IDs, insufficient funds, unique specimen IDs and nonnegative balances.

## Milestone 3 — Local saves and recovery: 6–10 hours

- Add a versioned save format with validation and migrations.
- Save in browser storage; surface storage failures.
- Provide export/import and an explicit reset flow.
- Choose a capped, forgiving offline-growth policy rather than relying on background browser timers.
- Recover safely from malformed, old or partially written saves.

**Acceptance:** refresh preserves a garden; invalid imports do not destroy the current garden; tests cover migrations, time boundaries, clock changes and storage errors. No network account is required.

## Milestone 4 — Comfortable controls and a small garden scene: 6–10 hours

- Arrange plants in an understandable, responsive garden rather than an unstructured list.
- Make every action available by keyboard, with clear focus and status announcements.
- Respect reduced motion and avoid relying on color alone.
- Show needs, timers and available actions without excessive clicking.
- Test narrow screens, zoom and a realistic longer garden session.

**Acceptance:** the whole core loop works with keyboard-only input and on a small viewport; status changes are understandable without animation. Verify actual browser behavior.

## Milestone 5 — Magical discovery and breeding: 8–14 hours

- Design a few explicitly fictional effects with predictable interactions.
- Make a moon-sensitive species respond to the displayed moon state.
- Replace competing breeding implementations with one validated rule system.
- Inject randomness or use a seed so reproduction bugs can be reproduced.
- Add parent selection, trait previews and understandable outcomes.

**Acceptance:** invalid/missing parents do not crash; inherited traits obey defined bounds; the same seed and parents reproduce a result. Only add species when they create a new decision.

## Later possibilities — unestimated

- Original illustrated plants and garden environments, with a documented asset ledger.
- Optional ambient audio with mute/volume and user-initiated playback.
- Seasonal collections and decorative rewards.
- A downloadable/offline edition if actual use justifies it.

Multiplayer, accounts, cloud saves, marketplaces, telemetry and payments would require a new privacy and ownership review. They are not prerequisites for a satisfying small game.

## A realistic first development block

Milestones 1, 2 and 3 provide approximately **20–32 hours** of useful engineering work. Include implementation-specific tests and documentation in those estimates; do not count the same QA twice.

This block is appropriate only if Kai genuinely intends to build it. Do not expand scope merely to reach an hour threshold. Record actual time and preserve natural commits. Preparation already completed in this PR must not be described as future work.
