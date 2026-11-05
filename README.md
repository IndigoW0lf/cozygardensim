# Cozy Garden Simulator

A small browser game about tending a magical garden: plant a seed, watch it change, and gradually discover plants that respond to the world around them.

**Status:** an early prototype being revived. Original development began in February 2024; the November 2026 preparation work extends the same repository and history. This is not yet a complete game.

## The direction

Build a calm, local-first gardening game for people who enjoy cozy simulations and small discoveries. The first goal is one satisfying loop: choose a seed, plant it, tend it, harvest it, and use the reward to grow the garden. Magic should create interesting choices without making missed days feel like failure.

No accounts, payments, advertising, analytics or AI generation are planned for the first playable release. The current app has none of those integrations.

## What works now

- Choose Sunflower, Calendula or Moonflower seeds and plant into six beds.
- Pay once when planting; reject occupied beds, invalid IDs or unaffordable seeds.
- Watch five growth stages, then harvest once for coins and XP. Harvesting frees the bed for another seed.
- A pure elapsed-time simulation handles moon boundaries; Moonflower grows 50% faster under a full moon.
- Pause/resume the garden. Hidden tabs rest; there is no offline catch-up or saved session yet.
- Responsive, keyboard-operable controls, growth progress, coin/XP/harvest counts and action feedback.
- Illustration slots with a bundled asset manifest. **Art is in progress**; neutral placeholders are not the finished visual direction. See [the art brief](docs/art/ASSET_BRIEF.md).

This is a first playable slice, not a finished game. Planting prices, short growth times and moon effects are illustrative game rules, not botanical guidance. Saves/recovery, tending rules, breeding, a larger collection and real-device/assistive-technology review remain.

## Run locally

Requirements: **Node.js 22.12+** (Node 22 is the CI target) and npm. `.nvmrc` selects Node 22. No environment variables, API keys or database are required.

```sh
git clone https://github.com/IndigoW0lf/cozygardensim.git
cd cozygardensim
npm ci --ignore-scripts
npm run dev
```

Open the address printed by Vite, normally <http://127.0.0.1:5173>.

```sh
npm run check                    # license consistency, unit tests and production build
npm test                         # Vitest regression suites, one run
npm run test:watch               # interactive test development
npm run build                    # static production output in dist/
npm run preview                  # serve the production build locally
npm audit                        # current registry advisory check
npm run audit:licenses -- --check # verify the committed dependency inventory/notices
```

### Browser checks

After building:

```sh
npx playwright install --with-deps chromium
npm run test:e2e
```

Playwright tests the actual built app at desktop and mobile sizes: keyboard activation, two independent plants, seed-to-sprout timing, reset on refresh, horizontal overflow, page errors and unexpected external requests. These are automated Chromium checks, not a claim of a manual usability study, a screen-reader audit or support for every browser. Browser installation needs network access and platform libraries.

GitHub Actions runs installation, license checks, dependency advisories, unit tests, production build, browser checks and redacted secret scans. See the [PR checks](https://github.com/IndigoW0lf/cozygardensim/pull/1) for the latest run and [audit record](docs/AUDIT.md) for scope.

## Five-minute reviewer walkthrough

1. Start with 100 coins. Select a packet, then an empty bed. Selection alone costs nothing.
2. Plant Sunflower in bed 1: the balance becomes 90. Planting another specimen uses another bed.
3. Let the visible garden run for about one minute. The Sunflower becomes harvestable.
4. Harvest it: the balance becomes 106 (if nothing else was planted), 4 XP is awarded and the same bed can be planted again. A second harvest cannot pay again.
5. Try Calendula and Moonflower. The moon changes every 90 seconds of active garden time; Moonflower's full-moon rate is higher.
6. Pause/resume and try planting with too few coins. Refreshing deliberately resets the visit; saves are not implemented.

[Review-build notes](docs/REVIEW_BUILD.md) record scope, art status and checks. Use fictional game state only.

## Code map

```text
index.html                    Vite entry document
src/index.jsx                 Single React root and Redux provider
src/App.jsx                   Prototype screen composition
src/components/               Garden, plant display, catalog and timer driver
src/game/                     Species definitions, growth rules and pure simulation
src/art/                      Replaceable raster-art manifest
src/store/                    Garden/player events and state transitions
src/**/*.test.*               Vitest regression suites
tests/browser/                Built-app Playwright checks
scripts/                      License notices and redacted CI scanning
docs/ROADMAP.md                Milestones, acceptance criteria and effort ranges
docs/AUDIT.md                  Evidence and verification limits
docs/PROVENANCE.md             History, ownership attestation and asset sources
docs/BYOP_READINESS.md          Submission preparation facts
```

## Longer-term plan

1. **Local saves and recovery:** validated, versioned data, import/export and a safe absence policy.
2. **Tending and discovery:** care choices that change the game, followed by validated breeding.
3. **A garden worth returning to:** local saves, recovery and a forgiving absence policy.
4. **Magical discovery:** distinct species, readable effects and deterministic breeding rules.
5. **Comfort and polish:** accessible controls, responsive scenes, documented art, optional audio and performance checks.

The [detailed roadmap](docs/ROADMAP.md) defines a roughly **20–34 hour** next block of remaining work. Completed preparation is excluded from that estimate. Hours are planning ranges; Kai should select work she actually wants to build.

## Getting ready to contribute

Start with [CONTRIBUTING.md](CONTRIBUTING.md) for the development workflow, and [AGENTS.md](AGENTS.md) for a concise coding-session handoff. The [submission summary](docs/SUBMISSION_SUMMARY.md) collects current facts and planned work for form preparation.

## History and contribution boundaries

Use focused changes with observable acceptance criteria. Preserve the existing Git ancestry and natural commit attribution. Do not re-upload the code into another repository or rewrite old commits to make development look more recent.

Use fictional game state and assets you have permission to distribute. Never commit credentials, real player records, employer/client code or proprietary resources. No player account or personal information is needed to develop this game.

## License and credits

Original application code is under the [MIT License](LICENSE), credited to Kai Indigo Wolf. Dependencies retain their own terms. [Runtime notices](THIRD_PARTY_NOTICES.txt) and the [complete locked dependency inventory](docs/DEPENDENCY_LICENSES.json) document those boundaries. Production builds include the application license and runtime notices.

The original project began with Create React App scaffolding and added custom garden, growth, magic and progression logic. The revival replaces that tooling in place. Historical scaffold assets were matched to the MIT-licensed upstream template; the current tree uses a small source-authored SVG icon. See [provenance](docs/PROVENANCE.md).
