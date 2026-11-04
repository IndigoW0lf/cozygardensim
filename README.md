# Cozy Garden Simulator

A small browser game about tending a magical garden: plant a seed, watch it change, and gradually discover plants that respond to the world around them.

**Status:** an early prototype being revived. Original development began in February 2024; the November 2026 preparation work extends the same repository and history. This is not yet a complete game.

## The direction

Build a calm, local-first gardening game for people who enjoy cozy simulations and small discoveries. The first goal is one satisfying loop: choose a seed, plant it, tend it, harvest it, and use the reward to grow the garden. Magic should create interesting choices without making missed days feel like failure.

No accounts, payments, advertising, analytics or AI generation are planned for the first playable release. The current app has none of those integrations.

## What works now

- Plant independent sunflowers with unique IDs and initialized growth timers.
- See their growth stages update while the page stays open.
- View the demonstration moon state and a names-only plant catalog.
- Run React/Redux with Vite, Vitest and a reproducible npm lockfile.
- Run regression tests and desktop/mobile Chromium checks against the built app.

| Area | Existing groundwork | Still needed |
| --- | --- | --- |
| Garden | Add and display individual plants | Species selection, beds/slots, tending |
| Growth | One-minute ticks and stage transitions | Explicit elapsed-time rules, pause and offline policy |
| Magic | Periodically changing demonstration phase | A coherent rule set and responsive species |
| Catalog | 31 legacy plant names | Fictional traits, prices and unlock rules |
| Economy | Coin/XP reducers | Connected purchase/harvest/reward loop |
| Breeding | Experimental action/reducer code | Validated parents/traits, one implementation and a UI |
| Saving | Session memory only | Versioned local saves, recovery, export/reset |

The catalog makes no medical or real-world plant-care claims. Earlier unverified descriptions were removed during preparation. Future magical effects should be explicitly fictional.

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

## Play-test the baseline

1. Open a fresh session: the garden should show an empty state.
2. Press Tab, then Enter on **Plant a sunflower**. A seed-stage plant should appear.
3. Add a second plant; both should remain independent.
4. Leave the page open. A fresh seed takes five one-minute ticks to reach sprouting.
5. Refresh: the garden currently resets. Persistence is future work.

The catalog does not offer purchases yet. The original shop expected prices, level requirements and a Redux catalog slice that did not exist. Purchase rules belong with the complete harvest-and-reward loop.

## Code map

```text
index.html                    Vite entry document
src/index.jsx                 Single React root and Redux provider
src/App.jsx                   Prototype screen composition
src/components/               Garden, plant display, catalog and timer driver
src/data/herbalPlants.js      Names-only legacy plant catalog
src/functions/                Stage timing and experimental magic helpers
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

1. **Simulation foundation:** a controllable clock and clear growth/moon rules.
2. **One complete loop:** seed selection, beds, tending, harvesting, rewards and progression.
3. **A garden worth returning to:** local saves, recovery and a forgiving absence policy.
4. **Magical discovery:** distinct species, readable effects and deterministic breeding rules.
5. **Comfort and polish:** accessible controls, responsive scenes, documented art, optional audio and performance checks.

The [detailed roadmap](docs/ROADMAP.md) defines a roughly **20–32 hour** first block of remaining work. Completed preparation is excluded from that estimate. Hours are planning ranges; Kai should select work she actually wants to build.

## Getting ready to contribute

Start with [CONTRIBUTING.md](CONTRIBUTING.md) for the development workflow, and [AGENTS.md](AGENTS.md) for a concise coding-session handoff. The [submission summary](docs/SUBMISSION_SUMMARY.md) collects current facts and planned work for form preparation.

## History and contribution boundaries

Use focused changes with observable acceptance criteria. Preserve the existing Git ancestry and natural commit attribution. Do not re-upload the code into another repository or rewrite old commits to make development look more recent.

Use fictional game state and assets you have permission to distribute. Never commit credentials, real player records, employer/client code or proprietary resources. No player account or personal information is needed to develop this game.

## License and credits

Original application code is under the [MIT License](LICENSE), credited to Kai Indigo Wolf. Dependencies retain their own terms. [Runtime notices](THIRD_PARTY_NOTICES.txt) and the [complete locked dependency inventory](docs/DEPENDENCY_LICENSES.json) document those boundaries. Production builds include the application license and runtime notices.

The original project began with Create React App scaffolding and added custom garden, growth, magic and progression logic. The revival replaces that tooling in place. Historical scaffold assets were matched to the MIT-licensed upstream template; the current tree uses a small source-authored SVG icon. See [provenance](docs/PROVENANCE.md).
